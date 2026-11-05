# Reference implementation — L17_eigen_diagonalization

> ⚠️ Please finish the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def char_poly(A, lam):
    A = np.asarray(A, float)
    return np.linalg.det(A - lam * np.eye(len(A)))
```
