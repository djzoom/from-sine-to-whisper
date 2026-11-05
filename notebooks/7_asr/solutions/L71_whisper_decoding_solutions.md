# Reference implementation — L71_whisper_decoding

> ⚠️ Please complete the exercise on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def greedy_decode(prompt: list, max_steps: int = MAX_STEPS, eot: int = EOT) -> list:
    """Greedy decoding: pick the most probable token at every step.

    Implemented from scratch, with no black-box decoding library. Returns the full sequence including the prompt and the generated tokens.
    """
    tokens = list(prompt)                     # 1. copy the prompt; don't modify the input
    for _ in range(max_steps):                # 2. at most max_steps steps
        logits = fake_lm(tokens)              #    a. autoregressive forward pass: the current sequence is the context
        probs = softmax(logits)               #    b. normalize into a probability distribution
        next_token = int(np.argmax(probs))    #    c. take the most probable token (the local optimum)
        tokens.append(next_token)             #    d. append it to the sequence
        if next_token == eot:                 #    e. stop as soon as EOT is hit
            break
    return tokens                             # 3. also return if max_steps is reached without hitting EOT
```

## Reference implementation 2

```python
def beam_search(
    prompt: list, width: int = 2, max_steps: int = MAX_STEPS, eot: int = EOT
) -> list:
    """Simple beam search (implemented from scratch, no black boxes). Returns the complete sequence with the highest cumulative log-probability.

    Score = the sum of all log P(token_i | prefix) along the path (higher is better).
    Adding logs instead of multiplying probabilities avoids underflow on long sequences.
    A beam that hits EOT moves into completed and is no longer extended (beams may finish at different steps).
    """
    beams = [(0.0, list(prompt))]             # (cumulative log-prob, token sequence)
    completed = []                            # finished candidates (ending in EOT)
    for _ in range(max_steps):
        candidates = []
        for score, tokens in beams:
            logits = fake_lm(tokens)          # autoregressive forward pass
            probs = softmax(logits)
            for token_id in range(VOCAB_SIZE):
                new_score = score + float(np.log(probs[token_id] + 1e-12))
                candidates.append((new_score, tokens + [token_id]))
        # sort all candidates by cumulative log-probability, descending; keep the top width (pruning)
        candidates.sort(key=lambda x: x[0], reverse=True)
        candidates = candidates[:width]
        beams = []
        for score, tokens in candidates:
            if tokens[-1] == eot:             # hit EOT → move into completed
                completed.append((score, tokens))
            else:
                beams.append((score, tokens))
        if not beams:                         # every surviving beam has finished
            break
    # take the highest score from completed + the unfinished beams
    finalists = completed + beams
    finalists.sort(key=lambda x: x[0], reverse=True)
    return finalists[0][1]
```
