# Reference implementation — L57_mlp

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1 · Neuron

```python
class Neuron:
    def __init__(self, nin, nonlin=True):
        self.w = [Value(random.uniform(-1, 1)) for _ in range(nin)]
        self.b = Value(0.0)
        self.nonlin = nonlin

    def __call__(self, x):
        act = sum((wi * xi for wi, xi in zip(self.w, x)), Value(0.0)) + self.b
        return act.tanh() if self.nonlin else act

    def parameters(self):
        return self.w + [self.b]

    def __repr__(self):
        kind = "Tanh" if self.nonlin else "Linear"
        return f"{kind}Neuron({len(self.w)})"
```

## Reference implementation 2 · Layer

```python
class Layer:
    def __init__(self, nin, nout, **kwargs):
        self.neurons = [Neuron(nin, **kwargs) for _ in range(nout)]

    def __call__(self, x):
        outs = [n(x) for n in self.neurons]
        return outs[0] if len(outs) == 1 else outs

    def parameters(self):
        return [p for n in self.neurons for p in n.parameters()]

    def __repr__(self):
        return f"Layer([{', '.join(str(n) for n in self.neurons)}])"
```

## Reference implementation 3 · MLP

```python
class MLP:
    def __init__(self, nin, nouts):
        sz = [nin] + nouts
        self.layers = [Layer(sz[i], sz[i+1], nonlin=(i != len(nouts)-1))
                       for i in range(len(nouts))]

    def __call__(self, x):
        for layer in self.layers:
            x = layer(x)
        return x if isinstance(x, list) else [x]

    def parameters(self):
        return [p for layer in self.layers for p in layer.parameters()]

    def __repr__(self):
        return f"MLP([{', '.join(str(l) for l in self.layers)}])"
```

Key points:

- In `MLP.__init__`, only the last layer has `nonlin=False` (a linear output that doesn't clip the regression value / logit).
- Total parameters of `MLP(3, [4, 4, 1])` = 4×(3+1) + 4×(4+1) + 1×(4+1) = 16 + 20 + 5 = **41**.
- `parameters()` flattens layer by layer; during training, run `p.data -= lr * p.grad` on every `Value`, then zero it with `p.grad = 0.0`.
