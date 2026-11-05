# Reference implementation — L72_whisper_finetune

> ⚠️ Try the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

Exercise 1: LoRA parameter count (matching the exercise code cell's `d_model=512, r=16, num_matrices=3`).

```python
# ─── Exercise 1: LoRA parameter count ─────────────────────────────────
d_model = 512
r = 16
num_matrices = 3  # q_proj, k_proj, v_proj

original_params_per_matrix = d_model * d_model          # 512×512 = 262144
lora_params_per_matrix = 2 * d_model * r                # A(d×r)+B(r×d) = 2×512×16 = 16384
total_lora_params = num_matrices * lora_params_per_matrix        # 3×16384 = 49152
total_original_params = num_matrices * original_params_per_matrix  # 3×262144 = 786432
reduction_pct = (1 - total_lora_params / total_original_params) * 100  # ≈ 93.75%

expected_lora = 3 * 2 * 512 * 16  # = 49152
expected_reduction = (1 - expected_lora / (3 * 512 * 512)) * 100  # ≈ 93.75%
assert total_lora_params == expected_lora, f'Wrong parameter count: {total_lora_params}'
assert abs(reduction_pct - expected_reduction) < 0.01, f'Wrong reduction: {reduction_pct:.2f}%'
print(f'✅ LoRA parameters: {total_lora_params:,}, reduction {reduction_pct:.1f}%')
```

## Reference implementation 2

Exercise 2: a simplified WER without `jiwer` (word-level edit distance / number of reference words).

```python
# ─── Exercise 2: a simplified WER without jiwer ────────────────────────
def simple_wer(ref: str, hyp: str) -> float:
    """Single-sentence word-level WER (edit distance / number of reference words), without jiwer.
    ref / hyp are plain strings, split on spaces internally.
    """
    r = ref.split()
    h = hyp.split()
    n, m = len(r), len(h)
    # dp[i][j] = minimum edit distance to turn r[:i] into h[:j]
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(n + 1):
        dp[i][0] = i          # delete i words
    for j in range(m + 1):
        dp[0][j] = j          # insert j words
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if r[i - 1] == h[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]           # match, no cost
            else:
                dp[i][j] = 1 + min(
                    dp[i - 1][j],      # deletion
                    dp[i][j - 1],      # insertion
                    dp[i - 1][j - 1],  # substitution
                )
    # WER = edit distance / number of reference words (an empty ref counts as 0 words, avoiding division by zero)
    return dp[n][m] / max(n, 1)


# Check
try:
    result = simple_wer("the cat sat on the mat", "the cat sat on a mat")
    assert abs(result - 1/6) < 1e-6, f'Wrong WER: {result}'
    print(f'✅ simple_wer passed: WER = {result:.4f}')
except (NotImplementedError, TypeError):
    print('⏳ simple_wer not implemented yet — finish the TODO and run again')

# Self-check against the acceptance criteria
assert simple_wer("hello world", "hello world") == 0.0
assert simple_wer("hello world", "hello") == 0.5           # 1 word deleted / 2 words
assert abs(simple_wer("a b c", "x b c") - 1/3) < 1e-9      # 1 word substituted / 3 words
assert simple_wer("good", "this is very very good") == 4.0  # 4 words inserted / 1 word, WER > 1
```
