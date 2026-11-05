# Answer key — L90_agent

> ⚠️ Work through the exercises on your own first, then look at the reference implementation.

## Reference implementation 1

```python
def podcast_qa(question, rag_index, chunks, embed_fn, llm, history=None):
    if history is None:
        history = []

    # Step 1: trim the history
    history = truncate_history(history, max_turns=5)

    # Step 2: retrieve the most relevant passages
    context_chunks = retrieve(question, rag_index, chunks, embed_fn, top_k=3)

    # Step 3: assemble the prompt
    prompt = build_prompt(context_chunks, history, question)

    # Step 4: call the LLM
    answer = llm.generate(prompt)

    # Step 5: format the sources and return
    sources = format_sources(context_chunks)
    return answer, sources
```

## Reference implementation 2

`run_agent` — a ReAct loop written from scratch (Thought → Action → Observation → … → Final Answer),
with no agent framework at all. The loop body is the real executor: it parses the `Action: tool_name[input]` the LLM produces,
calls the matching Python function, and pastes the return value back onto the scratchpad as `Observation:`, until `Final Answer:` appears.

```python
import re

def run_agent(question, llm, tools, max_steps=5):
    scratchpad = f"Question: {question}\n"
    trace = []
    for _ in range(max_steps):
        # 1. The LLM only decides "what to do next"
        step = llm.generate(scratchpad)
        scratchpad += step + "\n"
        trace.append(step)

        # 2. If it announces the final answer, return the text after it
        if "Final Answer:" in step:
            answer = step.split("Final Answer:", 1)[1].strip()
            return answer, trace

        # 3. Otherwise parse Action: tool_name[input] and actually call the tool
        m = re.search(r"Action:\s*(\w+)\[(.*?)\]", step)
        if not m:
            raise RuntimeError(f"couldn't parse the action: {step!r}")
        tool_name, tool_input = m.group(1), m.group(2)
        if tool_name not in tools:
            observation = f"unknown tool {tool_name}"
        else:
            tool = tools[tool_name]
            observation = tool(tool_input)

        # 4. Paste the observation back onto the scratchpad and go on to the next round
        obs_line = f"Observation: {observation}"
        scratchpad += obs_line + "\n"
        trace.append(obs_line)

    raise RuntimeError(f"went past max_steps={max_steps} without reaching a Final Answer")
```

**Key points**
- **Who runs the loop**: `llm.generate` only produces "the next step" (one Thought+Action step, or a Final Answer);
  the thing that actually executes tools and appends Observations is the loop body's own code. That's exactly why you can explain an agent clearly without langchain.
- **Reproducible**: `ScriptedReActLLM` plans by "counting Observations" instead of by language understanding,
  and together with the from-scratch `calculator` and the TF-IDF-reusing `search`, everything runs on CPU, offline, with the same result every time.
- **Convergence guard**: the `max_steps` cap prevents an infinite loop of tool calls — real agents must have a step/budget cap too.
