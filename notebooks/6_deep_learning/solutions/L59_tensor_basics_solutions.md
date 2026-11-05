# Reference implementation — L59_tensor_basics

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def mel_to_batch(mel_list):
    arr = np.stack(mel_list, axis=0)          # (B, T, n_mels)
    t   = torch.from_numpy(arr).float()       # (B, T, n_mels) float32
    return t.unsqueeze(1)                     # (B, 1, T, n_mels)
```
