# Reference implementation — L84_lora

> ⚠️ Try the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

```python
class LoRALinear(nn.Module):
    def __init__(self, in_features, out_features, rank=8, alpha=1.0):
        super().__init__()
        # 1. Frozen pretrained base: bias=False, the weight takes no gradient
        self.base = nn.Linear(in_features, out_features, bias=False)
        self.base.weight.requires_grad = False
        # 2. Low-rank factors: A is a small random Gaussian, B is zero-initialized
        self.lora_A = nn.Parameter(torch.randn(rank, in_features) * 0.01)
        self.lora_B = nn.Parameter(torch.zeros(out_features, rank))
        # 3. Scaling factor scale = alpha / rank
        self.scale = alpha / rank

    def forward(self, x):
        base_out = self.base(x)                       # frozen main path
        lora_out = (x @ self.lora_A.T) @ self.lora_B.T  # low-rank side path ΔW·x = B(Ax)
        return base_out + self.scale * lora_out
```

**Key points**:

- `base.weight.requires_grad = False` freezes the pretrained weight, so the only trainable parameters left are `lora_A` + `lora_B`,
  `rank * in_features + out_features * rank` in total (check 1 in the check cell after the exercise: `2×64×4 = 512`).
- Zero-initializing `lora_B` guarantees the training starting point `ΔW = B·A = 0`, so the output is exactly the pretrained one (a no-disturbance start).
- `(x @ lora_A.T) @ lora_B.T` first projects down to `rank` and then back up to `out_features`; broadcasting makes it work automatically for both 2-D `(batch, d)`
  and 3-D `(batch, seq, d)` inputs (checks 2 and 4).
- `scale = alpha / rank`; with `alpha=8, rank=4`, `scale=2.0` (check 5).
