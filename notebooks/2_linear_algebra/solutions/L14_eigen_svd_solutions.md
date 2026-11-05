# Reference implementation — L14_eigen_svd

> ⚠️ Please finish the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def low_rank_approx(A, k):
    """Return the rank-k approximation of A (same shape as A).

    Parameters
    ----------
    A : np.ndarray, shape (m, n)
    k : int, number of singular values to keep, 1 <= k <= min(m, n)
    """
    U, S, Vt = np.linalg.svd(A)           # A = U diag(S) Vt
    # Take the first k directions: first k columns of U · diag(top k singular values) · first k rows of Vt
    return U[:, :k] @ np.diag(S[:k]) @ Vt[:k, :]
```
