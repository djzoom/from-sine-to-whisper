# Reference implementation — L53_visual_mfcc

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1 (DCT reconstruction error)

```python
# 1. Truncate the coefficients (already given in the notebook)
dct_truncated = dct_todo.copy()
dct_truncated[:, N_KEEP:] = 0.0

# 2. Build the orthonormal DCT-II basis matrix B and do the inverse transform
#    B[k, n] = scale[k] * cos(pi/N * (n+0.5) * k), the same basis as aurora's dct_ii;
#    after ortho scaling B @ B.T = I, so the inverse is a right-multiplication by B (orthogonal rows → the rows of B are the inverse basis).
N = N_MELS
k_arr = np.arange(N)
n_arr = np.arange(N)
B = np.cos(np.pi / N * np.outer(k_arr, n_arr + 0.5))      # (N, N)
scale = np.full(N, np.sqrt(2.0 / N))
scale[0] = np.sqrt(1.0 / N)
B = scale[:, None] * B

log_mel_recon = dct_truncated @ B                          # (n_frames, N_MELS)

# 3. RMS error
rms_error = np.sqrt(np.mean((log_mel_recon - log_mel_todo) ** 2))
print(f'reconstruction RMS error: {rms_error:.2f} dB')
assert rms_error < 8.0, f'error {rms_error:.2f} dB is higher than expected (should be < 8 dB)'
print('✅ the reconstruction error from keeping 13 dims is within the acceptable range')
```

How it works: `dct_ii` computes `Y = X @ B.T` (`B` is the ortho-normalized DCT matrix, `B @ B.T = I`),
so `X = Y @ B`. Truncate the high-order coefficients and then right-multiply by `B`, and you get an approximate
log-mel that "uses only the information in the first 13 dims"; the chirp signal has a fairly rich spectrum, and the reference implementation's RMS error is about 6.1 dB (< the 8 dB threshold).
