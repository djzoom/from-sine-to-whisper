# Reference implementation — L56_backward_pass

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def backward(self):
    topo = []
    visited = set()
    def build(v):
        if v not in visited:
            visited.add(v)
            for child in v._prev:
                build(child)
            topo.append(v)
    build(self)
    self.grad = 1.0
    for node in reversed(topo):
        node._backward()
```


## Reference implementation 2 · Closed-book derivation cell: the backprop matrix formulas of a 2-layer MLP (the three TODO lines)

```python
dL_dW2 = dL_dyhat @ a1.T                    # ∂L/∂W² = (ŷ-y) · a¹ᵀ (outer product)
delta1 = (W2.T @ dL_dyhat) * dsigmoid(z1)   # δ¹ = W²ᵀ(ŷ-y) ⊙ σ'(z¹) (Hadamard product)
dL_dW1 = delta1 @ x.T                       # ∂L/∂W¹ = δ¹ · xᵀ (outer product)
```

## Reference implementation 3 · Derivation exercise: the gradients of a two-layer relu network by hand

```python
# loss = ((W2 @ relu(W1 @ x)) - y)², with h = relu(W1 @ x)
dL_dW2 = np.outer(2*(yhat - y), h)          # ∂loss/∂W2 = 2(ŷ-y) · hᵀ
dL_dh  = W2.T @ (2*(yhat - y))              # pass back to h
dL_dW1 = np.outer(dL_dh * (W1 @ x > 0), x)  # through the relu mask, then outer product with x
```
