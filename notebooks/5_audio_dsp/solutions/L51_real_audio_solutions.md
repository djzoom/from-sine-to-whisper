# Reference implementation — L51_real_audio

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1 (Exercise 1: 10 ms hop, check the frame count)

```python
hop_10ms = 160  # 10 ms @ 16 kHz

coeffs_10ms = mfcc(samples, sr, n_mfcc=13, n_fft=1024,
                   hop_length=hop_10ms, n_mels=80)
print(f"hop=256 frames: {coeffs.shape[0]}")
print(f"hop=160 frames: {coeffs_10ms.shape[0]}  (center=True → 1 + N//hop ≈ duration/0.01)")
```

## Reference implementation 2 (Exercise 2: n_mels=40 vs 80, compare the MFCCs)

```python
coeffs_mel40 = mfcc(samples, sr, n_mfcc=13, n_fft=1024, hop_length=256, n_mels=40)
coeffs_mel80 = mfcc(samples, sr, n_mfcc=13, n_fft=1024, hop_length=256, n_mels=80)

print("n_mels=40, first 3 frames:\n", coeffs_mel40[:3].round(3))
print("n_mels=80, first 3 frames:\n", coeffs_mel80[:3].round(3))

fig, axes = plt.subplots(1, 2, figsize=(12, 3.5), sharey=True)
for ax, c, n_mels in zip(axes, [coeffs_mel40, coeffs_mel80], [40, 80]):
    im = ax.imshow(c.T, aspect="auto", origin="lower", cmap="RdBu_r")
    ax.set_title(f"n_mels={n_mels}  shape={c.shape}")
    ax.set_xlabel("frame"); ax.set_ylabel("MFCC coefficient")
plt.tight_layout(); plt.show()
```

## Reference implementation 3 (Exercise 3: a V-C-V signal with an adjustable fundamental)

```python
def make_vcv_f0(f0: float = 220, sr: int = 16000) -> np.ndarray:
    """Synthesize a V-C-V with the same structure as make_vcv_signal, but with an adjustable fundamental for the vowel /a/."""
    t_a = np.arange(int(0.4 * sr)) / sr
    vowel_a = sum(
        (1.0 / k) * np.sin(2 * np.pi * f0 * k * t_a)   # fundamental 120 → parameter f0
        for k in range(1, 9)
    )
    vowel_a /= np.max(np.abs(vowel_a)) + 1e-9

    n_burst = int(0.1 * sr)
    burst = np.random.default_rng(42).standard_normal(n_burst) * 0.3

    t_i = np.arange(int(0.5 * sr)) / sr
    harmonic_weights = [1.0, 0.4, 0.8, 0.2, 0.6, 0.1, 0.5, 0.15]
    vowel_i = sum(
        w * np.sin(2 * np.pi * 150 * k * t_i)
        for k, w in enumerate(harmonic_weights, start=1)
    )
    vowel_i /= np.max(np.abs(vowel_i)) + 1e-9

    return np.concatenate([vowel_a, burst, vowel_i])
```

The total duration, 0.4 + 0.1 + 0.5 = 1.0 s, is unchanged, so the MFCC shape matches the original `coeffs`;
on the spectrogram, the spacing of the harmonic stripes in the vowel /a/ segment goes from ~120 Hz to ~220 Hz (the whole stack moves up).
