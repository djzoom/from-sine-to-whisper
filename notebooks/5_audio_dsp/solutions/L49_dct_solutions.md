# Reference implementation — L49_dct

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def dct_ii(x: np.ndarray) -> np.ndarray:
    N = len(x)
    k = np.arange(N)
    n = np.arange(N)
    M = np.cos(np.pi * np.outer(k, 2 * n + 1) / (2 * N))
    scale = np.full(N, np.sqrt(2.0 / N))
    scale[0] = np.sqrt(1.0 / N)
    return (M @ x) * scale
```
