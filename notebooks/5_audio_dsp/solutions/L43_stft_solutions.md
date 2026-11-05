# Reference implementation — L43_stft

> ⚠️ Work through the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def frame_signal(x: np.ndarray, win_len: int, hop: int) -> np.ndarray:
    """Cut a 1-D signal into overlapping frames; return shape (n_frames, win_len)."""
    n_frames = 1 + (len(x) - win_len) // hop
    # sliding_window_view is zero-copy; [::hop] takes every hop-th row
    frames = np.lib.stride_tricks.sliding_window_view(x, win_len)[::hop]
    return frames[:n_frames].copy()  # make it writable and cut to the exact frame count
```
