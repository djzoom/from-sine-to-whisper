"""Render the social preview images (1200x630 PNG) and the QR code used by the
companion pages, into quest/og/.

    python scripts/render_og_images.py

Needs playwright (with Chromium) and segno. The images are committed to the repo
so GitHub Pages serves them as static files; rerun this after changing the
templates below. The pixel sprite is read from quest/src/sprites.js so the card
always shows the same boss the game does.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "quest" / "og"
SPRITES = ROOT / "quest" / "src" / "sprites.js"
SITE = "https://djzoom.github.io/from-sine-to-whisper/"
REPO = "github.com/djzoom/from-sine-to-whisper"

BASE_CSS = """
  * { box-sizing: border-box; }
  html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; }
  body {
    position: relative;
    color: #edf7ff;
    font-family: "IBM Plex Mono", "DejaVu Sans Mono", "Liberation Mono", Consolas, monospace;
    background:
      radial-gradient(circle at 20% 15%, rgba(102, 232, 255, 0.16), transparent 32%),
      radial-gradient(circle at 85% 90%, rgba(255, 111, 145, 0.12), transparent 30%),
      linear-gradient(180deg, #050814 0%, #081223 55%, #04070e 100%);
  }
  body::before {
    content: ""; position: absolute; inset: 0; pointer-events: none;
    background: repeating-linear-gradient(to bottom, rgba(255,255,255,0.035), rgba(255,255,255,0.035) 1px, transparent 1px, transparent 4px);
  }
  .panel {
    position: absolute; inset: 40px;
    background: #0b1428;
    border: 4px solid rgba(140, 197, 255, 0.45);
    box-shadow: 0 0 0 4px #04070e, 14px 14px 0 rgba(0, 0, 0, 0.55);
    display: flex; align-items: center; gap: 48px; padding: 48px 56px;
  }
  .art { flex: none; width: 320px; height: 320px; display: grid; place-items: center; }
  .text { flex: 1; min-width: 0; }
  .eyebrow { font-size: 22px; letter-spacing: 0.24em; color: #ffc85e; text-transform: uppercase; text-shadow: 2px 2px 0 #04070e; }
  h1 { margin: 18px 0 20px; font-size: 56px; line-height: 1.15; color: #b8fbff; text-shadow: 4px 4px 0 #04070e, 0 0 24px rgba(102, 232, 255, 0.35); }
  .hook { font-size: 27px; line-height: 1.45; color: #edf7ff; margin: 0 0 30px; }
  .hook b { color: #ffc85e; font-weight: 700; }
  .repo {
    display: inline-block; font-size: 24px; color: #66e8ff; padding: 10px 18px;
    background: #070d1d; border: 3px solid rgba(102, 232, 255, 0.55); box-shadow: 0 5px 0 #04070e;
  }
  .tags { margin-top: 18px; font-size: 20px; color: #9fb4cb; letter-spacing: 0.06em; }
  svg { shape-rendering: crispEdges; }
"""

QUEST_HTML = """<!doctype html><html><head><meta charset="utf-8"><style>{css}
  .hp { display: flex; gap: 5px; margin-top: 18px; justify-content: center; }
  .hp i { width: 20px; height: 14px; background: #ff6f91; border: 2px solid #04070e; }
  .hp i.off { background: #1a2440; }
  .boss { font-size: 18px; color: #ff6f91; letter-spacing: 0.14em; text-align: center; margin-top: 10px; }
</style></head><body>
<div class="panel">
  <div class="art"><div>
    {sprite}
    <div class="hp"><i></i><i></i><i></i><i></i><i></i><i></i><i class="off"></i><i class="off"></i><i class="off"></i><i class="off"></i></div>
    <div class="boss">BLACK-BOX GATEKEEPER</div>
  </div></div>
  <div class="text">
    <div class="eyebrow">Aurora Quest · the course RPG</div>
    <h1>A free audio-AI course, played as an 8-bit game</h1>
    <p class="hook">Defeat <b>seven black-box bosses</b> and work through <b>99 lessons</b>, from a sine wave to Whisper, all in NumPy.</p>
    <span class="repo">{repo}</span>
    <div class="tags">FREE · MIT LICENSE · NO SIGN-UP</div>
  </div>
</div></body></html>"""

VIDEOS_HTML = """<!doctype html><html><head><meta charset="utf-8"><style>{css}
  .grid { display: grid; grid-template-columns: repeat(10, 26px); gap: 6px; }
  .grid i { width: 26px; height: 26px; background: #0f1b33; border: 2px solid rgba(140, 197, 255, 0.4); }
  .grid i.on { background: #8ff3a5; border-color: #8ff3a5; }
  .grid i.pick { background: #ffc85e; border-color: #ffc85e; }
  .count { text-align: center; margin-top: 16px; font-size: 22px; color: #8ff3a5; letter-spacing: 0.1em; }
</style></head><body>
<div class="panel">
  <div class="art"><div>
    <div class="grid">{cells}</div>
    <div class="count">31 / 83 WATCHED</div>
  </div></div>
  <div class="text">
    <div class="eyebrow">Video Library · Sine to Whisper</div>
    <h1>83 lectures, mapped to a free audio-AI course</h1>
    <p class="hook"><b>3Blue1Brown, Karpathy, MIT, Stanford, CMU</b> and more, each tied to the lesson it supports in the <b>99-lesson</b> course.</p>
    <span class="repo">{repo}</span>
    <div class="tags">FREE · MIT LICENSE · NO SIGN-UP</div>
  </div>
</div></body></html>"""


def sprite_svg(name: str, size: int = 240) -> str:
    """Read one 16x16 sprite from sprites.js and return it as an inline SVG."""
    src = SPRITES.read_text(encoding="utf-8")
    palette = dict(re.findall(r'^\s*([A-Z]):\s*"(#[0-9a-fA-F]{6})"', src, flags=re.M))
    block = re.search(rf"{name}:\s*\[(.*?)\]", src, flags=re.S)
    if not block:
        raise SystemExit(f"sprite {name!r} not found in {SPRITES}")
    rows = re.findall(r'"([.A-Z]{16})"', block.group(1))
    rects = []
    for y, row in enumerate(rows):
        for x, ch in enumerate(row):
            if ch != ".":
                rects.append(f'<rect x="{x}" y="{y}" width="1" height="1" fill="{palette[ch]}"/>')
    return (
        f'<svg width="{size}" height="{size}" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">'
        + "".join(rects)
        + "</svg>"
    )


def video_cells(total: int = 83, watched: int = 31) -> str:
    """A deterministic 'lesson map': the first `watched` cells are green, a few amber picks."""
    picks = {2, 9, 17, 24, 40, 55, 71}
    cells = []
    for i in range(total):
        cls = "on" if i < watched else ("pick" if i in picks else "")
        cells.append(f'<i class="{cls}"></i>' if cls else "<i></i>")
    return "".join(cells)


def fill(template: str, **values: str) -> str:
    """Plain placeholder substitution (str.format would trip over the CSS braces)."""
    for key, value in values.items():
        template = template.replace("{" + key + "}", value)
    return template


def render(html: str, out: Path) -> None:
    from playwright.sync_api import sync_playwright

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1200, "height": 630}, device_scale_factor=1)
        page.set_content(html)
        page.wait_for_timeout(100)
        page.screenshot(path=str(out), type="png", clip={"x": 0, "y": 0, "width": 1200, "height": 630})
        browser.close()
    print(f"wrote {out.relative_to(ROOT)}")


def qr(url: str, out: Path) -> None:
    import segno

    segno.make(url, error="m").save(str(out), scale=8, border=2, dark="#04070e", light="#ffffff")
    print(f"wrote {out.relative_to(ROOT)}")


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    render(fill(QUEST_HTML, css=BASE_CSS, sprite=sprite_svg("blackbox"), repo=REPO), OUT / "quest.png")
    render(fill(VIDEOS_HTML, css=BASE_CSS, cells=video_cells(), repo=REPO), OUT / "videos.png")
    qr(SITE + "video-library.html", OUT / "qr-video-library.png")
    qr(SITE, OUT / "qr-quest.png")
    return 0


if __name__ == "__main__":
    sys.exit(main())
