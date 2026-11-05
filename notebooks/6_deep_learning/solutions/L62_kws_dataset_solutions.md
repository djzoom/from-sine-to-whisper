# Reference implementation — L62_kws_dataset

> ⚠️ Finish the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def extract_features(
    wav_path: str,
    sr: int = 16000,
    n_mels: int = 40,
) -> torch.Tensor:
    """Load WAV → pad/truncate → mel spectrogram → dB conversion → normalize → torch.Tensor (n_mels, T)."""
    from aurora.audio.mel import mel_spectrogram, power_to_db

    x, file_sr = read_wav(wav_path)                    # 1. read (multichannel is mixed down to mono automatically)
    assert file_sr == sr, f"expected {sr} Hz, got {file_sr} Hz"  # 2. assert the sample rate
    x = x.astype(np.float32)
    x = pad_or_truncate(x, sr)                          # 3. (16000,)
    mel = mel_spectrogram(
        x, sample_rate=sr, n_mels=n_mels, n_fft=2048, hop_length=512
    )                                                   # 4. (T, n_mels) = (32, 40)
    mel = power_to_db(mel)                              # 4b. dB scale
    mel = mel.T                                         # 5. (n_mels, T)
    mel = normalize(mel)                                # 6. per-sample normalization
    return torch.from_numpy(mel).float()
```
