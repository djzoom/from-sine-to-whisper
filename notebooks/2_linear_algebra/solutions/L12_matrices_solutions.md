# Reference implementation — L12_matrices

> ⚠️ Please finish the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def matvec(A, x):
    out = np.zeros(A.shape[0])
    for i in range(A.shape[0]):
        out[i] = np.dot(A[i], x)
    return out
```

## Reference implementation 2

```python
def matmul(A, B):
    """Matrix × matrix: call matvec(A, col) on each column of B, then stack the results side by side as columns."""
    return np.column_stack([matvec(A, B[:, j]) for j in range(B.shape[1])])
```

