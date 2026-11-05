// Save data and state queries — localStorage reads/writes, the default save, and
// every derived query (selector).
// Convention: the mutators (addLog / ensureInventory) only change the state they
// are given; they never touch the DOM or save automatically. When to save and
// when to render is up to app.js.
//
// Every localStorage access is wrapped: in a private window, with blocked site
// data or in a sandboxed preview the accessor can throw, and the game must still
// run (progress then simply lives in memory for this visit).

import { QUESTS, XP_PER_LEVEL } from "./data/quests.js";

// Deliberately different from the Chinese edition's key, so the two games never
// overwrite each other's progress.
export const STORAGE_KEY = "sine-to-whisper-quest.save.v1";

export const defaultSave = () => ({
  activePhaseIndex: 0,
  phaseProgress: QUESTS.map(() => 0),
  xp: 0,
  streak: 0,
  muted: false,
  inventory: [
    {
      icon: "PK",
      name: "Course Pass",
      desc: "You've reached Aurora's starting line.",
    },
  ],
  log: [
    {
      kind: "System",
      text: "Save ready. Click \"Start\" to enter the prologue.",
    },
  ],
});

function storage() {
  try {
    return window.localStorage ?? null;
  } catch {
    return null;
  }
}

// Clamp outside input (localStorage can be hand-edited or corrupted) to a safe integer.
function clampInt(value, min, max, fallback = 0) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(Math.floor(n), max));
}

function normalizeProgress(progress) {
  if (!Array.isArray(progress)) return QUESTS.map(() => 0);
  return QUESTS.map((quest, index) =>
    clampInt(progress[index], 0, quest.questions.length),
  );
}

// Sanitize array elements too: a null or a number inside inventory/log would
// break the renderer when it reads their properties.
function sanitizeInventory(list, fallback) {
  if (!Array.isArray(list)) return fallback;
  const clean = list.filter(
    (item) =>
      item &&
      typeof item === "object" &&
      typeof item.name === "string" &&
      typeof item.desc === "string",
  );
  return clean.length ? clean : fallback;
}

function sanitizeLog(list, fallback) {
  if (!Array.isArray(list)) return fallback;
  const clean = list
    .filter(
      (entry) =>
        entry &&
        typeof entry === "object" &&
        typeof entry.kind === "string" &&
        typeof entry.text === "string",
    )
    .slice(0, 8);
  return clean.length ? clean : fallback;
}

export function loadState() {
  try {
    const raw = storage()?.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return {
      ...defaultSave(),
      ...parsed,
      // Field-by-field sanitizing: an out-of-range activePhaseIndex would make
      // phaseIsComplete index past the end, and a string xp would turn += into
      // string concatenation.
      activePhaseIndex: clampInt(parsed.activePhaseIndex, 0, QUESTS.length - 1),
      xp: clampInt(parsed.xp, 0, Number.MAX_SAFE_INTEGER),
      streak: clampInt(parsed.streak, 0, Number.MAX_SAFE_INTEGER),
      muted: Boolean(parsed.muted),
      phaseProgress: normalizeProgress(parsed.phaseProgress),
      inventory: sanitizeInventory(parsed.inventory, defaultSave().inventory),
      log: sanitizeLog(parsed.log, defaultSave().log),
    };
  } catch {
    return null;
  }
}

export function saveState(state) {
  try {
    storage()?.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage full or unavailable: keep playing from memory */
  }
}

export function hasSave() {
  try {
    return Boolean(storage()?.getItem(STORAGE_KEY));
  } catch {
    return false;
  }
}

export function clearSave() {
  try {
    storage()?.removeItem(STORAGE_KEY);
  } catch {
    /* nothing to clear */
  }
}

// ---- Derived queries (never modify state) ---------------------------------

export function levelFromXp(xp) {
  return 1 + Math.floor(xp / XP_PER_LEVEL);
}

export function completedCount(state) {
  return QUESTS.reduce(
    (count, quest, index) =>
      count + (state.phaseProgress[index] >= quest.questions.length ? 1 : 0),
    0,
  );
}

export function unlockedIndex(state) {
  for (let i = 0; i < QUESTS.length; i += 1) {
    if (state.phaseProgress[i] < QUESTS[i].questions.length) {
      return i;
    }
  }
  return QUESTS.length - 1;
}

export function currentQuest(state) {
  return QUESTS[state.activePhaseIndex] ?? QUESTS[0];
}

export function currentQuestion(state) {
  const quest = currentQuest(state);
  const progress = state.phaseProgress[state.activePhaseIndex] ?? 0;
  return quest.questions[progress] ?? null;
}

export function phaseIsComplete(state, index) {
  return state.phaseProgress[index] >= QUESTS[index].questions.length;
}

// ---- Mutators (change state only, never persist) ---------------------------

export function addLog(state, kind, text) {
  state.log.unshift({ kind, text });
  state.log = state.log.slice(0, 8);
}

export function ensureInventory(state, item) {
  if (!item) return;
  if (state.inventory.some((entry) => entry.name === item.name)) return;
  state.inventory.unshift(item);
}
