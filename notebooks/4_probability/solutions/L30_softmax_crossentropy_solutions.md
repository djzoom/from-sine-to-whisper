# Reference implementation — L30_softmax_crossentropy

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
e = np.exp(z - np.max(z))
return e / e.sum()
```

## Reference implementation 2

```python
return -np.log(probs[true_idx])
```
