# Reference implementation — L80_similarity

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def find_similar(
    query_emb: np.ndarray,
    library_embs: np.ndarray,
    top_k: int = 5,
) -> tuple[np.ndarray, np.ndarray]:
    # L2 normalization
    q = query_emb / (np.linalg.norm(query_emb) + 1e-12)
    norms = np.linalg.norm(library_embs, axis=1, keepdims=True) + 1e-12
    L = library_embs / norms
    # cosine similarity = inner product (after normalization)
    scores = L @ q
    # top-k via argpartition
    top_k = min(top_k, len(scores))
    part_idx = np.argpartition(scores, -top_k)[-top_k:]
    # sort within the top k (descending)
    order = np.argsort(scores[part_idx])[::-1]
    indices = part_idx[order]
    return indices, scores[indices]
```
