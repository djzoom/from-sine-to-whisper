"""Check that each English lesson behaves exactly like its Chinese original.

    python scripts/compare_with_original.py --aurora ../AURORA [L01 L02 ...]

Both notebooks are executed in "student state" (exercises unfilled, errors
allowed). For every code cell we record whether it ran cleanly or which
exception it raised; the two lists must be identical. This catches a
translation that accidentally changed what a cell does — without caring about
the language of the text it prints.

Needs: nbclient, nbformat, ipykernel, and the `aurora` package installed.
"""

from __future__ import annotations

import argparse
import os
import sys
from pathlib import Path

import nbformat
from nbclient import NotebookClient

ROOT = Path(__file__).resolve().parents[1]


def signature(path: Path) -> list[tuple[int, str]]:
    nb = nbformat.read(path, as_version=4)
    os.environ.setdefault("MPLBACKEND", "Agg")
    NotebookClient(
        nb,
        timeout=180,
        kernel_name="python3",
        allow_errors=True,
        resources={"metadata": {"path": str(path.parent)}},
    ).execute()
    sig = []
    for i, cell in enumerate(nb.cells):
        if cell.cell_type != "code":
            continue
        errs = [o.get("ename") for o in cell.get("outputs", []) if o.get("output_type") == "error"]
        sig.append((i, errs[0] if errs else "ok"))
    return sig


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--aurora", required=True, help="path to a checkout of djzoom/AURORA")
    ap.add_argument("lessons", nargs="*", help="e.g. L01 L07 (default: all English lessons)")
    args = ap.parse_args()
    aurora = Path(args.aurora).resolve()

    ok = True
    for en in sorted((ROOT / "notebooks").rglob("L*.ipynb")):
        lesson = en.name[:3]
        if args.lessons and lesson not in args.lessons:
            continue
        zh = aurora / en.relative_to(ROOT)
        if not zh.exists():
            print(f"{lesson}: no Chinese original at {zh}")
            ok = False
            continue
        a, b = signature(zh), signature(en)
        same = a == b
        ok &= same
        print(f"{lesson}: {'identical' if same else 'DIFFERENT'}")
        if not same:
            print(f"   zh: {a}\n   en: {b}")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
