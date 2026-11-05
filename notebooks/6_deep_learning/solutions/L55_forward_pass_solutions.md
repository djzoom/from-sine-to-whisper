# Reference implementation — L55_forward_pass

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def __pow__(self, n):
    assert isinstance(n, (int, float)), "__pow__ only supports numeric exponents"
    out = Value(self.data**n, (self,), f'**{n}')
    def _backward():
        self.grad += n * (self.data ** (n - 1)) * out.grad
    out._backward = _backward
    return out

def relu(self):
    t = max(0, self.data)
    out = Value(t, (self,), 'relu')
    def _backward():
        self.grad += (t > 0) * out.grad
    out._backward = _backward
    return out

def tanh(self):
    t = math.tanh(self.data)
    out = Value(t, (self,), 'tanh')
    def _backward():
        self.grad += (1 - t**2) * out.grad
    out._backward = _backward
    return out

def exp(self):
    t = math.exp(self.data)
    out = Value(t, (self,), 'exp')
    def _backward():
        self.grad += t * out.grad
    out._backward = _backward
    return out
```

