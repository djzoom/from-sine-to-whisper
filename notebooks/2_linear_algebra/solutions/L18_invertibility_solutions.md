# Reference implementation — L18_invertibility

> ⚠️ Please finish the exercises on your own first, then look at the reference implementation.

## Reference implementation 1 — extract_null_vector

```python
def extract_null_vector(B):
    """Return the null-space vector v of matrix B (the one for the smallest singular value)."""
    B = np.asarray(B, float)
    # SVD: B = U · diag(s) · Vt; the smallest singular value goes with the last row of Vt
    U, s, Vt = np.linalg.svd(B)
    return Vt[-1]
```

## Reference implementation 2 — is_sdd

```python
def is_sdd(A):
    A = np.asarray(A, float)
    n = len(A)
    return all(abs(A[i, i]) > np.sum(np.abs(A[i])) - abs(A[i, i]) for i in range(n))

# Equivalent vectorized version:
# diag = np.abs(np.diag(A))
# off  = np.sum(np.abs(A), axis=1) - diag
# return bool(np.all(diag > off))
```
