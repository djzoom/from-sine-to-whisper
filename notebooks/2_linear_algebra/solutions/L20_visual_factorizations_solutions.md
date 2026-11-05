# Reference implementation — L20_visual_factorizations

> ⚠️ Please finish the exercises on your own first, then look at the reference implementation.

## Reference implementation 1 — rank_from_svd

```python
def rank_from_svd(A, threshold=1e-10):
    """Compute a matrix's numerical rank with SVD (without calling np.linalg.matrix_rank)"""
    A = np.asarray(A, float)
    # Only the singular values are needed: numerical rank = number of significant singular values (> threshold · largest singular value)
    s = np.linalg.svd(A, compute_uv=False)
    if s.size == 0:
        return 0
    return int(np.sum(s > threshold * s[0]))
```
