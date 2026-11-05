# Reference implementation — L82_visual_music

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def detect_minor_triad(chroma_frame: np.ndarray, threshold: float = 0.5) -> list[int]:
    """Detect minor-triad roots in one frame of chroma.

    Relative to root r, the pitch classes of a minor triad are (r, (r+3)%12, (r+7)%12):
    the root, a minor third (3 semitones) and a perfect fifth (7 semitones).
    A root counts as "active" if and only if all three pitches have energy above threshold.

    Args:
        chroma_frame: shape (12,), the normalized energy (0–1) of each pitch class.
        threshold: energy threshold; above it a pitch counts as "active".

    Returns:
        List of all roots (0–11) that satisfy the condition; an empty list means no minor triad was detected.
    """
    roots = []
    for r in range(12):
        third = (r + 3) % 12
        fifth = (r + 7) % 12
        if (
            chroma_frame[r] > threshold
            and chroma_frame[third] > threshold
            and chroma_frame[fifth] > threshold
        ):
            roots.append(r)
    return roots
```
