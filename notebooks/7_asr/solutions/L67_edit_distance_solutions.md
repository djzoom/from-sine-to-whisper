# Reference implementation — L67_edit_distance

> ⚠️ Work through the exercises on your own first, then look at the reference implementation.

## Reference implementation 1 · character-level edit distance `edit_distance`

```python
def edit_distance(a, b) -> int:
    """Character-level Levenshtein edit distance, pure-Python dynamic programming.

    It also accepts word lists (any indexable sequence), so word-level WER can reuse this function.
    dp[i][j] = minimum number of edits to turn a[:i] into b[:j]
      Borders: dp[i][0] = i (delete the first i of a), dp[0][j] = j (insert the first j of b)
      Recurrence: a[i-1]==b[j-1] → dp[i-1][j-1]
             otherwise → 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    """
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i          # delete the first i characters of a
    for j in range(n + 1):
        dp[0][j] = j          # insert the first j characters of b
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]          # same character, no operation
            else:
                dp[i][j] = 1 + min(
                    dp[i - 1][j],      # delete a[i-1]
                    dp[i][j - 1],      # insert b[j-1]
                    dp[i - 1][j - 1],  # substitute
                )
    return dp[m][n]
```

## Reference implementation 2 · word-level WER `wer`

```python
def wer(reference: str, hypothesis: str) -> float:
    """Word Error Rate = word-level edit distance / number of reference words.

    Key design: edit_distance accepts any indexable sequence, so word lists work too;
    reuse it directly instead of rewriting the DP loop — that's the right abstraction.
    """
    ref_words = reference.lower().split()
    hyp_words = hypothesis.lower().split()
    if len(ref_words) == 0:
        return 0.0 if len(hyp_words) == 0 else float('inf')
    # reuse edit_distance: character level and word level share one DP skeleton; only the input sequence type changes
    return edit_distance(ref_words, hyp_words) / len(ref_words)
```

## Reference answer · closed-book derivation check cell ("cat" → "cut")

**1. The recurrence**

```
Borders:    dp[i][0] = i,  dp[0][j] = j
Recurrence: a[i-1] == b[j-1]  → dp[i][j] = dp[i-1][j-1]
            otherwise         → dp[i][j] = 1 + min(dp[i-1][j],    # delete
                                                   dp[i][j-1],    # insert
                                                   dp[i-1][j-1])  # substitute
```

**2. The complete DP table (rows = cat, columns = cut)**

|   |   | c | u | t |
|---|---|---|---|---|
|   | 0 | 1 | 2 | 3 |
| c | 1 | 0 | 1 | 2 |
| a | 2 | 1 | 1 | 2 |
| t | 3 | 2 | 2 | 1 |

- `dp[1][1]`: `c==c` → take the top-left `dp[0][0]=0`.
- `dp[2][2]`: `a≠u` → `1 + min(dp[1][2]=1, dp[2][1]=1, dp[1][1]=0) = 1`.
- `dp[3][3]`: `t==t` → take the top-left `dp[2][2]=1`.
- **Edit distance = dp[3][3] = 1**.

**3. One shortest edit path (backtracking from dp[3][3] to dp[0][0])**

```
dp[3][3] (t==t, match)        ← dp[2][2]
dp[2][2] (a→u, substitution)  ← dp[1][1]
dp[1][1] (c==c, match)        ← dp[0][0]

Alignment: c a t
           | S |
           c u t
Path: Match(c) → Sub(a→u) → Match(t)   1 substitution in total, distance = 1
```

## Self-review cell, filled in (`l67_review`)

Once you've done everything on your own and it all passes, set all 5 items to `True`:

```python
l67_review = {
    "levenshtein_dp_memorized":  True,   # can write the DP transition from memory
    "edit_distance_impl":        True,   # edit_distance() passes all 5 assertions
    "wer_impl":                  True,   # wer() reuses edit_distance
    "dp_table_traced":           True,   # traced the 4×4 DP table for "cat"→"cut" by hand
    "whiteboard_passed":         True,   # cleared the whiteboard derivation cell
}
```
