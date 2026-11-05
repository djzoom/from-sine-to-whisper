"""Refresh the course table in README.md from the lessons that exist.

    python scripts/update_readme.py

A lesson that has been translated links to its notebook here; one that hasn't
is marked "coming soon" and links to the Chinese original in djzoom/AURORA.
The status line ("Lessons L01–Lnn are available in English") is updated too.
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
AURORA = "https://github.com/djzoom/AURORA/blob/main/"
ROW = re.compile(
    r"^\| (?:\[(L\d\d)\]\([^)]*\)|(L\d\d))( 🎨)? \| (.*?)"
    r"(?: \*\(coming soon — \[Chinese original\]\(([^)]*)\)\)\*)? \|$"
)


def main() -> None:
    readme = ROOT / "README.md"
    lines = readme.read_text(encoding="utf-8").splitlines()
    have = {p.name[:3]: p.relative_to(ROOT).as_posix() for p in (ROOT / "notebooks").rglob("L*.ipynb")}
    out = []
    for line in lines:
        m = ROW.match(line)
        if not m:
            out.append(line)
            continue
        lesson = m.group(1) or m.group(2)
        art, title, zh = m.group(3) or "", m.group(4), m.group(5)
        if lesson in have:
            out.append(f"| [{lesson}]({have[lesson]}){art} | {title} |")
        else:
            zh = zh or f"{AURORA}notebooks/"
            out.append(f"| {lesson}{art} | {title} *(coming soon — [Chinese original]({zh}))* |")
    text = "\n".join(out) + "\n"
    n = len(have)
    if n >= 99:
        status = "> **Status.** All 99 lessons are available in English."
    else:
        status = (
            f"> **Status.** {n} of 99 lessons are available in English. The rest are being\n"
            "> translated from the [Chinese original](https://github.com/djzoom/AURORA); until\n"
            "> then each lesson below links to its Chinese version."
        )
    text = re.sub(r"> \*\*Status\.\*\*.*?(?=\n\n)", status, text, count=1, flags=re.S)
    readme.write_text(text, encoding="utf-8")
    print(f"README: {n} lessons linked")


if __name__ == "__main__":
    main()
