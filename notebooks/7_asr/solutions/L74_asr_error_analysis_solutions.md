# Reference implementation — L74_asr_error_analysis

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def wer(ref_str, hyp_str):
    """Word error rate = (S+D+I) / |ref|, counting each operation with alignment()"""
    ops = alignment(ref_str, hyp_str)
    S = sum(1 for op, *_ in ops if op == 'S')  # substitutions
    D = sum(1 for op, *_ in ops if op == 'D')  # deletions
    I = sum(1 for op, *_ in ops if op == 'I')  # insertions
    return (S + D + I) / len(ref_str.split())
```

