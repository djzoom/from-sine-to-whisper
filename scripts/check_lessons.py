"""Static checks for the English lessons. Exit code 0 = all good.

    python scripts/check_lessons.py                     # whole repo
    python scripts/check_lessons.py notebooks/x/L11_*.ipynb   # just these lessons

Checks every notebook under notebooks/:
  1. valid JSON / nbformat
  2. every code cell parses as Python (IPython magics skipped)
  3. the first cell is an H1 of the form "# Lesson N · ..." matching the file name
  4. no Chinese characters anywhere (notebooks, answer keys, helpers)
  5. every relative Markdown link points to a file that exists
"""

from __future__ import annotations

import ast
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
NB = ROOT / "notebooks"
CJK = re.compile(r"[　-〿一-鿿＀-￯]")
LINK = re.compile(r"\]\(([^)\s#]+)(?:#[^)]*)?\)")


def _src(cell: dict) -> str:
    s = cell.get("source", "")
    return "".join(s) if isinstance(s, list) else s


def main() -> int:
    problems: list[str] = []
    only = [Path(a).resolve() for a in sys.argv[1:]]
    notebooks = only or sorted(NB.rglob("L*.ipynb"))
    for path in notebooks:
        rel = path.relative_to(ROOT)
        try:
            nb = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as e:
            problems.append(f"{rel}: invalid JSON ({e})")
            continue
        cells = nb.get("cells", [])
        n = int(path.name[1:3])
        first = next((c for c in cells if c["cell_type"] == "markdown"), None)
        h1 = _src(first).splitlines()[0] if first else ""
        if not re.match(rf"# Lesson {n} · ", h1):
            problems.append(f"{rel}: first heading should start '# Lesson {n} · ' (got {h1[:50]!r})")
        for i, c in enumerate(cells):
            text = _src(c)
            if CJK.search(text):
                problems.append(f"{rel} cell {i}: contains Chinese characters")
            if c["cell_type"] == "code":
                code = "\n".join(
                    "pass" if l.lstrip().startswith(("%", "!")) else l for l in text.splitlines()
                )
                try:
                    ast.parse(code)
                except SyntaxError as e:
                    problems.append(f"{rel} cell {i}: syntax error ({e.msg}, line {e.lineno})")
            else:
                for m in LINK.finditer(text):
                    target = m.group(1)
                    if target.startswith(("http://", "https://", "mailto:")):
                        continue
                    if not (path.parent / target).resolve().exists():
                        problems.append(f"{rel} cell {i}: broken link {target}")

    extra = (
        [p.parent / "solutions" / f"{p.stem}_solutions.md" for p in only]
        if only
        else sorted(NB.rglob("*.md")) + sorted(NB.rglob("*.py"))
    )
    for path in [p for p in extra if p.exists()]:
        text = path.read_text(encoding="utf-8")
        if CJK.search(text):
            problems.append(f"{path.relative_to(ROOT)}: contains Chinese characters")
        if path.suffix == ".md":
            for m in LINK.finditer(text):
                t = m.group(1)
                if not t.startswith(("http://", "https://", "mailto:")) and not (
                    path.parent / t
                ).resolve().exists():
                    problems.append(f"{path.relative_to(ROOT)}: broken link {t}")

    print(f"{len(notebooks)} lessons checked")
    if problems:
        print("FAILED:\n  " + "\n  ".join(problems))
        return 1
    print("PASSED")
    return 0


if __name__ == "__main__":
    sys.exit(main())
