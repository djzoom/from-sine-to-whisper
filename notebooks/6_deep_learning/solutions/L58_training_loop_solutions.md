# L58 reference implementation — the training loop

This file gives a complete reference implementation of the `train()` function, to compare against once you've finished the exercise.

---

## The complete `train()` implementation

```python
def train(model, xs, ys, lr=0.05, epochs=100):
    """Train model and return the list of loss values, one per epoch."""
    loss_history = []
    for epoch in range(epochs):
        # 1. forward — compute predictions for all samples
        ypred = [model(x) for x in xs]

        # 2. compute each sample's hinge loss = max(0, 1 - y*pred)
        losses = [(Value(1.0) - Value(y) * p).relu() for p, y in zip(ypred, ys)]

        # 3. take the mean to get the scalar loss
        loss = sum(losses) * (1.0 / len(losses))

        # 4. backpropagate
        loss.backward()

        # 5. update the parameters (gradient descent)
        for p in model.parameters():
            p.data -= lr * p.grad

        # 6. zero the gradients so they don't accumulate into the next round
        for p in model.parameters():
            p.grad = 0.0

        loss_history.append(loss.data)
        if (epoch + 1) % 20 == 0:
            print(f'epoch {epoch+1:3d}  loss={loss.data:.4f}')
    return loss_history
```

---

## Key design notes

### Why doesn't the output layer use ReLU?

The hidden layers use ReLU to introduce nonlinearity and help the network learn complex boundaries. But the output layer's job is to output an unbounded real-valued score, which hinge loss uses to compute the margin `y * score`:

- if the output layer also applied ReLU, `score >= 0` would always hold
- the loss for the negative class (`y = -1`) would become `max(0, 1 + score) >= 1`, never zero
- the classifier would always predict the positive class, and accuracy would be stuck at 50%

The right way (`nonlin=False`) lets the score go negative, so the network can tell the two classes apart.

### When to run zero_grad

zero_grad can go anywhere after the parameter update and before the next round's forward pass. What matters is that the gradients are zeroed before every round's `backward`; otherwise they accumulate across epochs.

### What the acceptance assertions mean

```python
assert history[-1] < history[0]   # the loss goes down overall
assert acc > 0.85                  # after 100 epochs, accuracy on the moons dataset should exceed 85%
assert len(history) == epochs      # the returned list has one entry per epoch
```
