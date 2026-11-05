# Reference implementation — L36_windows

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def describe_window(name, w):
    first = w[0]
    last = w[-1]
    peak = w.max()
    peak_idx = int(np.argmax(w))
    print(f'{name}: len={len(w)}, first={first:.4f}, last={last:.4f}, peak={peak:.4f} @ idx={peak_idx}')
    return (first, last, peak, peak_idx)
```
