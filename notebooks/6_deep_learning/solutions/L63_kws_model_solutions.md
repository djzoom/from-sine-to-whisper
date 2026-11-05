# Reference implementation — L63_kws_model

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
class KeywordCNN(nn.Module):
    def __init__(self, n_mels=40, n_classes=10):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 32, kernel_size=(n_mels, 5), padding=(0, 2))
        self.conv2 = nn.Conv2d(32, 64, kernel_size=(1, 5), padding=(0, 2))
        self.pool  = nn.AdaptiveAvgPool2d((1, 1))   # Global Average Pool → handles any length T
        self.fc    = nn.Linear(64, n_classes)

    def forward(self, x):
        # x: (B, 1, n_mels, T)
        x = torch.relu(self.conv1(x))   # (B, 32, 1, T)  ← frequency squeezed to 1
        x = torch.relu(self.conv2(x))   # (B, 64, 1, T)  ← 1D convolution along time
        x = self.pool(x)                # (B, 64, 1, 1)  ← GAP, independent of T
        x = x.view(x.size(0), -1)       # (B, 64)
        return self.fc(x)               # (B, n_classes)
        # parameters: conv1 6432 + conv2 10304 + fc 650 = 17,386
```
