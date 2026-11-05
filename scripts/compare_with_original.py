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
import subprocess
import sys
from pathlib import Path

import nbformat
from nbclient import NotebookClient

ROOT = Path(__file__).resolve().parents[1]
# Files a lesson may write while it runs (figures, audio, arrays, weights).
ARTIFACTS = (".png", ".jpg", ".jpeg", ".svg", ".pdf", ".gif", ".wav", ".flac", ".mp3",
             ".npy", ".npz", ".pt", ".pth", ".pkl", ".csv")


def _git(repo: Path, *args: str) -> str:
    return subprocess.run(["git", "-C", str(repo), *args], capture_output=True, text=True).stdout


def _artifact_state(repo: Path) -> set[str]:
    out = _git(repo, "status", "--porcelain", "--untracked-files=all")
    return {line[3:] for line in out.splitlines() if line[3:].lower().endswith(ARTIFACTS)}


def _restore(repo: Path, before: set[str]) -> None:
    """Undo artifacts a lesson run created or modified, leaving everything else alone."""
    if not (repo / ".git").exists():
        return
    for rel in _artifact_state(repo) - before:
        if _git(repo, "ls-files", "--", rel).strip():
            _git(repo, "checkout", "--", rel)  # tracked file the run overwrote
        else:
            (repo / rel).unlink(missing_ok=True)  # new file the run created


def signature(path: Path) -> list[tuple[int, str]]:
    repo = Path(_git(path.parent, "rev-parse", "--show-toplevel").strip() or path.parent)
    before = _artifact_state(repo)
    try:
        return _signature(path)
    finally:
        _restore(repo, before)


def _signature(path: Path) -> list[tuple[int, str]]:
    nb = nbformat.read(path, as_version=4)
    os.environ.setdefault("MPLBACKEND", "Agg")
    # Never download large pretrained models just to compare behaviour: with the
    # hub offline, a model-loading cell fails the same way in both editions.
    os.environ.setdefault("HF_HUB_OFFLINE", "1")
    os.environ.setdefault("TRANSFORMERS_OFFLINE", "1")
    os.environ.setdefault("HF_DATASETS_OFFLINE", "1")
    os.environ.setdefault("WANDB_MODE", "disabled")
    NotebookClient(
        nb,
        timeout=600,
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
