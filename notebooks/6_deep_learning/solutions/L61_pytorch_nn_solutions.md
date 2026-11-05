# Reference implementation — L61_pytorch_nn

> ⚠️ Finish the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

```python
class AudioMLP(nn.Module):
    def __init__(self, in_features, hidden, out_features):
        super().__init__()
        self.layers = nn.Sequential(
            nn.Linear(in_features, hidden),
            nn.ReLU(),
            nn.Linear(hidden, out_features),
        )

    def forward(self, x):
        return self.layers(x)
```
