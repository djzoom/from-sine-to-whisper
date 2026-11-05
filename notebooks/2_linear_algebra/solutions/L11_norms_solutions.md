# Reference implementation — L11_norms

> ⚠️ Please finish the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def normalize(v):
    n = np.linalg.norm(v)
    if n == 0:
        return v          # the zero vector has no direction: return all zeros to avoid the nan from dividing by zero
    return v / n
```
