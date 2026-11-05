# Reference implementation — L13_special_matrices

> ⚠️ Please finish the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def is_orthogonal(Q):
    n = len(Q)
    return bool(np.allclose(Q.T @ Q, np.eye(n)))
```
