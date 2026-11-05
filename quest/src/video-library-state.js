// Video library checklist save — localStorage read/write, the default save, and
// derived queries (selectors). Same conventions as state.js: the mutator
// (toggleWatched) only changes the save it is given; it never touches the DOM and
// never persists on its own. video-library.html decides when to save and render.

export const STORAGE_KEY = "sine-to-whisper-videos.v1";

export const defaultSave = () => ({
  // id → date ticked (local "YYYY-MM-DD"). The date is both the "watched" flag and
  // the raw data for the streak.
  watched: {},
});

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// Storage can be missing or throw (private windows, blocked site data, previews),
// so every access is wrapped and the page keeps working without it.
function storage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

// Filter outside input (localStorage may be hand-edited or corrupt) into a safe
// shape: keep only records whose id is still in the current library and whose date
// is well-formed, so renamed or removed entries are cleaned up automatically.
export function loadSave(validIds) {
  try {
    const raw = storage()?.getItem(STORAGE_KEY);
    if (!raw) return defaultSave();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return defaultSave();
    const watched = {};
    if (parsed.watched && typeof parsed.watched === "object") {
      for (const [id, date] of Object.entries(parsed.watched)) {
        if (validIds.has(id) && typeof date === "string" && DATE_RE.test(date)) {
          watched[id] = date;
        }
      }
    }
    return { watched };
  } catch {
    return defaultSave();
  }
}

export function persist(save) {
  try {
    storage()?.setItem(STORAGE_KEY, JSON.stringify(save));
    return true;
  } catch {
    return false;
  }
}

export function clearSave() {
  try {
    storage()?.removeItem(STORAGE_KEY);
  } catch {
    /* nothing to clear if storage is unavailable */
  }
}

export function localDateString(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// ---- mutator (changes the save only; does not persist) ---------------------

export function toggleWatched(save, id) {
  if (save.watched[id]) {
    delete save.watched[id];
  } else {
    save.watched[id] = localDateString();
  }
}

// ---- derived queries (never modify the save) -------------------------------

export function watchedCount(save) {
  return Object.keys(save.watched).length;
}

// Daily streak: count back from today (from yesterday if nothing is ticked today
// yet); one missed day resets it to zero.
export function streakDays(save, today = new Date()) {
  const days = new Set(Object.values(save.watched));
  if (!days.size) return 0;
  const cursor = new Date(today);
  if (!days.has(localDateString(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (days.has(localDateString(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

// Milestone medals: the total comes from the library data, and the last medal is
// always "all done".
export function milestones(total) {
  return [
    { at: 10, icon: "🥉", name: "Bronze" },
    { at: 25, icon: "🥈", name: "Silver" },
    { at: 50, icon: "🥇", name: "Gold" },
    { at: 75, icon: "💎", name: "Platinum" },
    { at: total, icon: "👑", name: "All done" },
  ].filter((m, i, arr) => m.at <= total && arr.findIndex((x) => x.at === m.at) === i);
}

export function nextMilestone(total, count) {
  return milestones(total).find((m) => count < m.at) ?? null;
}
