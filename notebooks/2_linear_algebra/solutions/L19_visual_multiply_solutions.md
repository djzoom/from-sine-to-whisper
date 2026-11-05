# Reference implementation — L19_visual_multiply

> ⚠️ Please finish the exercises on your own first, then look at the reference implementation.

## Reference implementation 1 — classify_transform

```python
def classify_transform(A, tol=1e-9):
    """Return 'rotation' | 'reflection' | 'scaling' | 'shear'"""
    A = np.asarray(A, float)
    d = np.linalg.det(A)
    # Orthogonal matrix: AᵀA = I (preserves lengths and angles) → rotation or reflection, told apart by the sign of det
    if np.allclose(A.T @ A, np.eye(A.shape[0]), atol=tol):
        return 'rotation' if d > 0 else 'reflection'
    # Not orthogonal: a diagonal matrix = independent scaling along each axis; otherwise it's a shear
    if np.allclose(A, np.diag(np.diag(A)), atol=tol):
        return 'scaling'
    return 'shear'
```
