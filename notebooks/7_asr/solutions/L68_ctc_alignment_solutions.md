# Reference implementation — L68_ctc_alignment

> ⚠️ Work through the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def ctc_greedy_decode(logits: np.ndarray, blank: int = 0) -> list:
    """CTC greedy decoding: argmax per frame, remove adjacent repeats, remove blanks.
    
    Args:
        logits: shape (T, vocab_size), raw scores before softmax
        blank:  token id of the blank symbol, default 0
    Returns:
        list of decoded token ids
    """
    preds = np.argmax(logits, axis=1)          # (T,)
    deduped = [int(p) for i, p in enumerate(preds)
               if i == 0 or p != preds[i - 1]] # remove adjacent repeats
    return [p for p in deduped if p != blank]  # remove blanks
```
