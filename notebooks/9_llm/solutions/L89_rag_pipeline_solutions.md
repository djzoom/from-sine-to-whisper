# Answer key — L89_rag_pipeline

> ⚠️ Work through the exercises on your own first, then look at the reference implementation.

## Reference implementation 1 — sliding-window chunking with `chunk_text`

```python
def chunk_text(text: str, max_words: int = 80, overlap: int = 10) -> list:
    """Cut a long text into overlapping chunks of words."""
    words = text.split()
    if len(words) <= max_words:
        return [text]
    step = max_words - overlap          # advance step words each time, keeping overlap words shared
    chunks = []
    for i in range(0, len(words), step):
        chunks.append(" ".join(words[i:i + max_words]))
        if i + max_words >= len(words):  # we've reached the end; stop
            break
    return chunks
```

**Key points**
- `step = max_words - overlap`: neighboring chunks share `overlap` words, so key information doesn't get cut off at a boundary.
- 200 words, `max_words=80`, `overlap=10` → `step=70` → windows start at 0/70/140 → 3 chunks, the last one 60 words, each ≤ 80.
- A short text (≤ `max_words`) is returned straight away at the top of the function as `[text]`, a single chunk.

## Reference implementation 2 — the prompt template `format_rag_prompt`

```python
def format_rag_prompt(query: str, retrieved_docs: list) -> str:
    """Fill the retrieved passages into the prompt template.

    Expected output format:
    Context:
    [1] <first retrieved passage>
    [2] <second retrieved passage>

    Question: <query>

    Answer:
    """
    context = "\n".join(
        f"[{i + 1}] {doc}" for i, (doc, score) in enumerate(retrieved_docs)
    )
    return f"Context:\n{context}\n\nQuestion: {query}\n\nAnswer:"
```

**Key points**
- `retrieved_docs` is `[(doc_str, score), ...]`; when unpacking, ignore `score` and keep only the document text.
- The `[{i+1}]` numbering lets the LLM cite its sources; the fixed `Answer:` ending tells the LLM where to start generating.
- The output starts with `Context:` and ends with `Answer:`, a stable structure that's easy for downstream parsing and source attribution.

## Closed-book derivation reference — the RAG data-flow diagram

| Step | Operation | Input | Output |
|------|------|------|------|
| 1 | Chunking | raw document (str) | `List[str]` (list of chunks) |
| 2 | Building the TF-IDF index | `List[str]` | TF-IDF matrix `(n_chunks, vocab)` + vocabulary vocab |
| 3 | Vectorizing the query | user question (str) | sparse query vector `(vocab,)` |
| 4 | Cosine retrieval | query vector + TF-IDF matrix | top-k document chunks `[(doc, score), ...]` |
| 5 | Building the prompt | question + top-k chunks | prompt (str) |
| 6 | LLM generation | prompt (str) | answer (str) |

**Why does TF-IDF retrieval not need an embedding model?**
TF-IDF represents each document as a sparse "term frequency × inverse document frequency" vector. The vector's dimension is the vocabulary size and its values come straight from **counting statistics** — there are no trainable parameters, no GPU, no pretraining. At retrieval time you vectorize the query the same way and rank by cosine similarity. For technical documents where terms like "FFT" and "Nyquist" need exact matching, keyword hits are already good enough, so the whole retrieval stack can run completely offline in pure NumPy.
