# Reference implementation — L77_music_features

> ⚠️ Work through the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def chroma_vector(power_spectrum, sr, n_fft):
    n_bins = len(power_spectrum)
    freqs = np.arange(n_bins) * sr / n_fft
    chroma = np.zeros(12)
    for k, (f, p) in enumerate(zip(freqs, power_spectrum)):
        if f <= 0:
            continue
        midi = 12 * np.log2(f / 440) + 69
        pc = int(round(midi)) % 12
        chroma[pc] += p
    total = chroma.sum()          # L1 normalization: matches src/aurora/music/features.py
    if total > 0:
        chroma /= total
    return chroma
```

## Reference implementation 2

```python
def rms_envelope(x, frame_len=2048, hop=512):
    n_frames = 1 + (len(x) - frame_len) // hop
    frames = np.array([x[i*hop : i*hop+frame_len] for i in range(n_frames)])
    return np.sqrt(np.mean(frames ** 2, axis=1))
```

## Reference implementation 3

```python
def zero_crossing_rate(x, frame_len=2048, hop=512):
    n_frames = 1 + (len(x) - frame_len) // hop
    zcr = np.zeros(n_frames)
    for i in range(n_frames):
        frame = x[i*hop : i*hop+frame_len]
        zcr[i] = np.mean(np.abs(np.diff(np.sign(frame))) / 2)
    return zcr
```
