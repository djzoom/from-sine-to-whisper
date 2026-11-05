# Reference implementation — L76_music_theory

> ⚠️ Work through the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def midi_to_freq(midi: float) -> float:
    """MIDI number → frequency in Hz. A4=69=440Hz."""
    # f(n) = 440 × 2^((n-69)/12)
    return FREQ_A4 * 2 ** ((midi - MIDI_A4) / 12)

def freq_to_midi(freq: float) -> float:
    """Frequency in Hz → floating-point MIDI number."""
    # inverse formula: n = 69 + 12 × log2(f / 440)
    return MIDI_A4 + 12 * np.log2(freq / FREQ_A4)
```

## Reference implementation 2

```python
def chroma_from_freq(freq: float) -> int:
    """Frequency in Hz → pitch class 0-11 (C=0, C#=1, ..., B=11)."""
    # Convert with freq_to_midi, round() to the nearest integer, then take mod 12.
    # ⚠️ You must use round(), not int(): B4=493.88Hz → midi≈70.9999,
    #    int() truncates it to 70 (A#); only round() gives 71 (B).
    n = round(freq_to_midi(freq))
    return n % 12
```
