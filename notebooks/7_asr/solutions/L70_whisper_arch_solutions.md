# Reference implementation — L70_whisper_arch

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def whisper_preprocess(wav: np.ndarray, sr: int = 16000) -> "torch.Tensor":
    # 1. mel features; aurora returns (n_frames, n_mels)
    mel = mel_spectrogram(wav, sr, n_fft=400, hop_length=160, n_mels=80)
    mel = mel.T  # → (80, n_frames)

    # 2. log normalization (Whisper style)
    log_mel = np.log10(np.maximum(mel, 1e-10))
    log_mel = np.maximum(log_mel, log_mel.max() - 8.0)
    log_mel = (log_mel + 4.0) / 4.0

    # 3. pad / truncate to 3000 frames
    n_frames = log_mel.shape[1]
    if n_frames < 3000:
        pad = np.zeros((80, 3000 - n_frames), dtype=log_mel.dtype)
        log_mel = np.concatenate([log_mel, pad], axis=1)
    else:
        log_mel = log_mel[:, :3000]

    # 4. convert to a tensor, add the batch dimension
    return torch.tensor(log_mel, dtype=torch.float32).unsqueeze(0)
```

