# Reference implementation — L26_visual_calculus

> ⚠️ Do the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def central_diff(f, x, h=1e-5):
    """Approximate the first derivative of f at x with a central difference.
    Parameters:
        f : callable, takes a scalar and returns a scalar
        x : float, the point to differentiate at
        h : float, step size (default 1e-5)
    Returns: float
    """
    return (f(x + h) - f(x - h)) / (2 * h)
```
