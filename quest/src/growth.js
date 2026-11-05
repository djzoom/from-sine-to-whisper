// Growth and sharing — the star button with a live count, the share panel with
// ready-made copy, and the small toast used for soft star invitations. Shared by
// index.html (the game) and video-library.html.
//
// Ground rules (see the course README): nothing is gated behind a star, no
// login, no tracking. The only network call this file makes is one public,
// unauthenticated GitHub REST request for the star count, cached for an hour and
// silently skipped when it fails.

// ---- Editable copy: everything a share can say lives in this block ----------

export const REPO_URL = "https://github.com/djzoom/from-sine-to-whisper";
export const REPO_API = "https://api.github.com/repos/djzoom/from-sine-to-whisper";

export const PAGES = {
  quest: {
    url: "https://djzoom.github.io/from-sine-to-whisper/",
    title: "Aurora Quest",
    // One of these is picked at random for each share, so posts don't all read the same.
    lines: [
      "Aurora Quest: a free, MIT-licensed audio-AI course (99 lessons, FFT to Whisper, all in NumPy) played as an 8-bit quiz game.",
      "Seven black-box bosses, 99 lessons, no paywall. Aurora Quest is the game companion to From a Sine Wave to Whisper, a from-scratch audio-AI course.",
      "Learning audio AI from first principles with From a Sine Wave to Whisper (99 free lessons). The 8-bit companion game is a good way to check what stuck:",
    ],
    hashtags: ["audioAI", "machinelearning", "opensource"],
    emailSubject: "Aurora Quest: a free audio-AI course, played as an 8-bit game",
  },
  videos: {
    url: "https://djzoom.github.io/from-sine-to-whisper/video-library.html",
    title: "Video Library: From a Sine Wave to Whisper",
    lines: [
      "83 free lectures (3Blue1Brown, Karpathy, MIT, Stanford, CMU) mapped to the 99 lessons of From a Sine Wave to Whisper, with a watched-list you can tick off:",
      "A video library for learning audio AI from first principles: 83 lectures, each tied to the lesson it supports. Free, MIT-licensed, nothing to sign up for.",
      "Stuck on the FFT, backprop or the KV cache? This library maps 83 lectures to the 99 lessons of From a Sine Wave to Whisper:",
    ],
    hashtags: ["audioAI", "machinelearning", "opensource"],
    emailSubject: "A video library for learning audio AI from first principles",
  },
};

// The share-sheet text appended after the one-liner (the URL goes on its own line).
const COPY_FOOTER = `Course repo: ${REPO_URL}`;

// ---- Small helpers -----------------------------------------------------------

function storage() {
  try {
    return window.localStorage ?? null;
  } catch {
    return null;
  }
}

function readJson(key) {
  try {
    const raw = storage()?.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeJson(key, value) {
  try {
    storage()?.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: carry on without remembering */
  }
}

export function pickLine(page) {
  const lines = PAGES[page].lines;
  return lines[Math.floor(Math.random() * lines.length)];
}

export function formatCount(n) {
  if (n >= 10000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}

// ---- Star button ----------------------------------------------------------------

const STAR_CACHE_KEY = "sine-to-whisper.stars.v1";
const STAR_CACHE_MS = 60 * 60 * 1000; // 1 hour

async function fetchStarCount() {
  const cached = readJson(STAR_CACHE_KEY);
  if (cached && typeof cached.count === "number" && Date.now() - cached.at < STAR_CACHE_MS) {
    return cached.count;
  }
  try {
    const res = await fetch(REPO_API, { headers: { Accept: "application/vnd.github+json" } });
    if (!res.ok) return cached?.count ?? null; // rate-limited or offline: fall back to the last known number
    const data = await res.json();
    const count = Number(data?.stargazers_count);
    if (!Number.isFinite(count)) return cached?.count ?? null;
    writeJson(STAR_CACHE_KEY, { count, at: Date.now() });
    return count;
  } catch {
    return cached?.count ?? null;
  }
}

// Every element with [data-star-button] is a link to the repo; the count, when
// known, goes into its [data-star-count] child. Without a count the button simply
// reads "Star on GitHub".
export async function initStarButtons(root = document) {
  const buttons = [...root.querySelectorAll("[data-star-button]")];
  for (const btn of buttons) {
    btn.setAttribute("href", REPO_URL);
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener");
    if (!btn.getAttribute("aria-label")) btn.setAttribute("aria-label", "Star the course repository on GitHub");
  }
  const count = await fetchStarCount();
  if (count === null) return null;
  for (const btn of buttons) {
    const slot = btn.querySelector("[data-star-count]");
    if (slot) {
      slot.textContent = formatCount(count);
      slot.hidden = false;
    }
    btn.setAttribute("aria-label", `Star the course repository on GitHub, ${count} stars so far`);
  }
  return count;
}

// ---- Share panel -------------------------------------------------------------------

const MASTODON_KEY = "sine-to-whisper.mastodon-instance";

function shareTargets(page) {
  const { url, title, hashtags, emailSubject } = PAGES[page];
  const line = pickLine(page);
  const enc = encodeURIComponent;
  const full = `${line}\n${url}\n\n${COPY_FOOTER}`;
  return {
    line,
    text: full,
    buttons: [
      { id: "x", label: "X", href: `https://x.com/intent/post?text=${enc(line)}&url=${enc(url)}&hashtags=${enc(hashtags.join(","))}` },
      { id: "reddit", label: "Reddit", href: `https://www.reddit.com/submit?url=${enc(url)}&title=${enc(title + " - " + line)}` },
      { id: "hn", label: "Hacker News", href: `https://news.ycombinator.com/submitlink?u=${enc(url)}&t=${enc(title)}` },
      { id: "linkedin", label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
      { id: "bluesky", label: "Bluesky", href: `https://bsky.app/intent/compose?text=${enc(`${line}\n${url}`)}` },
      { id: "mastodon", label: "Mastodon", href: null },
      { id: "email", label: "Email", href: `mailto:?subject=${enc(emailSubject)}&body=${enc(full)}` },
    ],
  };
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function flash(button, label, restore = 1800) {
  const original = button.textContent;
  button.textContent = label;
  window.setTimeout(() => (button.textContent = original), restore);
}

let openPanel = null;

export function closeSharePanel() {
  if (!openPanel) return;
  const { overlay, opener, onKey } = openPanel;
  document.removeEventListener("keydown", onKey, true);
  overlay.remove();
  openPanel = null;
  opener?.focus?.();
}

// Opens the share panel as a small pixel dialog. `opener` gets focus back on close.
export function openSharePanel(page, opener = null) {
  closeSharePanel();
  const share = shareTargets(page);

  const overlay = document.createElement("div");
  overlay.className = "gr-overlay";
  overlay.innerHTML = `
    <div class="gr-panel" role="dialog" aria-modal="true" aria-labelledby="gr-share-title">
      <div class="gr-panel-head">
        <h2 id="gr-share-title" class="gr-title">Share this page</h2>
        <button type="button" class="gr-close" data-gr-close aria-label="Close share panel">✕</button>
      </div>
      <p class="gr-preview" data-gr-preview></p>
      <div class="gr-grid" data-gr-buttons></div>
      <div class="gr-mastodon" data-gr-mastodon hidden>
        <label class="gr-label" for="gr-mastodon-instance">Your Mastodon instance</label>
        <div class="gr-row">
          <input id="gr-mastodon-instance" class="gr-input" type="text" inputmode="url" placeholder="mastodon.social" autocomplete="off" />
          <button type="button" class="gr-btn" data-gr-mastodon-go>Open</button>
        </div>
      </div>
      <div class="gr-row gr-copy-row">
        <button type="button" class="gr-btn gr-btn-primary" data-gr-copy-text>Copy text</button>
        <button type="button" class="gr-btn" data-gr-copy-link>Copy link</button>
        <button type="button" class="gr-btn" data-gr-native hidden>Share sheet…</button>
      </div>
      <p class="gr-note">The course is free and MIT-licensed. Sharing it, or a star on GitHub, is always optional and always appreciated.</p>
    </div>`;

  const panel = overlay.querySelector(".gr-panel");
  overlay.querySelector("[data-gr-preview]").textContent = `${share.line} ${PAGES[page].url}`;

  const grid = overlay.querySelector("[data-gr-buttons]");
  for (const target of share.buttons) {
    const el = document.createElement(target.href ? "a" : "button");
    el.className = "gr-btn gr-share-target";
    el.dataset.share = target.id;
    el.textContent = target.label;
    if (target.href) {
      el.href = target.href;
      el.target = "_blank";
      el.rel = "noopener";
    } else {
      el.type = "button";
    }
    grid.appendChild(el);
  }

  const mastodonBox = overlay.querySelector("[data-gr-mastodon]");
  const mastodonInput = overlay.querySelector("#gr-mastodon-instance");
  mastodonInput.value = String(readJson(MASTODON_KEY) ?? "");
  const openMastodon = () => {
    const host = mastodonInput.value.trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    if (!host) {
      mastodonInput.focus();
      return;
    }
    writeJson(MASTODON_KEY, host);
    const text = encodeURIComponent(`${share.line}\n${PAGES[page].url}`);
    window.open(`https://${host}/share?text=${text}`, "_blank", "noopener");
  };
  overlay.querySelector('[data-share="mastodon"]').addEventListener("click", () => {
    mastodonBox.hidden = !mastodonBox.hidden;
    if (!mastodonBox.hidden) mastodonInput.focus();
  });
  overlay.querySelector("[data-gr-mastodon-go]").addEventListener("click", openMastodon);
  mastodonInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      openMastodon();
    }
  });

  const copyTextBtn = overlay.querySelector("[data-gr-copy-text]");
  copyTextBtn.addEventListener("click", async () => {
    flash(copyTextBtn, (await copyText(share.text)) ? "✓ Copied" : "Copy blocked");
  });
  const copyLinkBtn = overlay.querySelector("[data-gr-copy-link]");
  copyLinkBtn.addEventListener("click", async () => {
    flash(copyLinkBtn, (await copyText(PAGES[page].url)) ? "✓ Copied" : "Copy blocked");
  });

  const nativeBtn = overlay.querySelector("[data-gr-native]");
  if (navigator.share) {
    nativeBtn.hidden = false;
    nativeBtn.addEventListener("click", async () => {
      try {
        await navigator.share({ title: PAGES[page].title, text: share.line, url: PAGES[page].url });
      } catch {
        /* cancelled */
      }
    });
  }

  overlay.querySelector("[data-gr-close]").addEventListener("click", closeSharePanel);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeSharePanel();
  });

  // Keyboard: Escape closes; Tab stays inside the dialog.
  const onKey = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closeSharePanel();
      return;
    }
    if (event.key === "Tab") {
      const focusable = [...panel.querySelectorAll("a[href], button:not([hidden]), input")].filter(
        (el) => !el.closest("[hidden]"),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };
  document.addEventListener("keydown", onKey, true);

  document.body.appendChild(overlay);
  openPanel = { overlay, opener, onKey };
  grid.querySelector(".gr-share-target")?.focus();
  return overlay;
}

// Wires every [data-share-page] trigger on the page to the panel.
export function initShareTriggers(page, root = document) {
  for (const trigger of root.querySelectorAll("[data-share-page]")) {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openSharePanel(page, trigger);
    });
  }
}

// ---- Toast ------------------------------------------------------------------------

let activeToast = null;

// A one-line, dismissible toast with an optional star button. `onDismiss` runs
// whenever it goes away (close button or Escape).
export function showToast({ text, withStar = true, onDismiss = null }) {
  hideToast();
  const toast = document.createElement("div");
  toast.className = "gr-toast";
  toast.setAttribute("role", "status");
  toast.innerHTML = `
    <span class="gr-toast-text"></span>
    ${withStar ? '<a class="gr-btn gr-btn-primary gr-toast-star" data-star-button><span aria-hidden="true">⭐</span> Star on GitHub <span class="gr-star-count" data-star-count hidden></span></a>' : ""}
    <button type="button" class="gr-close" data-gr-toast-close aria-label="Dismiss">✕</button>`;
  toast.querySelector(".gr-toast-text").textContent = text;
  const dismiss = () => {
    if (activeToast !== toast) return;
    hideToast();
    onDismiss?.();
  };
  toast.querySelector("[data-gr-toast-close]").addEventListener("click", dismiss);
  toast.querySelector("[data-star-button]")?.addEventListener("click", () => {
    // Opening GitHub counts as "seen": don't nag again.
    onDismiss?.();
  });
  const onKey = (event) => {
    if (event.key === "Escape" && activeToast === toast && !openPanel) dismiss();
  };
  document.addEventListener("keydown", onKey);
  toast.addEventListener("gr:removed", () => document.removeEventListener("keydown", onKey));
  document.body.appendChild(toast);
  activeToast = toast;
  initStarButtons(toast);
  return toast;
}

export function hideToast() {
  if (!activeToast) return;
  activeToast.dispatchEvent(new Event("gr:removed"));
  activeToast.remove();
  activeToast = null;
}

// ---- Soft star invitations (video library) --------------------------------------

const NUDGE_KEY = "sine-to-whisper.star-nudges.v1";
export const NUDGE_THRESHOLDS = [5, 20];

// Call after every re-render with the current watched count. Shows the toast once
// when a threshold is first reached; remembers in localStorage so it never
// returns after being dismissed. A count that already passes several thresholds
// (an old checklist) shows a single toast.
export function maybeStarNudge(count) {
  const seen = readJson(NUDGE_KEY) ?? {};
  const due = NUDGE_THRESHOLDS.filter((t) => count >= t && !seen[t]);
  if (!due.length || activeToast) return false;
  const mark = () => {
    const next = readJson(NUDGE_KEY) ?? {};
    for (const t of due) next[t] = true;
    writeJson(NUDGE_KEY, next);
  };
  showToast({
    text: `${count} watched. Finding this useful? A star on GitHub helps other people find it.`,
    onDismiss: mark,
  });
  return true;
}
