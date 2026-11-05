# CLAUDE.md

Guidance for working in this repository (the English edition of AURORA).

## What this is

The English, culturally adapted edition of the 99-lesson AURORA audio-AI
course. Lessons live in `notebooks/<phase>/LNN_<name>.ipynb` with answer
keys in `solutions/`. Every lesson must keep the same cell count and order
as its Chinese original in djzoom/AURORA, and every code cell must succeed
or fail the same way (`scripts/compare_with_original.py`).

## Rules

- No Chinese characters anywhere (`scripts/check_lessons.py` enforces it).
- No Chinese cultural references; recurring students are Samuel, Ruth, Hannah.
- No social-media "follow" recommendations of any kind.
- Run `python scripts/check_lessons.py` before committing.

## Attribution

Never add Co-Authored-By, "Generated with Claude", session links or any
attribution line to commit messages, PR descriptions or files. Commits are
authored by the repository owner only.
