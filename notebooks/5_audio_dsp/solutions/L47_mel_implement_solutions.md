# Reference implementation — L47_mel_implement

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
import numpy as np
from aurora.audio.stft import stft
from aurora.audio.mel import mel_filterbank


def log_mel_spectrogram(x, sr, n_mels=80, win_len=1024, hop=256):
    S = stft(x, n_fft=win_len, hop_length=hop)   # (n_frames, win_len//2+1)
    power = np.abs(S) ** 2                       # power spectrum, same shape
    fb = mel_filterbank(n_mels, win_len, sr)
    mel_energy = power @ fb.T
    return np.log(mel_energy + 1e-8)
```
