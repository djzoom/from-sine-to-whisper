"""Finalize a translated lesson for this repository.

    python scripts/finalize_lesson.py notebooks/<phase>/LNN_<name>.ipynb [...]

Run after a lesson has been translated. It makes the mechanical changes that
every lesson needs, so translators don't do them by hand:

* links to another lesson or answer key that exists here stay relative;
  links to one that hasn't been translated yet point to the Chinese original
  in djzoom/AURORA, marked *(Chinese)*; once that lesson is translated, running
  this again turns the link back into a relative one and drops the marker
  (any ".en" suffix from the translation step is dropped);
  links to other AURORA documents also point to AURORA on GitHub;
* imports of the Chinese-labelled plotting helpers are switched to the
  English copies that live next to the lessons
  (``aurora.laviz`` -> ``laviz``, ``aurora.aviz`` -> ``aviz``);
* all outputs and execution counts are cleared;
* translation-tool metadata is removed.
"""

from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
AURORA = "https://github.com/djzoom/AURORA/blob/main/"
LINK = re.compile(r"(\[[^\]]*\])\(([^)\s]+?)(#[^)\s]*)?\)")
IMPORTS = [
    (re.compile(r"\bfrom aurora\.laviz import\b"), "from laviz import"),
    (re.compile(r"\bimport aurora\.laviz as\b"), "import laviz as"),
    (re.compile(r"\bfrom aurora\.aviz import\b"), "from aviz import"),
    (re.compile(r"\bimport aurora\.aviz as\b"), "import aviz as"),
]
HELPERS = {"laviz": "2_linear_algebra", "aviz": "5_audio_dsp"}


def _fix_link(nb_path: Path, m: re.Match) -> str:
    text, target, anchor = m.group(1), m.group(2), m.group(3) or ""
    if target.startswith(AURORA):
        # A lesson that has since been translated: link to it here instead.
        local = ROOT / target[len(AURORA):]
        if local.exists():
            return f"{text}({os.path.relpath(local, nb_path.parent)}{anchor})"
        return m.group(0)
    if target.startswith(("http://", "https://", "mailto:", "#")):
        return m.group(0)
    target = target.replace(".en.ipynb", ".ipynb").replace("_solutions.en.md", "_solutions.md")
    local = (nb_path.parent / target).resolve()
    if local.exists():
        return f"{text}({target}{anchor})"
    # Not in this repo (yet): link to the same path in AURORA.
    rel = os.path.relpath(local, ROOT)
    if rel.startswith(".."):
        return m.group(0)
    return f"{text}({AURORA}{rel}{anchor})"


def finalize(path: Path) -> None:
    nb = json.loads(path.read_text(encoding="utf-8"))
    nb.get("metadata", {}).pop("aurora_translation", None)
    phase = path.parent.name
    for cell in nb["cells"]:
        src = cell["source"]
        s = "".join(src) if isinstance(src, list) else src
        if cell["cell_type"] == "markdown":
            s = LINK.sub(lambda m: _fix_link(path, m), s)
            # "(Chinese)" marks a link into AURORA; keep the marker in step with the link.
            s = re.sub(r"(\]\((?!https?://)[^)\s]+\))\s*\*\(Chinese\)\*", r"\1", s)
            s = re.sub(
                rf"(\]\({re.escape(AURORA)}notebooks/[^)\s]+\.ipynb[^)\s]*\))(?!\s*\*\(Chinese\)\*)",
                r"\1 *(Chinese)*",
                s,
            )
        else:
            for pat, repl in IMPORTS:
                mod = repl.split()[1]
                if pat.search(s) and HELPERS.get(mod) == phase:
                    s = pat.sub(repl, s)
            cell["outputs"] = []
            cell["execution_count"] = None
        cell["source"] = s.splitlines(keepends=True)
    path.write_text(json.dumps(nb, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"finalized {path.relative_to(ROOT)}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(2)
    for p in sys.argv[1:]:
        finalize(Path(p).resolve())
