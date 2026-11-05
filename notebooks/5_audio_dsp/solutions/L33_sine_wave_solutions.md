# Reference implementation — L33_sine_wave

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def my_sine(freq, duration, sample_rate, amplitude=1.0):
    N = int(duration * sample_rate)  # truncate, consistent with aurora.audio.sine
    n = np.arange(N)
    angle = 2 * np.pi * freq * n / sample_rate
    return amplitude * np.sin(angle)
```
