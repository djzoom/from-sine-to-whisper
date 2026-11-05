# Reference implementation — L27_probability_basics

> ⚠️ Do the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def estimate_prob_six(n, seed=0):
    rng = np.random.default_rng(seed)
    rolls = rng.integers(1, 7, size=n)
    return np.mean(rolls == 6)
```
