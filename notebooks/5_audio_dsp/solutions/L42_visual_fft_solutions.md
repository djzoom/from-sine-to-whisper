# Reference implementation — L42_visual_fft

> ⚠️ Work through the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def my_fft_n8(x):
    """Iterative Cooley-Tukey FFT for N=8, by hand (no FFT library calls)."""
    N = 8
    assert len(x) == N, f"needs an N=8 input, got N={len(x)}"

    # Step 1 — bit-reversal permutation
    bit_rev = [int(f'{i:03b}'[::-1], 2) for i in range(N)]
    X = np.array([x[bit_rev[i]] for i in range(N)], dtype=complex)

    # Step 2 — three stages of butterflies
    for s in range(3):
        half = 2 ** s
        group = 2 * half
        for g in range(N // group):
            for b in range(half):
                top = g * group + b
                bot = top + half
                W_k = np.exp(-2j * np.pi * b / group)  # twiddle factor
                t = X[top] + W_k * X[bot]
                X[bot] = X[top] - W_k * X[bot]
                X[top] = t
    return X
```
