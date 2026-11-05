# Reference implementation — L29_distributions

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def gaussian_pdf(x, mu=0.0, sigma=1.0):
    exponent = -((x - mu) ** 2) / (2 * sigma ** 2)
    normalization = sigma * np.sqrt(2 * np.pi)
    return np.exp(exponent) / normalization
```
