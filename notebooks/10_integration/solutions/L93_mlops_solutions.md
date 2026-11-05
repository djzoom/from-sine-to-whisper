# Reference implementation — L93_mlops

> ⚠️ Finish the exercises on your own first, then look at the reference implementation.

This lesson's hands-on exercise is to complete `setup_experiment()`: it takes a hyperparameter config dict, initializes a W&B run in **disabled mode**
(no network, no external calls of any kind), and returns the run object for later `wandb.log()` calls.

## Reference implementation — `setup_experiment()`

```python
def setup_experiment(cfg: dict):
    """
    Initialize one W&B experiment run (disabled mode, no network needed).

    Parameters:
        cfg: hyperparameter config dict, with at least the keys 'project', 'run_name', 'n_mels'
    Returns:
        a wandb.Run object; None if wandb isn't installed in this environment
    """
    # Guard with HAS_WANDB: without wandb installed we shouldn't raise, just return None
    if not HAS_WANDB:
        return None

    # mode='disabled' makes wandb fully offline: no run directory, no network, no upload,
    # yet the run.config / run.log() interfaces still work — ideal for teaching and CI.
    run = wandb.init(
        project=cfg["project"],
        name=cfg["run_name"],
        config=cfg,          # write the whole set of hyperparameters into config at once, for reproducibility
        mode="disabled",
    )
    return run
```

## Walkthrough

1. **Why check `HAS_WANDB` first**: all the W&B code in this lesson is wrapped in a `HAS_WANDB` guard,
   so readers who haven't installed `wandb` can still run all the way to the end. `setup_experiment()` follows the same convention —
   when the library is missing it returns `None` instead of raising `ImportError`, leaving the decision about whether to continue to the caller.

2. **`mode="disabled"` is the key**: it makes `wandb.init()` write no local run directory, use no network and need no
   `WANDB_API_KEY`, so it runs safely in a notebook, in unit tests and in CI. To upload for real, switch to
   `mode="online"` (the default) and set up an API key; the rest of the function stays the same.

3. **`config=cfg` in one go**: hand all the hyperparameters — learning rate, `n_mels`, `batch_size` and the rest — to `config` together,
   and you can read them back later with `run.config['n_mels']`. That's exactly the field the check cell asserts on, and it's the heart of
   "reproducible experiments": the hyperparameters are bound to the run instead of scattered across the script.

4. **Return the run object**: the training loop keeps using it to record metrics with `run.log({...})`, and closes it with `run.finish()` at the end.
   Returning it rather than consuming it inside the function follows the engineering habit of "keep initialization separate from use".

## What the check verifies

After `setup_experiment(test_cfg)`, the check cell asserts:

```python
assert run is not None
assert run.config['n_mels'] == test_cfg['n_mels']   # 64
assert run.config['lr']     == test_cfg['lr']        # 1e-3
```

That is, the hyperparameters in config can be read back unchanged. Note: the check cell only runs when `HAS_WANDB` is true;
in an environment without `wandb` it prints a "skipping" message and passes straight through — this is deliberate, so the lesson **runs end to end with no external dependencies**.

## Further exercises

- Lift `mode` into a parameter, `setup_experiment(cfg, mode="disabled")`, so the same function can both run an offline demo
  and upload for real on an actual machine.
- Before returning, add `run.define_metric("val_acc", summary="max")` so the Dashboard automatically records the best
  `val_acc`; use it together with the grid search in Section 3 of this lesson.
