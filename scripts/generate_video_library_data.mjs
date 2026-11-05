// Parses docs/VIDEO_LIBRARY.md (the video library, single source of truth) into
// quest/src/video-library.generated.js, which quest/video-library.html renders as a
// searchable, filterable list. The Markdown is the answer key; this script only
// converts it mechanically and never edits the content.
//
//   node scripts/generate_video_library_data.mjs
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const sourcePath = path.join(repoRoot, "docs", "VIDEO_LIBRARY.md");
const outputPath = path.join(repoRoot, "quest", "src", "video-library.generated.js");

// Only ### headings inside these ## sections are entries (the intro sections have
// no ### headings, but checking explicitly is more robust).
const PHASE_HEADING = /^## (Phase .+|aurora\.tts .+)$/;

const FIELD_KEYS = {
  Instructor: "instructor",
  Links: "links",
  Type: "type",
  Level: "difficulty",
  Language: "language",
  Duration: "duration",
  Covers: "covers",
  Lessons: "align",
  "Why it fits": "why",
};

// Filter vocabularies shared with quest/video-library.html (data-value on the chips).
export const LEVELS = ["Beginner", "Intermediate", "Advanced"];
export const FORMATS = ["Video", "Playlist", "Course", "Channel"];

function cleanText(value) {
  return value.replace(/\s+/g, " ").trim();
}

// Strip bold / inline-code Markdown from field values (the page renders plain text).
function stripMarkdown(value) {
  return cleanText(value.replace(/\*\*|[`]/g, ""));
}

// A bullet may hold several `**Field**: value` pairs joined by ` · ` (the compact
// form used for Type / Level / Language / Duration); split them apart.
function parseFieldLine(line, entry) {
  const body = line.replace(/^-\s*/, "");
  const segments = body.split(/\s·\s(?=\*\*)/);
  for (const segment of segments) {
    const match = segment.match(/^\*\*(.+?)\*\*:\s*(.*)$/s);
    if (!match) continue;
    const key = FIELD_KEYS[cleanText(match[1])];
    if (key) entry[key] = key === "links" ? cleanText(match[2]) : stripMarkdown(match[2]);
  }
}

// Stable short id (djb2 → base36) used to address entries in the checklist save;
// renaming a title makes it a new entry.
function hashId(text) {
  let hash = 5381;
  for (let i = 0; i < text.length; i += 1) {
    hash = ((hash << 5) + hash + text.charCodeAt(i)) >>> 0;
  }
  return hash.toString(36);
}

function extractUrls(text) {
  return [...new Set(text.match(/https?:\/\/[^\s()<>|]+/g) ?? [])].map((url) =>
    url.replace(/[.,;:]+$/, "")
  );
}

function urlLabel(url) {
  if (/[?&]list=/.test(url)) return "Playlist";
  if (/youtube\.com\/(watch|shorts)|youtu\.be\//.test(url)) return "Video";
  if (/youtube\.com\/(@|c\/|channel\/|user\/)/.test(url)) return "Channel";
  if (/github\.com/.test(url)) return "Code";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Link";
  }
}

// Coarse format tags from the free-text Type field, for the Format filter.
// Parenthetical asides ("part of a full course") don't count toward the format.
function formatTags(rawType) {
  const type = rawType.replace(/\([^)]*\)/g, " ");
  const tags = [];
  if (/single videos?|\bvideo\b/i.test(type)) tags.push("Video");
  if (/playlist|series/i.test(type)) tags.push("Playlist");
  if (/course|lecture/i.test(type)) tags.push("Course");
  if (/channel/i.test(type)) tags.push("Channel");
  return FORMATS.filter((format) => tags.includes(format));
}

function parseLibrary(markdown) {
  const phases = [];
  const items = [];
  let currentPhase = null;
  let entry = null;

  const flush = () => {
    if (!entry) return;
    const searchable = [
      entry.title,
      entry.instructor,
      entry.covers,
      entry.align,
      entry.why,
      entry.type,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const difficulty = entry.difficulty ?? "";
    const language = entry.language ?? "";
    items.push({
      ...entry,
      id: hashId(`${entry.phase}|${entry.title}`),
      urls: extractUrls(entry.links ?? "").map((url) => ({ url, label: urlLabel(url) })),
      topPick: entry.topPick,
      unverified: /⚠️/.test(Object.values(entry).join(" ")),
      diffLevels: LEVELS.filter((level) => difficulty.includes(level)),
      langTags: /English/.test(language) ? ["English"] : [],
      formatTags: formatTags(entry.type ?? ""),
      searchable,
    });
    entry = null;
  };

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trimEnd();
    const phaseMatch = line.match(PHASE_HEADING);
    if (line.startsWith("## ")) {
      flush();
      currentPhase = phaseMatch ? cleanText(phaseMatch[1]) : null;
      if (currentPhase && !phases.includes(currentPhase)) phases.push(currentPhase);
      continue;
    }
    if (line.startsWith("### ") && currentPhase) {
      flush();
      const rawTitle = cleanText(line.slice(4));
      entry = {
        title: cleanText(rawTitle.replace(/🥇/g, "")),
        topPick: rawTitle.includes("🥇"),
        phase: currentPhase,
      };
      continue;
    }
    if (entry && line.startsWith("- **")) parseFieldLine(line, entry);
  }
  flush();
  return { phases, items };
}

function validate(items) {
  const problems = [];
  for (const item of items) {
    for (const key of ["instructor", "links", "type", "difficulty", "language", "align", "why"]) {
      if (!item[key]) problems.push(`"${item.title}": missing ${key}`);
    }
    if (!item.diffLevels.length) problems.push(`"${item.title}": unknown level "${item.difficulty}"`);
    if (!item.langTags.length) problems.push(`"${item.title}": language is not English`);
    if (!item.urls.length) problems.push(`"${item.title}": no links`);
  }
  return problems;
}

async function main() {
  const markdown = await fs.readFile(sourcePath, "utf8");
  const { phases, items } = parseLibrary(markdown);
  if (items.length < 50) {
    throw new Error(
      `Unexpected entry count (${items.length} < 50): has the structure of VIDEO_LIBRARY.md changed?`
    );
  }
  const problems = validate(items);
  if (problems.length) {
    throw new Error(`VIDEO_LIBRARY.md has incomplete entries:\n  ${problems.join("\n  ")}`);
  }
  const payload = {
    source: "docs/VIDEO_LIBRARY.md",
    count: items.length,
    phases,
    levels: LEVELS,
    formats: FORMATS,
    items,
  };
  const banner =
    "// Generated by: node scripts/generate_video_library_data.mjs (do not edit by hand; edit docs/VIDEO_LIBRARY.md)\n";
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(
    outputPath,
    `${banner}export const videoLibrary = ${JSON.stringify(payload, null, 2)};\n`,
    "utf8"
  );
  console.log(
    `${items.length} entries (${phases.length} phases) -> ${path.relative(repoRoot, outputPath)}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
