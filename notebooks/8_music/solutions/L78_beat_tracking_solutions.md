# Reference implementation — L78_beat_tracking

> ⚠️ Work through the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

`my_onset_envelope` — the spectral-flux onset envelope: the sum of positive magnitude-spectrum differences between neighboring frames.
`stft` returns shape `(n_frames, n_fft//2+1)`; take the difference along `axis=0` (time) and sum along `axis=1` (frequency),
so the output has length `n_frames - 1` (the difference loses one frame), and half-wave rectification keeps it non-negative.

```python
def my_onset_envelope(signal, sample_rate, n_fft=N_FFT, hop_length=HOP):
    """Spectral-flux onset envelope: sum of positive magnitude-spectrum differences between neighboring frames."""
    S = stft(signal, n_fft=n_fft, hop_length=hop_length)  # (n_frames, n_freqs)
    mag = np.abs(S)                                        # magnitude spectrum
    flux = np.maximum(0.0, np.diff(mag, axis=0))          # difference along time + half-wave rectification
    return flux.sum(axis=1)                                # sum over frequency → (n_frames-1,)
```

## Reference implementation 2

`my_beat_track` — estimate the BPM and beat times from the autocorrelation of the onset envelope.
`env`, `fps`, `min_lag`, `max_lag` and `lags` are already given above the TODO; here we fill in the four steps:
autocorrelation vector → take the peak lag → convert to BPM → fill in the beat times stepping by `best_lag`.

```python
def my_beat_track(signal, sample_rate, hop_length=HOP):
    """Estimate the BPM and beat times from the autocorrelation."""
    env = my_onset_envelope(signal, sample_rate, hop_length=hop_length)
    fps = sample_rate / hop_length

    # lag range (in frames) corresponding to the BPM range 40-240
    min_lag = max(1, int(fps * 60 / 240))
    max_lag = min(len(env) - 1, int(fps * 60 / 40))
    lags = np.arange(min_lag, max_lag + 1)

    # 1. autocorrelation: dot product of env with shifted env
    ac = np.array([np.dot(env[:len(env) - lag], env[lag:]) for lag in lags])
    # 2. best lag (where the autocorrelation is largest)
    best_lag = lags[np.argmax(ac)]
    # 3. convert to BPM: BPM = 60 × fps / lag
    bpm = fps * 60.0 / best_lag
    # 4. beat times (seconds): find the phase of the first beat, then step by best_lag
    pos = np.argmax(env[:best_lag])              # frame index of the first beat
    beat_frames = np.arange(pos, len(env), best_lag)
    beats = beat_frames / fps                    # convert to seconds
    return bpm, beats
```
