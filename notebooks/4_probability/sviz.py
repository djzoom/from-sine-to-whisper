"""English edition of sviz (from djzoom/AURORA): plot labels in English, no CJK font lookup.

sviz — graphical tools for probability and statistics (matplotlib).

Law of large numbers, uniform vs normal, Gaussian bell + standard-deviation bands,
before/after z-score, softmax bars, cross-entropy curve.
Usage: from sviz import *; style()
"""
from __future__ import annotations
import numpy as np
import matplotlib.pyplot as plt

from aurora._plot_theme import DARK_THEME, apply_theme

PALETTE = ["#2A9D8F", "#E76F51", "#E9C46A", "#577590", "#8AB17D", "#BC6C8E"]
_THEME = DARK_THEME
INK, AXIS, GRID, SURFACE, SHADOW, PAPER = (
    _THEME.ink,
    _THEME.axis,
    _THEME.grid,
    _THEME.surface,
    _THEME.shadow,
    _THEME.paper,
)


def _sync_theme(theme):
    global INK, AXIS, GRID, SURFACE, SHADOW, PAPER
    INK = theme.ink
    AXIS = theme.axis
    GRID = theme.grid
    SURFACE = theme.surface
    SHADOW = theme.shadow
    PAPER = theme.paper


def style(theme: str | None = None):
    theme_spec = apply_theme(theme, cjk_font=None, figure_size=(6, 4), font_size=11)
    _sync_theme(theme_spec)
    plt.rcParams.update({
        "axes.spines.top": False,
        "axes.spines.right": False,
        "axes.grid": True,
        "grid.alpha": 0.3,
    })


def law_of_large_numbers(n=2000, seed=0):
    """Running frequency of heads in coin flips, gradually converging to 0.5."""
    style()
    rng = np.random.default_rng(seed)
    flips = rng.integers(0, 2, n)
    running = np.cumsum(flips) / np.arange(1, n + 1)
    fig, ax = plt.subplots(figsize=(7, 3.6))
    ax.plot(running, color=PALETTE[0], lw=1.5)
    ax.axhline(0.5, color=PALETTE[1], ls="--", lw=2, label="true probability 0.5")
    ax.legend(fontsize=9); ax.grid(alpha=.3); ax.set_xlabel("number of flips")
    ax.set_title("Law of large numbers: more samples, frequency closer to probability", fontweight="bold", color=INK)
    fig.tight_layout(); return fig


def dist_compare(n=5000, seed=0):
    """Uniform distribution vs normal distribution."""
    style()
    rng = np.random.default_rng(seed)
    fig, ax = plt.subplots(1, 2, figsize=(10, 3.4))
    ax[0].hist(rng.uniform(-3, 3, n), bins=40, color=PALETTE[3])
    ax[0].set_title("Uniform (every value equally likely)")
    ax[1].hist(rng.normal(0, 1, n), bins=40, color=PALETTE[0])
    ax[1].set_title("Normal (many in the middle, few at the edges)")
    fig.tight_layout(); return fig


def gaussian(mu=0.0, sigma=1.0):
    """Gaussian bell curve + ±1σ/±2σ bands."""
    style()
    x = np.linspace(mu - 4 * sigma, mu + 4 * sigma, 400)
    pdf = np.exp(-(x - mu) ** 2 / (2 * sigma ** 2)) / (sigma * np.sqrt(2 * np.pi))
    fig, ax = plt.subplots(figsize=(7, 3.6))
    ax.plot(x, pdf, color=PALETTE[0], lw=2.5)
    for k, c in [(1, PALETTE[2]), (2, PALETTE[1])]:
        ax.fill_between(x, pdf, where=np.abs(x - mu) <= k * sigma, alpha=.18, color=c)
    ax.axvline(mu, color=PALETTE[3], ls="--", label=f"μ={mu}")
    ax.legend(fontsize=9); ax.grid(alpha=.3)
    ax.set_title(f"Normal distribution N(μ={mu}, σ={sigma})", fontweight="bold", color=INK)
    fig.tight_layout(); return fig


def zscore_demo(seed=0):
    """Before/after standardization: mean moves to 0, standard deviation scales to 1."""
    style()
    rng = np.random.default_rng(seed)
    raw = rng.normal(50, 15, 2000)
    z = (raw - raw.mean()) / raw.std()
    fig, ax = plt.subplots(1, 2, figsize=(10, 3.4))
    ax[0].hist(raw, bins=40, color=PALETTE[1]); ax[0].set_title("Raw (μ≈50, σ≈15)")
    ax[1].hist(z, bins=40, color=PALETTE[0]); ax[1].set_title("Standardized (μ=0, σ=1)")
    fig.tight_layout(); return fig


def softmax_bars(scores=(2.0, 1.0, 0.1)):
    """Scores → softmax probabilities (summing to 1)."""
    style()
    z = np.array(scores, float)
    e = np.exp(z - z.max()); p = e / e.sum()
    fig, ax = plt.subplots(1, 2, figsize=(9, 3.4))
    idx = [f"class {i}" for i in range(len(z))]
    ax[0].bar(idx, z, color=PALETTE[3]); ax[0].set_title("Raw scores (logits)")
    ax[1].bar(idx, p, color=PALETTE[0]); ax[1].set_title("softmax probabilities (sum=1)")
    for i, v in enumerate(p):
        ax[1].text(i, v + .01, f"{v:.2f}", ha="center", fontweight="bold")
    fig.tight_layout(); return fig


def cross_entropy_curve():
    """Cross-entropy: the higher the predicted probability of the correct class, the lower the loss."""
    style()
    p = np.linspace(0.01, 1.0, 200)
    fig, ax = plt.subplots(figsize=(6.5, 3.6))
    ax.plot(p, -np.log(p), color=PALETTE[1], lw=2.5)
    ax.set_xlabel("predicted probability of the correct class"); ax.set_ylabel("cross-entropy loss −log(p)")
    ax.grid(alpha=.3)
    ax.set_title("More confident and correct → lower loss", fontweight="bold", color=INK)
    fig.tight_layout(); return fig
