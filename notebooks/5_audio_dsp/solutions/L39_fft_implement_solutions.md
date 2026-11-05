# Reference implementation — L39_fft_implement

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def my_fft(x: np.ndarray) -> np.ndarray:
    N = len(x)
    if N == 1:
        return x.astype(complex)
    E = my_fft(x[::2])            # even-index subproblem
    O = my_fft(x[1::2])           # odd-index subproblem
    k = np.arange(N // 2)
    twiddle = np.exp(-2j * np.pi * k / N)  # twiddle factors
    top    = E + twiddle * O
    bottom = E - twiddle * O
    return np.concatenate([top, bottom])
```

