# Reference implementation — L79_music_embed

> ⚠️ Work through the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def triplet_loss(anchor, positive, negative, margin=0.2):
    """
    Triplet loss for contrastive learning.
    Args:
        anchor, positive, negative: torch.Tensor, shape (B, d)
        margin: float, safety margin
    Returns:
        scalar Tensor
    """
    d_pos = torch.norm(anchor - positive, dim=-1)       # (B,) anchor ↔ positive distance
    d_neg = torch.norm(anchor - negative, dim=-1)       # (B,) anchor ↔ negative distance
    loss = torch.clamp(d_pos - d_neg + margin, min=0.0).mean()
    return loss
```
