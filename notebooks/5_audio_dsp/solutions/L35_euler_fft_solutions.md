# Reference implementation — L35_euler_fft

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def euler(theta):
    return np.cos(theta) + 1j * np.sin(theta)
```

## Reference implementation 2

```python
def twiddle(k, n, N):
    return euler(-2 * np.pi * k * n / N)
```
