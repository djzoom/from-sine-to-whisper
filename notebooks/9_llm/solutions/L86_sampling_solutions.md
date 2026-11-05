# Reference implementation — L86_sampling

> ⚠️ Try the exercises on your own first, then look at the reference implementation.

## Reference implementation 1 — Task 1: top-k sampling

```python
def top_k_sample(logits, k=10, temperature=1.0):
    """Sample from the k tokens with the largest logits."""
    logits = np.asarray(logits, dtype=np.float64)
    k = max(1, min(k, len(logits)))
    # 1) Find the top-k indices (argpartition only guarantees the split at position -k; it runs in O(n))
    top_idx = np.argpartition(logits, -k)[-k:]
    # 2) Set the other tokens to -inf (probability 0 after softmax)
    masked = np.full_like(logits, -np.inf)
    masked[top_idx] = logits[top_idx]
    # 3) softmax + sample
    probs = softmax(masked, temperature)
    return int(np.random.choice(len(probs), p=probs))
```

## Reference implementation 2 — Task 2: top-p (nucleus) sampling

```python
def top_p_sample(logits, p=0.9, temperature=1.0):
    """Sample from the smallest set of tokens whose cumulative probability is >= p."""
    logits = np.asarray(logits, dtype=np.float64)
    probs = softmax(logits, temperature)
    sorted_idx = np.argsort(probs)[::-1]
    sorted_probs = probs[sorted_idx]
    # 1) Cumulative probability
    cumulative = np.cumsum(sorted_probs)
    # 2) Find the first position where cumsum >= p; +1 includes that token in the nucleus
    cutoff = int(np.searchsorted(cumulative, p)) + 1
    cutoff = max(1, min(cutoff, len(sorted_idx)))
    # 3) Renormalize within the nucleus and sample
    nucleus_idx = sorted_idx[:cutoff]
    nucleus_probs = probs[nucleus_idx]
    nucleus_probs = nucleus_probs / nucleus_probs.sum()
    return int(np.random.choice(nucleus_idx, p=nucleus_probs))
```

## Closed-book derivation answer — top-p nucleus (logits = [2.0, 1.0, 0.5, 0.1, -1.0], p = 0.9)

1. **Softmax (numerically stable)**: subtract the max (=2.0) first, then exponentiate.
   - shifted = [0.0, -1.0, -1.5, -1.9, -3.0]
   - exp     = [1.000, 0.368, 0.223, 0.150, 0.050]
   - normalizing denominator ≈ 1.790
   - probs ≈ [0.559, 0.205, 0.125, 0.084, 0.028]

2. **Sort by probability, descending + cumulative probability**:

| Rank | token index | prob  | cumsum |
|------|-------------|-------|--------|
| 1    | 0           | 0.559 | 0.559  |
| 2    | 1           | 0.205 | 0.764  |
| 3    | 2           | 0.125 | 0.889  |
| 4    | 3           | 0.084 | 0.972  |
| 5    | 4           | 0.028 | 1.000  |

3. **The nucleus for p = 0.9**: the first position where cumsum ≥ 0.9 is rank 4 (cumsum=0.972),
   so the nucleus = the tokens ranked 1–4 = **{0, 1, 2, 3}** (token 4 is excluded).
