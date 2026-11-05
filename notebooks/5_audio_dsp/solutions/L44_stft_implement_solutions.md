# Reference implementation — L44_stft_implement

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def my_stft(x, win_len=2048, hop=512, window="hann"):
    from aurora.audio.windows import get_window
    from aurora.audio.stft import frame_signal
    from aurora.audio.transforms import fft as aurora_fft  # hand-written Cooley-Tukey FFT from L37-39

    win = get_window(window, win_len, periodic=True)      # (win_len,)
    frames = frame_signal(x, win_len, hop, center=True)  # (n_frames, win_len)
    windowed = frames * win                               # broadcast windowing

    # Iron rule: the engine is the from-scratch aurora fft (win_len=2048 is a power of 2,
    # so Cooley-Tukey works); np.fft only appears in demo/comparison cells, never as the engine.
    n_bins = win_len // 2 + 1
    spectra = [aurora_fft(f)[:n_bins] for f in windowed]
    return np.stack(spectra)                              # (n_frames, n_bins)
```
