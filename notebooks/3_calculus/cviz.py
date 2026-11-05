"""English edition of cviz (from djzoom/AURORA): plot labels in English, no CJK font lookup.

cviz — graphical tools for calculus (matplotlib).

Derivative = slope of the tangent, 1-D gradient-descent trajectory, 2-D contours +
gradient arrows + downhill path, learning-rate comparison.
Usage: from cviz import *; style()
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


def tangent(f, df, x0=1.5, span=(-1, 3)):
    """Curve + its tangent line at x0; the tangent's slope = the derivative."""
    style()
    xs = np.linspace(*span, 300)
    fig, ax = plt.subplots(figsize=(6, 4))
    ax.plot(xs, f(xs), color=PALETTE[0], lw=2.5, label="f(x)")
    slope = df(x0)
    ax.plot(xs, f(x0) + slope * (xs - x0), color=PALETTE[1], lw=2, ls="--",
            label=f"tangent (slope=f'({x0})={slope:.2f})")
    ax.plot([x0], [f(x0)], "o", color=PALETTE[1], ms=9)
    ax.legend(fontsize=9); ax.grid(alpha=.3); ax.axhline(0, color=AXIS, lw=.6)
    ax.set_title("Derivative = slope of the tangent = rate of change", fontweight="bold", color=INK)
    fig.tight_layout(); return fig


def descent_1d(f, grad, x0=-2.5, lr=0.1, steps=12):
    """1-D gradient descent: a ball rolls step by step toward the minimum."""
    style()
    xs = np.linspace(-3, 3, 300)
    fig, ax = plt.subplots(figsize=(6, 4))
    ax.plot(xs, f(xs), color=PALETTE[0], lw=2.5)
    x = x0; path = [x]
    for _ in range(steps):
        x = x - lr * grad(x); path.append(x)
    path = np.array(path)
    ax.plot(path, f(path), "o-", color=PALETTE[1], ms=6, lw=1.2, alpha=.8)
    ax.plot([path[0]], [f(path[0])], "o", color=PALETTE[3], ms=11, label="start")
    ax.plot([path[-1]], [f(path[-1])], "*", color=PALETTE[2], ms=18, label="end")
    ax.legend(fontsize=9); ax.grid(alpha=.3)
    ax.set_title(f"Gradient descent: walking down the slope (lr={lr})", fontweight="bold", color=INK)
    fig.tight_layout(); return fig


def contour_descent(start=(-2.3, 2.0), lr=0.15, steps=18):
    """2-D: contours + gradient direction + downhill path, f(x,y)=x²+2y²."""
    style()
    f = lambda x, y: x**2 + 2 * y**2
    gx, gy = (lambda x, y: 2 * x), (lambda x, y: 4 * y)
    X, Y = np.meshgrid(np.linspace(-3, 3, 200), np.linspace(-3, 3, 200))
    fig, ax = plt.subplots(figsize=(5.5, 5))
    ax.contour(X, Y, f(X, Y), levels=15, cmap="viridis", alpha=.7)
    x, y = start; path = [(x, y)]
    for _ in range(steps):
        x, y = x - lr * gx(x, y), y - lr * gy(x, y); path.append((x, y))
    p = np.array(path)
    ax.plot(p[:, 0], p[:, 1], "o-", color=PALETTE[1], ms=5, lw=1.4)
    ax.plot([p[0, 0]], [p[0, 1]], "o", color=PALETTE[3], ms=11, label="start")
    ax.plot([0], [0], "*", color=PALETTE[2], ms=20, label="minimum")
    ax.legend(fontsize=9); ax.set_aspect("equal")
    ax.set_title("2-D gradient descent: downhill, perpendicular to the contours", fontweight="bold", color=INK)
    fig.tight_layout(); return fig


def lr_compare(x0=-2.6, lrs=(0.05, 0.3, 0.95), steps=12):
    """Learning rate too small (slow) / just right / too large (oscillates, diverges)."""
    style()
    f = lambda x: (x) ** 2
    grad = lambda x: 2 * x
    xs = np.linspace(-3, 3, 300)
    fig, ax = plt.subplots(1, 3, figsize=(13, 3.4))
    titles = ["too small → slow", "just right → steady", "too large → oscillates"]
    for a, lr, tt in zip(ax, lrs, titles):
        a.plot(xs, f(xs), color=PALETTE[0], lw=2)
        x = x0; path = [x]
        for _ in range(steps):
            x = x - lr * grad(x); path.append(x)
        path = np.array(path)
        a.plot(path, f(path), "o-", color=PALETTE[1], ms=5, lw=1, alpha=.8)
        a.set_title(f"lr={lr}  ({tt})", fontsize=11); a.grid(alpha=.3)
    fig.suptitle("Effect of the learning rate", fontweight="bold", fontsize=14)
    fig.tight_layout(); return fig
