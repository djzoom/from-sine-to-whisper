# Answer key — L88_tfidf_retrieval

> ⚠️ Work through the exercises on your own first, then look at the reference implementation.

## Reference implementation 1 — `tokenize`

```python
def tokenize(text: str) -> list:
    """A simple tokenizer: extract lowercase ASCII words."""
    return re.findall(r"[a-z]+", text.lower())
```

## Reference implementation 2 — `build_tfidf`

```python
def build_tfidf(docs: list) -> tuple:
    """Build the TF-IDF matrix. Returns (matrix, vocab)."""
    tokenized = [tokenize(d) for d in docs]
    all_terms = sorted({t for tokens in tokenized for t in tokens})
    word_idx = {w: i for i, w in enumerate(all_terms)}

    # (1) TF matrix: TF(t,d) = count(t,d) / |d|
    tf = np.zeros((len(docs), len(all_terms)), dtype=np.float32)
    for i, tokens in enumerate(tokenized):
        counts = Counter(tokens)
        total = max(len(tokens), 1)
        for word, count in counts.items():
            if word in word_idx:
                tf[i, word_idx[word]] = count / total

    # (2) IDF vector: IDF(t) = log((N+1)/(df(t)+1)) + 1
    df = (tf > 0).sum(axis=0).astype(np.float32)   # df(t) = number of documents containing term t
    N = len(docs)
    idf = np.log((N + 1.0) / (df + 1.0)) + 1.0     # smoothed IDF

    # (3) TF × IDF (broadcasting (n_docs, V) × (V,))
    return (tf * idf), all_terms
```

## Reference implementation 3 — `cosine_retrieve`

```python
def cosine_retrieve(query: str, tfidf_matrix, vocab: list, docs: list, top_k=3) -> list:
    """Cosine-similarity retrieval; returns a list of (doc, score)."""
    word_idx = {w: i for i, w in enumerate(vocab)}
    tokens = tokenize(query)
    counts = Counter(tokens)
    total = max(len(tokens), 1)

    # (1) query vector q (TF only, no IDF); terms not in the vocabulary are simply ignored
    q_vec = np.zeros(len(vocab), dtype=np.float32)
    for word, count in counts.items():
        if word in word_idx:
            q_vec[word_idx[word]] = count / total

    # (2)+(3) dot product + cosine normalization (zero vectors score 0)
    q_norm = float(np.linalg.norm(q_vec))
    if q_norm < 1e-8:
        return [(docs[i], 0.0) for i in range(min(top_k, len(docs)))]
    d_norms = np.maximum(np.linalg.norm(tfidf_matrix, axis=1), 1e-8).astype(np.float32)
    scores = (tfidf_matrix @ q_vec) / (d_norms * q_norm)

    # (4) top_k: return [(doc, score), ...] in descending order of score
    k = min(top_k, len(docs))
    idx = np.argsort(scores)[::-1][:k]
    return [(docs[i], float(scores[i])) for i in idx]
```

> Lined up with `aurora.llm.retrieve`: TF = relative term frequency, IDF uses the smoothed formula `log((N+1)/(df+1))+1`,
> the query vector uses TF only (no IDF), and a zero cosine denominator scores 0. The values agree with the production implementation to `atol=1e-5`.

## Reference implementation 4 — closed-book derivation (TF-IDF by hand)

Documents: D0 `"the cat run"`, D1 `"the dog run run"`, D2 `"cat cat dog"`; vocabulary `{cat, dog, run, the}`.

1. **df (number of documents containing the word)**
   - cat: D0, D2 → df=2
   - dog: D1, D2 → df=2
   - run: D0, D1 → df=2
   - the: D0, D1 → df=2

2. **IDF** = `log((3+1)/(2+1)) + 1` = `log(4/3) + 1` ≈ `0.2877 + 1` = **1.2877** (the same for all four words, since every df is 2)

3. **D1's TF vector** (D1 has 4 words: the, dog, run, run)
   In the sorted vocabulary order `[cat, dog, run, the]`:
   `[0, 1/4, 2/4, 1/4]` = `[0, 0.25, 0.50, 0.25]`

4. **D1's TF-IDF vector** = TF × 1.2877
   `[0, 0.3219, 0.6438, 0.3219]`

5. **Which document has the highest cosine similarity with the query "cat run"?**
   Query TF `q = [0.5, 0, 0.5, 0]` (all the IDFs are equal, so they don't affect the ranking — you can compare TF directions directly).
   - cos(q, D0) ≈ 0.816 (D0 contains both cat and run)
   - cos(q, D2) ≈ 0.632
   - cos(q, D1) ≈ 0.577
   → **D0 is the most similar**, because it hits both query words, cat and run.
