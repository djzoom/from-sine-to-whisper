# Reference implementation — L31_visual_probability

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def shannon_entropy(p: np.ndarray) -> float:
    """Compute the Shannon entropy of a discrete probability distribution p (in bits)."""
    p = np.asarray(p, dtype=float)
    nz = p[p > 0]                       # skip the p=0 terms (convention: 0·log0 = 0)
    return float(-np.sum(nz * np.log2(nz)))
```
