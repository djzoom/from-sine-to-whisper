# Reference implementation — L66_asr_overview

> ⚠️ Work through the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def compute_wer(hypothesis: list, reference: list) -> float:
    H, R = len(hypothesis), len(reference)
    if R == 0:
        return 0.0 if H == 0 else float('inf')
    # initialize the DP table
    dp = list(range(R + 1))
    for i in range(1, H + 1):
        prev, dp[0] = dp[0], i
        for j in range(1, R + 1):
            temp = dp[j]
            if hypothesis[i - 1] == reference[j - 1]:
                dp[j] = prev
            else:
                dp[j] = 1 + min(prev, dp[j], dp[j - 1])
            prev = temp
    return dp[R] / R
```
