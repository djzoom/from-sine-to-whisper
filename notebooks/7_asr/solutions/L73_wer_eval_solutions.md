# Reference implementation — L73_wer_eval

> ⚠️ Try the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

`analyze_errors(hypotheses, references)` — compute the overall WER and the three S/D/I rates for a batch.

We keep the notation from L67 (edit distance from scratch): `WER = (S + D + I) / N`, where
S = Substitution, D = Deletion, I = Insertion, N = total number of reference words.
The inner `edit_counts` is just word-level Levenshtein DP + back-trace: a diagonal step is a substitution/match,
a step in the `i` direction (the hypothesis has one extra word) counts as I, and a step in the `j` direction (the reference has one extra word) counts as D.

```python
def analyze_errors(hypotheses, references):
    # hypotheses: list[list[str]]  model recognition output (a list of word lists)
    # references:  list[list[str]]  reference text (a list of word lists)
    # returns: dict with wer / S_rate / D_rate / I_rate / worst_examples

    def edit_counts(hyp, ref):
        # word-level Levenshtein DP: hyp is the rows i, ref is the columns j
        H, R = len(hyp), len(ref)
        dp = [[0] * (R + 1) for _ in range(H + 1)]
        for i in range(H + 1):
            dp[i][0] = i          # emptying hyp = i deletions
        for j in range(R + 1):
            dp[0][j] = j          # building up ref = j insertions
        for i in range(1, H + 1):
            for j in range(1, R + 1):
                if hyp[i - 1] == ref[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = 1 + min(dp[i - 1][j - 1],   # substitution S
                                       dp[i - 1][j],        # insertion I (hyp has one extra word)
                                       dp[i][j - 1])        # deletion D (ref has one extra word)
        # back-trace and accumulate S/D/I (same directions as this lesson's _edit_ops)
        S = D = I = 0
        i, j = H, R
        while i > 0 or j > 0:
            if i > 0 and j > 0 and hyp[i - 1] == ref[j - 1]:
                i -= 1; j -= 1                       # match C, not an error
            elif i > 0 and j > 0 and dp[i][j] == dp[i - 1][j - 1] + 1:
                S += 1; i -= 1; j -= 1               # substitution
            elif i > 0 and dp[i][j] == dp[i - 1][j] + 1:
                I += 1; i -= 1                       # hyp has one extra word → insertion
            else:
                D += 1; j -= 1                       # ref has one extra word → deletion
        return S, D, I

    total_S = total_D = total_I = total_N = 0
    per_wer = []
    for hyp, ref in zip(hypotheses, references):
        S, D, I = edit_counts(hyp, ref)
        total_S += S; total_D += D; total_I += I
        total_N += len(ref)
        per_wer.append((S + D + I) / max(len(ref), 1))   # per-sentence WER, with a fallback for N=0

    # the 5 samples with the highest WER (with their original indices), to locate the long tail
    order = sorted(range(len(per_wer)), key=lambda k: per_wer[k], reverse=True)
    worst = [(idx, per_wer[idx]) for idx in order[:5]]

    return {
        'wer': (total_S + total_D + total_I) / max(total_N, 1),
        'S_rate': total_S / max(total_N, 1),
        'D_rate': total_D / max(total_N, 1),
        'I_rate': total_I / max(total_N, 1),
        'worst_examples': worst,
    }
```
