# Reference implementation — L85_kv_cache

> ⚠️ Try the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def scaled_dot_product_attention(Q, K, V, mask=None):
    """Scaled dot-product attention, pure NumPy.

    Args:
        Q: (n_heads, seq_q, head_dim)
        K: (n_heads, seq_k, head_dim)
        V: (n_heads, seq_k, head_dim)
        mask: optional (seq_q, seq_k) bool mask, True=mask out

    Returns:
        (n_heads, seq_q, head_dim)
    """
    head_dim = Q.shape[-1]
    # 1) Scores: (n_heads, seq_q, seq_k)
    scores = Q @ K.swapaxes(-1, -2) / np.sqrt(head_dim)
    # 2) Causal mask: hide future positions
    if mask is not None:
        scores = scores.copy()
        scores[..., mask] = -np.inf
    # 3) softmax (numerically stable: subtract each row's max first)
    scores -= scores.max(axis=-1, keepdims=True)
    weights = np.exp(scores)
    weights /= weights.sum(axis=-1, keepdims=True)
    # 4) Weighted sum
    return weights @ V
```

## Reference implementation 2

```python
    def update(self, layer, new_k, new_v):
        """Append the new K/V and return the full cache. new_k/new_v: (n_heads, 1, head_dim)"""
        if layer not in self._k:            # first call: assign directly
            self._k[layer] = new_k
            self._v[layer] = new_v
        else:                               # later calls: concatenate along the seq axis
            self._k[layer] = np.concatenate([self._k[layer], new_k], axis=1)
            self._v[layer] = np.concatenate([self._v[layer], new_v], axis=1)
        return self._k[layer], self._v[layer]
```
