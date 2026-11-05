# Reference implementation — L65_visual_training

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

`early_stopping()`: track the best validation loss so far and a "consecutive epochs without improvement" counter.
As soon as `patience` epochs in a row fail to set a new best, return the current best epoch right away;
if the sequence ends without that happening, return the epoch with the smallest validation loss.

```python
def early_stopping(val_losses: list, patience: int) -> int:
    best_epoch = 1
    best_loss  = float('inf')
    no_improve = 0
    for epoch, loss in enumerate(val_losses, start=1):
        if loss < best_loss:
            best_loss  = loss
            best_epoch = epoch
            no_improve = 0          # new best → reset the counter
        else:
            no_improve += 1
            if no_improve >= patience:
                return best_epoch    # patience epochs in a row without improvement → stop early
    return best_epoch
```
