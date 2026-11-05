# Reference implementation — L38_fft_butterfly

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def butterfly(E: np.ndarray, O: np.ndarray) -> np.ndarray:
    """One stage of butterfly merging: two N/2-point DFTs → one N-point DFT."""
    half = len(E)
    N = half * 2
    twiddles = np.exp(-2j * np.pi * np.arange(half) / N)  # twiddle factors W_N^k
    top    = E + twiddles * O   # top half of the spectrum X[0..N/2-1]
    bottom = E - twiddles * O   # bottom half of the spectrum X[N/2..N-1]
    return np.concatenate([top, bottom])
```
