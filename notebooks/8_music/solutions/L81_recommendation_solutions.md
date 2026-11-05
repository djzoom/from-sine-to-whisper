# Reference implementation — L81_recommendation

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def recommend(
    user_history_ids: list[int],
    all_embs: np.ndarray,
    top_k: int = 10,
) -> np.ndarray:
    """Cosine k-NN recommendation from a mean-embedding user profile.

    Args:
        user_history_ids: list of ids of songs the user likes; an empty list triggers cold start
        all_embs:         (N, d) L2-normalized song embeddings
        top_k:            number of results to return
    Returns:
        (top_k,) np.ndarray[int], recommended song ids, by descending similarity
    """
    # Step 1: cold start — if the history is empty, use the library-wide mean (geometric center) as a neutral starting point
    if len(user_history_ids) == 0:
        user_emb = all_embs.mean(axis=0)
    else:
        # Step 2: user profile = mean of the history songs' embeddings
        user_emb = all_embs[user_history_ids].mean(axis=0)

    # L2-normalize so the inner product equals cosine similarity
    user_emb = user_emb / (np.linalg.norm(user_emb) + 1e-8)

    # Step 3: cosine similarity (embeddings are normalized, so inner product = cosine)
    scores = all_embs @ user_emb

    # Step 4: filter the history — set it to -inf so it sorts to the end, argsort descending, take top_k
    scores = scores.copy()
    if len(user_history_ids) > 0:
        scores[user_history_ids] = -np.inf
    ranked = np.argsort(scores)[::-1]
    return ranked[:top_k]
```
