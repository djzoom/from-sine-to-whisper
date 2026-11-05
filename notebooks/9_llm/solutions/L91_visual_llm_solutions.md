# Answer key — L91_visual_llm

> ⚠️ Work through the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def find_top_pairs(A: np.ndarray, tokens: list, k: int = 3) -> list:
    """Pull the strongest token-association pairs out of an attention-weight matrix.

    Returns
    -------
    list of (query_token: str, key_token: str, weight: float)
        In descending order of weight, length k.
    """
    # Step 1: list every (i, j) pair with its weight
    pairs = [
        (tokens[i], tokens[j], float(A[i, j]))
        for i, j in np.ndindex(A.shape)
    ]
    # Step 2: sort by weight in descending order
    pairs.sort(key=lambda x: -x[2])
    # Step 3: take the first k
    return pairs[:k]
```
