# Reference implementation — L97_interview

> ⚠️ Work through the exercises on your own first, then look at the reference implementation.

The hands-on exercise in section 5 of this lesson is a **timed, hand-written question**: with no references, write `hz_to_mel(f)`
and `frame_signal(x, win_len, hop)` in 5 minutes. These two questions simulate the most common "write code on the spot"
part of an audio-AI interview — what's being tested isn't memory, but whether you can translate a formula and a data flow into correct NumPy code straight away.

## Reference implementation — `hz_to_mel()`

```python
def hz_to_mel(f):
    """Convert linear frequency in Hz to the Mel scale (HTK formula)."""
    return 2595 * np.log10(1 + f / 700)
```

## Reference implementation — `frame_signal()`

```python
def frame_signal(x, win_len, hop):
    """
    Cut the 1D signal x into frames; returns a 2D array of shape (n_frames, win_len).
    """
    n_frames = 1 + (len(x) - win_len) // hop
    return np.stack([x[i * hop : i * hop + win_len] for i in range(n_frames)])
```

## Explanation

1. **`hz_to_mel` is a direct transcription of the HTK formula**: `mel = 2595 · log₁₀(1 + f/700)`. Because the `f` passed in
   is a NumPy array, `np.log10` broadcasts elementwise, so one line handles the three frequencies `[0, 1000, 4000]` at once,
   with no explicit loop. This is exactly the logarithmic perception curve derived in L46, "the Mel frequency scale".

2. **The frame-count formula in `frame_signal`**: starting at index 0, take a window of length `win_len` every `hop` samples.
   The last complete window starts at `(n_frames-1)·hop`, which must satisfy `(n_frames-1)·hop + win_len ≤ len(x)`;
   solving gives `n_frames = 1 + (len(x) - win_len) // hop`. Integer division `//` automatically drops trailing samples that don't fill a whole frame.
   The test case `len=20, win_len=8, hop=4` → `1 + (20-8)//4 = 4`, shape `(4, 8)`, matching the assertion.

3. **Why `np.stack` rather than preallocating**: the list comprehension first produces 4 view slices of shape `(8,)`, then `np.stack`
   stacks them along a new axis 0 into `(4, 8)`. In a teaching setting this is the most intuitive; if you want zero-copy you can switch to
   `np.lib.stride_tricks.sliding_window_view(x, win_len)[::hop]`, but be careful — it returns a view that shares memory
   (pointing out this tradeoff unprompted in an interview earns you extra credit). This is the same framing logic as in L44, "writing the STFT yourself".

## Verification points

The section 5 code cell has its own assertions:

```python
assert np.allclose(hz_to_mel(f_test), mel_ref, atol=0.1), "the hz_to_mel formula is wrong"
assert frames.shape == (4, 8), f"expected (4,8), got {frames.shape}"
```

Once both assertions pass, the cell prints `hz_to_mel ✅` and `frame_signal ✅`, and the whole notebook runs to the end.

## Extension exercises

- Add the companion `mel_to_hz(m)` (the inverse HTK formula `700 · (10^{m/2595} − 1)`) and check that
  `mel_to_hz(hz_to_mel(f)) ≈ f` — this is the other half named in the section 5 table.
- Give `frame_signal` a `center=True` option: first pad `win_len//2` at each end
  so frames are centered on samples, which is exactly the default `center` behavior of the STFT (see L43/L44).
