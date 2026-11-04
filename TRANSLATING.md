# Translating a lesson

This repository is the English edition of [AURORA](https://github.com/djzoom/AURORA),
whose 99 lessons are written in Chinese. Lessons are translated one at a time;
contributions are welcome.

## How a lesson gets here

1. Start from the Chinese notebook in AURORA (`notebooks/<phase>/LNN_<name>.ipynb`)
   and its answer key (`solutions/LNN_<name>_solutions.md`). Keep the same file
   name and folder here.
2. Translate every Markdown cell, and in code cells the comments and the text
   that is only displayed (print messages, plot titles and labels, docstrings,
   assertion messages). Keep the number and order of cells identical, so a
   lesson can always be compared cell by cell with its original.
3. Code may be adapted only where the original is tied to Chinese: Chinese dict
   keys become English keys, keyword checkers get English keywords, Chinese-font
   setup is removed. Exercises, numbers and logic stay the same.
4. Clear all outputs before committing.
5. Run the checks:

   ```bash
   python scripts/check_lessons.py                                 # structure, links, no Chinese left
   python scripts/compare_with_original.py --aurora ../AURORA LNN  # same behaviour as the original
   ```

   `compare_with_original.py` executes both notebooks with the exercises left
   blank and requires every code cell to succeed or fail in exactly the same
   way in both languages.

If you find a mistake in the original while translating, fix it in the
original too (open an issue or pull request on AURORA) — the two editions
should never disagree on the maths.

## Who you are writing for
A self-taught learner, English native or fluent, who wants to understand audio AI
from first principles. The Chinese original is warm, conversational, popular-science
in tone: question first, analogy first, story first, then the formula. Keep that.
Write the way a good teacher talks — clear, friendly, a little playful — not the way
a textbook or a machine translation reads.

## Adapt, don't transliterate
- Rewrite idioms and wordplay into natural English that carries the same image.
  "把 N² 折成 N log N" → "fold N² down to N log N". "让梯度逆流而上" → "send the
  gradient swimming upstream". Never leave a sentence that only makes sense in Chinese.
- Chinese teaching text repeats and signposts a lot ("先……再……", "也就是说").
  Keep the signposting that helps; drop filler that reads as padding in English.
- Do not add new content, examples, or claims. Do not drop content. Same structure,
  same headings, same lists, same tables, same order.
- The original glosses terms as 中文（English）. In English just write the English
  term: 采样（sampling） → sampling.
- **This is a standalone English edition: no Chinese cultural background.**
  Replace China-specific places, schools, sayings, foods, apps, names and
  examples with neutral or English-world equivalents that make the same point
  (华北地区 → "New England"; a Chinese word's etymology → the English/Latin
  etymology of the English term). People's names use common Bible names; the
  recurring students are fixed in the table below. Never leave Chinese text,
  Chinese dict keys or Chinese keywords in the English edition.
- Spelling: American English (color, analyze, normalize). "Lesson 2", "L02" both fine.

## Fixed vocabulary (use exactly)
| Chinese | English |
|---|---|
| 第N课 (in the H1 title) | `# Lesson N · <title>` — the gate requires this form |
| 学习目标 | Learning goals |
| 本课先做什么（先看这一句） | Start here (read this first) |
| 最小路径 | minimum path |
| 推理路线 | Line of reasoning |
| 问 N / QN | Question N / QN |
| 参考输入输出 | Reference input and output |
| 本课收束 | Wrap-up |
| 下一课 LNN / 上一课 | Next lesson LNN / Previous lesson |
| 🔗 Aurora 连接 / 为什么对 Aurora 重要 | 🔗 Aurora connection / Why it matters for Aurora |
| 常见误解 | Common misconceptions |
| 参数实验：只改一个旋钮 | Parameter experiment: turn one knob at a time |
| 本格观察点 | What to look for in this cell |
| 关键直觉 | Key intuition |
| 一句话记忆 | One-line takeaway |
| 来自 LNN 的记忆 | Carried over from LNN |
| 闭卷推导 | Closed-book derivation (the gate requires this exact phrase) |
| 白板 | whiteboard |
| 自评 | self-review |
| 检查格 | check cell |
| ✏️ TODO / ✅ / ⬜ / 🎨 | keep the emoji and TODO as is |
| 拒绝黑盒 | No black boxes |
| 我们白板见 | See you at the whiteboard |
| 两态 / 学生态 / 答案态 | two-state / student state / answer state |
| 采样率 | sample rate |
| 正弦波 | sine wave |
| 时频图 / 声谱图 / 谱图 | time–frequency plot / spectrogram |
| 旋转因子 | twiddle factor |
| 本课剧情 | This lesson's story |
| 实验入口 | Into the lab |
| 动手观察 | Hands-on |
| 代码实验 | Code experiment |
| 追问 | Digging deeper |
| 未来的回报 | The payoff later |
| 本课自评 (code-cell header) | ✏️ Self-review for this lesson |
| 老陈 | Samuel (the older, practical student) |
| 琳达 | Ruth |
| 小雨 | Hannah |

## Idioms with fixed renderings (never translate literally)
| Chinese | English |
|---|---|
| 翻车 | go wrong / trip up / slip up — never "crash" |
| 打预防针 | heads-up |
| 口诀 | mnemonic (it usually doesn't rhyme in English) |
| 亲手 | yourself / by hand — never "with your own hands" |
| 筛出 | pick out / sift out — never "filter out" (that means *remove*) |
| 新插入 / 新增 (editing leftovers) | drop the word |
| 初中 / 中学 | at school / in school |

## Titles and casing
- H1 and every heading: **sentence case** (only the first word and proper nouns capitalised).
- A lesson's short title in nav links must match the wording of its own H1.
