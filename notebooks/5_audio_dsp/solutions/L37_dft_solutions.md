# Reference implementation — L37_dft

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def naive_dft(x: np.ndarray) -> np.ndarray:
    x = np.asarray(x, dtype=complex)
    N = len(x)
    X = np.zeros(N, dtype=complex)
    n = np.arange(N)
    for k in range(N):
        twiddles = np.exp(-2j * np.pi * k * n / N)
        X[k] = np.dot(x, twiddles)
    return X
```
