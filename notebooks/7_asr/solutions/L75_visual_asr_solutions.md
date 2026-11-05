# Reference implementation — L75_visual_asr

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def my_ctc_decode(path):
    """CTC decode a path (list of str tokens) -> list of str.
    Step 1: collapse consecutive duplicates.
    Step 2: remove blanks ('-').
    """
    collapsed = [path[0]] + [path[i] for i in range(1, len(path)) if path[i] != path[i - 1]]
    return [c for c in collapsed if c != '-']
```

Explanation:
- **Step 1, collapse consecutive repeats**: keep only tokens that differ from the one before (the first token is always kept). This step doesn't care whether a token is a blank, e.g. `H H - I -` → `H - I -`.
- **Step 2, remove blanks**: filter out every `'-'` to get the final character sequence.
- The order can't be swapped: removing blanks first and then collapsing would wrongly merge repeated characters that a blank kept apart (such as `I - I`) into a single `I`, losing legitimate decodings like `HII`.
