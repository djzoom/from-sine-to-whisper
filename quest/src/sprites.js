// 8-bit boss sprites — 16×16 character grids drawn by hand and rendered pixel by
// pixel on a canvas, with no image files. Each character maps to one palette
// entry; '.' is transparent. To change a sprite, just edit its character art.

const PALETTE = {
  K: "#10182e", // dark body
  W: "#edf7ff", // white
  C: "#66e8ff", // cyan
  D: "#2a7fa8", // dark cyan
  A: "#ffc85e", // amber
  M: "#ff6f91", // magenta
  G: "#8ff3a5", // green
  P: "#b48cff", // purple
};

export const SPRITES = {
  // The Black-Box Gatekeeper: a sealed black box with a grin
  blackbox: [
    "................",
    "...WWWWWWWWWW...",
    "..WKKKKKKKKKKW..",
    "..WKKKKKKKKKKW..",
    "..WKAAKKKKAAKW..",
    "..WKAAKKKKAAKW..",
    "..WKKKKKKKKKKW..",
    "..WKMKKKKKKMKW..",
    "..WKKMMMMMMKKW..",
    "..WKKKKKKKKKKW..",
    "..WKKKKKKKKKKW..",
    "...WWWWWWWWWW...",
    "....C......C....",
    "...CC......CC...",
    "................",
    "................",
  ],
  // The Spectrum Warden: a waveform ghost with spectrum stripes inside
  spectrum: [
    "................",
    ".....CCCCCC.....",
    "....CCCCCCCC....",
    "...CCCCCCCCCC...",
    "...CWWCCCCWWC...",
    "...CWKCCCCWKC...",
    "...CCCCCCCCCC...",
    "...CCCCCCCCCC...",
    "...CDCDCDCDCD...",
    "...CDCDCDCDCD...",
    "...CCCCCCCCCC...",
    "...CCCCCCCCCC...",
    "...CC.CC.CC.CC..",
    "................",
    "................",
    "................",
  ],
  // The Backprop Knight: a helmeted knight with an amber visor slit and a chain crest
  knight: [
    "................",
    "......MM........",
    ".....MMMM.......",
    "....WWWWWW......",
    "...WWWWWWWW.....",
    "...WWWWWWWW.....",
    "...WKAAAAKW.....",
    "...WWWWWWWW.....",
    "...WWWWWWWW.....",
    "....WDDDDW......",
    "....DDDDDD......",
    "...DDDDDDDD.....",
    "...DD.WW.DD.....",
    "...DD.WW.DD.....",
    "................",
    "................",
  ],
  // The Alignment Referee: a black-and-white striped shirt
  judge: [
    "................",
    ".....WWWWWW.....",
    "....WWWWWWWW....",
    "....WKWWWWKW....",
    "....WWWWWWWW....",
    "....WWKKKKWW....",
    ".....WWWWWW.....",
    "....KWKWKWKW....",
    "...KWKWKWKWKW...",
    "...WKWKWKWKWK...",
    "...KWKWKWKWKW...",
    "...WKWKWKWKWK...",
    "....KK....KK....",
    "................",
    "................",
    "................",
  ],
  // The Melody Imp: an eighth note with a face
  melody: [
    "................",
    ".........AAA....",
    ".........AAAA...",
    ".........A..A...",
    ".........A......",
    ".........A......",
    ".........A......",
    ".........A......",
    "......AAAA......",
    ".....AAAAAA.....",
    "....AAAAAAAA....",
    "....AKAAAAKA....",
    "....AAAAAAAA....",
    "....AAMMMMAA....",
    ".....AAAAAA.....",
    "......AAAA......",
  ],
  // The Retrieval Librarian: a thick green book wearing glasses
  librarian: [
    "................",
    "..GGGGGGGGGGGG..",
    "..GGGGGGGGGGGG..",
    "..GGKKKKKKKKGG..",
    "..GGKWKGGKWKGG..",
    "..GGKKKGGKKKGG..",
    "..GGGGGGGGGGGG..",
    "..GGGGMMMMGGGG..",
    "..GGGGGGGGGGGG..",
    "..GGGGGGGGGGGG..",
    "..GWWWWWWWWWWG..",
    "..GWWWWWWWWWWG..",
    "..GGGGGGGGGGGG..",
    "................",
    "................",
    "................",
  ],
  // The Chief Architect: a purple robot in a hard hat with a star on top
  architect: [
    "................",
    ".......WW.......",
    "......WWWW......",
    ".......WW.......",
    "....AAAAAAAA....",
    "...AAAAAAAAAA...",
    "...PPPPPPPPPP...",
    "...PCCPPPPCCP...",
    "...PCCPPPPCCP...",
    "...PPPPPPPPPP...",
    "...PGGGGGGGGP...",
    "...PPPPPPPPPP...",
    "....P..PP..P....",
    "................",
    "................",
    "................",
  ],
};

// quest.id → sprite key; the question bank stays pure data, the mapping lives here.
export const SPRITE_BY_QUEST = {
  prologue: "blackbox",
  "phase-1": "spectrum",
  "phase-2": "knight",
  "phase-3": "judge",
  "phase-4": "melody",
  "phase-5": "librarian",
  "phase-6": "architect",
};

export function drawSprite(canvas, key) {
  if (!canvas?.getContext) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const rows = SPRITES[key] ?? SPRITES.blackbox;
  canvas.width = 16;
  canvas.height = 16;
  ctx.clearRect(0, 0, 16, 16);
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x += 1) {
      const color = PALETTE[row[x]];
      if (!color) continue;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    }
  });
}
