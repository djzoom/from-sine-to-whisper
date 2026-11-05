# Reference implementation — L34_aliasing

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def predict_alias_freq(freq, sample_rate):
    k = round(freq / sample_rate)
    return abs(freq - k * sample_rate)
```
