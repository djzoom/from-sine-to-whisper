# Reference implementation — L23_gradients

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def gradient(f, point, h=1e-5):
    point = np.asarray(point, dtype=float)
    grad = np.zeros_like(point)
    for i in range(len(point)):
        e = np.zeros_like(point)
        e[i] = h
        grad[i] = (f(point + e) - f(point - e)) / (2 * h)
    return grad
```
