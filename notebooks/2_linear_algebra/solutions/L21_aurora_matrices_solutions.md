# Reference implementation — L21_aurora_matrices

> ⚠️ Please finish the exercises on your own first, then look at the reference implementation.

## Reference implementation 1 — build_dft_matrix

```python
def build_dft_matrix(N: int) -> np.ndarray:
    """Return the N×N DFT matrix W, satisfying W @ x == np.fft.fft(x)."""
    n = np.arange(N)
    # W[k, n] = exp(-2πi·k·n/N): np.outer(n, n) produces every k·n combination in one go
    return np.exp(-2j * np.pi * np.outer(n, n) / N)
```

## Reference implementation 2 — build_simple_mel_matrix

```python
def build_simple_mel_matrix(n_mels: int, n_fft: int) -> np.ndarray:
    """Return a (n_mels, n_fft//2+1) linear-scale triangular filter matrix."""
    bins = np.arange(n_fft // 2 + 1, dtype=float)
    # n_mels+2 equally spaced endpoints (including the boundaries 0 and n_fft//2);
    # filter m takes lo/cen/hi from the neighboring triple (centers[m], centers[m+1], centers[m+2])
    centers = np.linspace(0, n_fft // 2, n_mels + 2)
    M = np.zeros((n_mels, len(bins)))
    for m in range(n_mels):
        lo, cen, hi = centers[m], centers[m + 1], centers[m + 2]
        # rising edge (bins-lo)/(cen-lo), falling edge (hi-bins)/(hi-cen), negatives clipped to 0
        M[m] = np.clip(np.where(bins <= cen,
                                (bins - lo) / (cen - lo + 1e-9),
                                (hi - bins) / (hi - cen + 1e-9)), 0, 1)
    return M
```
