# Reference implementation — L32_numpy_signals

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def time_axis(duration, sample_rate):
    N = round(duration * sample_rate)
    n = np.arange(N)
    return n / sample_rate
```
