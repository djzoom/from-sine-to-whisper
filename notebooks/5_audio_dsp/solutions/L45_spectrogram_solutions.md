# Reference implementation — L45_spectrogram

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def plot_spectrogram(x, sr, win_len=1024, hop=256):
    S = stft(x, n_fft=win_len, hop_length=hop)       # (n_frames, F)
    A = np.abs(S).T                                    # (F, n_frames)
    dB = 20 * np.log10(A + 1e-8)
    dur = len(x) / sr

    fig, ax = plt.subplots(figsize=(10, 4))
    im = ax.imshow(
        dB,
        origin="lower",
        aspect="auto",
        extent=[0, dur, 0, sr / 2],
        cmap="inferno",
    )
    fig.colorbar(im, ax=ax, label="magnitude (dB)")
    ax.set_xlabel("time (s)")
    ax.set_ylabel("frequency (Hz)")
    ax.set_title("Spectrogram (dB magnitude)")
    plt.tight_layout()
    plt.show()

    return dB  # the check cell expects the dB matrix back (shape (win_len//2+1, n_frames))
```
