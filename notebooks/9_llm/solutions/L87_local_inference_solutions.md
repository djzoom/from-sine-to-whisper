# Reference implementation — L87_local_inference

> ⚠️ Try the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def batch_quantize_error(W: np.ndarray, bits_list: list) -> dict:
    """Compare affine-quantization error across bit widths.

    Args:
        W: float32 weight matrix
        bits_list: list of bit widths, e.g. [8, 6, 4, 3, 2]

    Returns:
        {bits: {"scale": float, "mean_err": float, "max_err": float}}
    """
    x_min, x_max = W.min(), W.max()
    result = {}
    for bits in bits_list:
        levels = 2 ** bits - 1                                  # number of quantization levels at this bit width
        scale = (x_max - x_min) / levels                       # float step each level stands for
        W_q = np.clip(np.round((W - x_min) / scale), 0, levels)  # quantize to [0, levels]
        W_r = W_q * scale + x_min                              # dequantize back to float32
        abs_err = np.abs(W - W_r)
        result[bits] = {
            "scale": float(scale),
            "mean_err": float(abs_err.mean()),
            "max_err": float(abs_err.max()),
        }
    return result
```
