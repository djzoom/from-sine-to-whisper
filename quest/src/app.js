// Entry point and game mechanics — owns the single `state` and defines every
// action (answering / advancing / muting / keyboard). Rendering is delegated to
// ui.js, saving and queries live in state.js, the question bank in
// data/quests.js, and the sound effects in audio.js.
//
// One-way data flow: an action changes state → render() redraws → persist() saves.
// During the feedback window after an answer (460/820 ms) inputLocked is true and
// every state-changing action is blocked, so that when the delayed commitAnswer
// runs, nobody has switched chapter, reset or loaded a save underneath it.

import { QUESTS, XP_PER_QUESTION, XP_PER_PHASE_CLEAR } from "./data/quests.js";
import { playSfx } from "./audio.js";
import {
  defaultSave,
  loadState,
  saveState,
  hasSave,
  clearSave,
  currentQuest,
  currentQuestion,
  phaseIsComplete,
  unlockedIndex,
  addLog,
  ensureInventory,
} from "./state.js";
import {
  els,
  renderApp,
  updateResumeButton,
  updateMuteButton,
  markChoiceFeedback,
  flashBoss,
  spawnFx,
} from "./ui.js?v=20261105-en";

let state = loadState() ?? defaultSave();
let inputLocked = false;

const handlers = {
  onChoice: handleChoice,
  onSelectPhase: setActivePhase,
};

function render() {
  renderApp(state, handlers);
}

function persist() {
  saveState(state);
  updateResumeButton(hasSave());
}

// ---- Switching chapters -----------------------------------------------------

function setActivePhase(index) {
  if (inputLocked) return; // no chapter switching during feedback (the delayed result would land in the wrong chapter)
  const unlock = unlockedIndex(state);
  if (index > unlock && index !== state.activePhaseIndex) {
    addLog(state, "System", "That area is still locked. Clear the chapters before it first.");
    render();
    persist();
    return;
  }

  state.activePhaseIndex = Math.max(0, Math.min(index, QUESTS.length - 1));
  addLog(state, "System", `Entering ${currentQuest(state).title}.`);
  render();
  persist();
}

function startAdventure() {
  setActivePhase(0);
}

function resetAdventure() {
  if (inputLocked) return; // no reset during feedback (the delayed result would leak into the new save)
  const muted = state.muted; // the sound preference outlives progress: resetting progress keeps mute as it was
  clearSave();
  state = defaultSave();
  state.muted = muted;
  addLog(state, "System", "Save cleared. A fresh adventure begins.");
  render();
  // Deliberately not persisted: cleared means cleared ("Continue" is disabled
  // too). A new save is written once the player actually does something
  // (enters a chapter or answers a question).
  updateResumeButton(hasSave());
}

function advancePhase() {
  if (inputLocked) return;
  const nextIndex = Math.min(state.activePhaseIndex + 1, QUESTS.length - 1);
  if (!phaseIsComplete(state, state.activePhaseIndex)) {
    addLog(state, "System", "This chapter isn't cleared yet. Finish the current questions first.");
    render();
    persist();
    return;
  }

  if (state.activePhaseIndex === QUESTS.length - 1) {
    state.activePhaseIndex = 0;
    addLog(state, "System", "Final chapter cleared. Back to the prologue for a review run.");
  } else {
    state.activePhaseIndex = nextIndex;
    addLog(state, "System", `Entering ${currentQuest(state).title}.`);
  }

  render();
  persist();
}

// ---- Answering ----------------------------------------------------------------

// Click/keyboard entry point: play the feedback first (highlight + sound + hit
// effect), lock input briefly, then commit the result.
function handleChoice(choiceIndex) {
  if (inputLocked) return;
  const question = currentQuestion(state);
  if (!question) return;

  const correct = choiceIndex === question.answer;
  if (!markChoiceFeedback(choiceIndex, question.answer)) return;

  inputLocked = true;
  playSfx(correct ? "hit" : "miss", state.muted);
  flashBoss(correct ? "hit" : "block");
  spawnFx(
    correct ? `-${Math.round(100 / currentQuest(state).questions.length)}` : "MISS",
    correct ? "dmg" : "miss",
  );

  window.setTimeout(
    () => {
      inputLocked = false;
      // Belt and braces: if the world still changed during feedback (some future
      // code path), and the current question no longer matches, drop the result.
      if (currentQuestion(state) !== question) return;
      commitAnswer(choiceIndex, question);
    },
    correct ? 460 : 820,
  );
}

// Commit: update the saved state and render. A wrong answer keeps the same
// question so you can retry; a right answer moves progress forward.
function commitAnswer(choiceIndex, question) {
  const quest = currentQuest(state);
  const progress = state.phaseProgress[state.activePhaseIndex] ?? 0;

  if (choiceIndex !== question.answer) {
    state.streak = 0;
    addLog(state, "Miss", `${question.hint} Try again — you're close.`);
    render();
    persist();
    return;
  }

  state.phaseProgress[state.activePhaseIndex] = progress + 1;
  state.xp += XP_PER_QUESTION;
  state.streak += 1;
  addLog(state, "Hit", `${question.note} +${XP_PER_QUESTION} XP.`);

  if (phaseIsComplete(state, state.activePhaseIndex)) {
    state.xp += XP_PER_PHASE_CLEAR;
    state.streak = 0;
    ensureInventory(state, quest.artifact);
    addLog(
      state,
      "Clear",
      `You earned the ${quest.artifact.name}! The next chapter is unlocked. +${XP_PER_PHASE_CLEAR} XP.`,
    );
    if (state.activePhaseIndex === QUESTS.length - 1) {
      addLog(
        state,
        "Finale",
        "The whole pipeline has come together. Now take it out into the world: explain it, demo it, keep improving it.",
      );
      playSfx("finale", state.muted);
    } else {
      playSfx("clear", state.muted);
    }
  } else {
    addLog(state, "Progress", `On to the ${quest.boss}'s next move.`);
  }

  render();
  persist();
}

// ---- Mute and keyboard --------------------------------------------------------

function toggleMute() {
  state.muted = !state.muted;
  updateMuteButton(state.muted);
  if (hasSave()) persist(); // with no save yet, change memory only, so pressing M on the title screen doesn't create a save
  if (!state.muted) playSfx("hit", state.muted);
}

function handleKeydown(event) {
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  const tag = document.activeElement?.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA") return;

  const key = event.key;
  if (key === "m" || key === "M") {
    toggleMute();
    event.preventDefault();
    return;
  }
  if (key === "Enter" || key === "n" || key === "N") {
    // When a button or link has focus, Enter must do that control's default
    // action rather than being hijacked by "Next chapter".
    if (key === "Enter" && (tag === "BUTTON" || tag === "A")) return;
    if (!els.nextButton?.disabled) {
      advancePhase();
      event.preventDefault();
    }
    return;
  }
  if (/^[1-9]$/.test(key)) {
    if (phaseIsComplete(state, state.activePhaseIndex)) return;
    handleChoice(Number(key) - 1);
    event.preventDefault();
  }
}

// ---- Startup -------------------------------------------------------------------

function wireEvents() {
  els.startButton?.addEventListener("click", startAdventure);
  els.resumeButton?.addEventListener("click", () => {
    if (inputLocked) return; // no loading a save during feedback
    const saved = loadState();
    if (saved) {
      state = saved;
      addLog(state, "System", "Picking up where you left off.");
      render();
      persist();
      return;
    }
    addLog(state, "System", "No save yet. Start from the prologue.");
    render();
  });
  els.resetButton?.addEventListener("click", resetAdventure);
  els.muteButton?.addEventListener("click", toggleMute);
  els.nextButton?.addEventListener("click", advancePhase);
  window.addEventListener("keydown", handleKeydown);
}

function bootstrap() {
  wireEvents();
  render();
  updateResumeButton(hasSave());
}

bootstrap();
