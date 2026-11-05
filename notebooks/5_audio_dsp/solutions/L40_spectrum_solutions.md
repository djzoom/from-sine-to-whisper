# Reference implementation — L40_spectrum

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def frequency_bins(N: int, sr: int) -> np.ndarray:
    freqs_full = np.arange(N) * sr / N
    return freqs_full[:N // 2 + 1]
```
