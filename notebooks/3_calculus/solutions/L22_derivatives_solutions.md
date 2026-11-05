# Reference implementation — L22_derivatives

> ⚠️ Please finish the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def numeric_derivative(f, x, h=1e-5):
    return (f(x + h) - f(x - h)) / (2 * h)
```
