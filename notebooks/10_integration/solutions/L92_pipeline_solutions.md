# Reference implementation — L92_pipeline

> ⚠️ Finish the exercises on your own first, then look at the reference implementation.

This lesson uses mock functions to demonstrate the mic → ASR → RAG → LLM integration pattern, so it runs end to end without a GPU or any external model. The exercises sit in two places: the "Parameter experiment" after Section 4 (`n_trials`) and the thought question in Section 6.

## Reference implementation 1 — the "Parameter experiment" (after Section 4): `n_trials = 5`

```python
# the notebook defaults to n_trials = 5; raise or lower it to watch how each stage's duration fluctuates
n_trials = 5
all_timings = []

print(f'Running the end-to-end pipeline {n_trials} times...')
for i in range(n_trials):
    timings, status = simulate_pipeline()
    total = sum(timings.values())
    all_timings.append(timings)
    print(f'  Trial {i+1}: asr={timings["asr"]*1000:.0f}ms  '
          f'rag={timings["rag"]*1000:.0f}ms  '
          f'llm={timings["llm"]*1000:.0f}ms  '
          f'total={total*1000:.0f}ms')

avg = {k: np.mean([t[k] for t in all_timings]) for k in all_timings[0]}
bottleneck = max(avg, key=avg.get)
assert bottleneck == 'llm', 'Expected the LLM to be the main bottleneck'
```

**What you'll see**: `simulate_pipeline` adds `random.uniform` jitter to every stage, so the more trials you run, the steadier each stage's average becomes; either way, `llm` (≈2000ms) is always the bottleneck, taking about 78% of the total latency (`2000 / (0 + 500 + 50 + 2000) ≈ 78%`). With more trials, a single jittery run is less likely to flip `assert bottleneck == 'llm'`.

## Reference implementation 2 — Section 6 thought question: if `llm_delay` drops from 2.0s to 0.5s, by how much does total latency fall?

```python
# Baseline duration per stage: audio_check≈0, asr=0.5s, rag=0.05s, llm=llm_delay
def total_latency(llm_delay):
    return 0.0 + 0.5 + 0.05 + llm_delay   # seconds

t_before = total_latency(2.0)   # ≈ 2.55 s
t_after  = total_latency(0.5)   # ≈ 1.05 s
drop_pct = (t_before - t_after) / t_before * 100
print(f'{t_before*1000:.0f}ms → {t_after*1000:.0f}ms, a drop of {drop_pct:.1f}%')
# 2550ms → 1050ms, a drop of ≈ 58.8%
```

**Key point**: the LLM is the lion's share (≈78%); cutting it to 0.5s brings total latency from 2550ms down to about 1050ms, **a drop of about 59%**. This confirms "aim your optimization at the bottleneck" — for the same 1.5s saved, cutting the LLM pays off far more than tuning ASR/RAG. In practice, ways to lower LLM latency include: a smaller model, quantization (see [L87 Quantization and local inference](../../9_llm/L87_local_inference.ipynb)), the KV cache (see [L85 A KV cache from scratch](../../9_llm/L85_kv_cache.ipynb)), and streaming output to lower the **perceived** latency (Section 3 of this lesson).

## Reference implementation 3 — Section 4 concept question: why can ASR and RAG run in parallel, but the RAG refinement can't?

```
[ASR 500ms ─────────────]   ┐ no data dependency between them; asyncio.gather runs them concurrently
[RAG warm-up 50ms]           ┘
                 [RAG refine 30ms]   ← depends on the ASR transcript; must wait for ASR
                          [LLM 2000ms]  ← depends on the refined context
```

**The test**: whether two steps can run in parallel comes down to **data dependency**. ASR (audio → text) and the RAG warm-up (loading/caching the index) don't depend on each other, so they can run concurrently; the RAG refinement query needs the ASR transcript as its query — a true dependency — so it must wait for ASR to finish. Parallelism only saves the `min(ASR, RAG warm-up)` segment (here the 50ms RAG warm-up is hidden under the 500ms of ASR; after the 30ms refinement step that's a net saving of about 20ms). Only if the RAG warm-up grows to 200ms does parallelism pay off noticeably — which is also why the speedup is close to 1.0 with the current mocks.

## Notes

- This lesson loads no real ASR/LLM weights: `async_asr` / `async_llm` / `mock_llm_stream` are all `asyncio.sleep` placeholders, and `simulate_pipeline` simulates durations with `time.sleep`, so the whole notebook runs on a plain CPU with no network.
- `aurora.speech` (ASR) and `aurora.rag` (standalone retrieval core) are still placeholder modules; when they land, swap out the matching mock functions for the real implementations. The Whisper integration template is `HF_WHISPER_TEMPLATE` in Section 4.
