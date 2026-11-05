# Reference implementation — L41_fft_full

> ⚠️ Work through the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

```python
from aurora.audio.transforms import fft as aurora_fft  # the Cooley-Tukey FFT you wrote by hand in L37-39


def windowed_fft(x: np.ndarray, window_type: str = "hann") -> np.ndarray:
    N = len(x)
    if window_type == "hann":
        window = hann(N)
    elif window_type == "hamming":
        window = hamming(N)
    elif window_type == "rectangular":
        window = np.ones(N)
    else:
        raise ValueError(f"unknown window type: {window_type}")
    x_win = x * window
    # Iron rule: the real engine is the from-scratch aurora.audio.transforms.fft
    # (radix-2 Cooley-Tukey, needs N to be a power of 2; every N in this lesson, 16/64/128/256, is).
    # np.fft.fft is only for cross-checking in the check cells, not the engine.
    return aurora_fft(x_win)
```
