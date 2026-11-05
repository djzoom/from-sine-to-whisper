# From a Sine Wave to Whisper

**A free, open course in audio AI from first principles — 99 lessons, six months, one thread.**

You start by generating a single sine wave and end by understanding how Whisper
turns speech into text, how a music recommender finds songs you'll like, and how a
retrieval-augmented language model answers questions. Along the way you write the
FFT, the STFT, the mel filterbank, MFCCs, backpropagation, CTC, attention, a KV
cache and a RAG pipeline **yourself, in NumPy**, and check each one against a
reference implementation. One rule holds on every page: **no black boxes.**

The whole course is free and open source under the MIT license — no paywall, no
"first lesson free", nothing to sign up for. It is meant as a public good: learn
from it, fork it, teach with it, build on it.

> **Status.** 31 of 99 lessons are available in English. The rest are being
> translated from the [Chinese original](https://github.com/djzoom/AURORA); until
> then each lesson below links to its Chinese version.

## Getting started

```bash
git clone https://github.com/djzoom/from-sine-to-whisper
cd from-sine-to-whisper
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python -m ipykernel install --user --name aurora --display-name "Python (Aurora)"
jupyter lab notebooks/0_foundation/L01_motivation.ipynb
```

Pick the **Python (Aurora)** kernel in the top-right corner of Jupyter.

`requirements.txt` installs the reference library [`aurora`](https://github.com/djzoom/AURORA)
(FFT, STFT, mel, MFCC and more, written from scratch and tested) straight from
its repository, so the code you compare your answers against is always the same
code the Chinese edition uses.

## How each lesson works

Run cells one by one with `Shift+Enter`. A **✏️ TODO** cell is code for you to
write; run it, and the check cell below it turns ✅ or tells you what's wrong.
Every lesson has the same shape: a plain-language introduction → a demo → TODO
exercises → a closed-book whiteboard derivation with an answer cell → a
self-review. Reference answers live in each phase's `solutions/` folder — try
first, peek later.

Lessons marked 🎨 are visual lessons: no coding task; you build intuition by
turning one knob at a time and watching the plots.

## The course (L01 → L99)

### 🏁 Phase 0 · Foundations  `0_foundation/`  L01–L03

| # | Lesson |
|---|---|
| [L01](notebooks/0_foundation/L01_motivation.ipynb) | What Aurora is — from a sine wave to Whisper: the six-month roadmap and why build from scratch |
| [L02](notebooks/0_foundation/L02_sound_digital.ipynb) | Sound as numbers — sampling, PCM arrays, your first audible sine wave |
| [L03](notebooks/0_foundation/L03_spectrogram.ipynb) | Spectrogram intuition — reading the three axes of a time–frequency plot before learning the FFT |

### 📐 Phase 1 · Complex numbers & trigonometry  `1_complex_trig/`  L04–L08

| # | Lesson |
|---|---|
| [L04](notebooks/1_complex_trig/L04_trig.ipynb) | The three parameters of a sine — frequency sets pitch, amplitude sets loudness, phase sets the starting point |
| [L05](notebooks/1_complex_trig/L05_complex_numbers.ipynb) | The geometry of complex numbers — real/imaginary → polar form; multiplication = rotation + scaling |
| [L06](notebooks/1_complex_trig/L06_euler.ipynb) | Euler's formula e^{iθ} = cos θ + i sin θ — the twiddle factor at the heart of the FFT |
| [L07](notebooks/1_complex_trig/L07_fourier_intuition.ipynb) | Everything is a sine — building a square wave from harmonics; Fourier intuition in one picture |
| [L08](notebooks/1_complex_trig/L08_visual_complex.ipynb) 🎨 | Visualizing the complex plane — unit-circle rotation, conjugates and phase, animated |

### 🔢 Phase 2 · Linear algebra  `2_linear_algebra/`  L09–L21

| # | Lesson |
|---|---|
| [L09](notebooks/2_linear_algebra/L09_vectors.ipynb) | Vector algebra — addition, scalar multiplication and linear combinations, in NumPy and geometrically |
| [L10](notebooks/2_linear_algebra/L10_dot_product.ipynb) | Dot products and projection — a·b = \|a\|\|b\| cos θ, and why similarity = dot product ÷ norms |
| [L11](notebooks/2_linear_algebra/L11_norms.ipynb) | Vector norms — L1 / L2 / ∞: computation, geometry and what they mean for regularization |
| [L12](notebooks/2_linear_algebra/L12_matrices.ipynb) | Matrix multiplication — a matrix is a linear map, multiplication is composition; a 2×2 worked by hand |
| [L13](notebooks/2_linear_algebra/L13_special_matrices.ipynb) | Special matrices — orthogonal matrices preserve length, symmetric = mirror, testing positive-definiteness |
| [L14](notebooks/2_linear_algebra/L14_eigen_svd.ipynb) | Eigenvalues and SVD — the geometry of Ax = λx; SVD as the universal decomposition |
| [L15](notebooks/2_linear_algebra/L15_linear_systems.ipynb) | Gaussian elimination — solving Ax = b, row-echelon form, when solutions exist |
| [L16](notebooks/2_linear_algebra/L16_determinant_inverse.ipynb) | Determinants and inverses — det(A) as area scaling; inverting, and when you can't |
| [L17](notebooks/2_linear_algebra/L17_eigen_diagonalization.ipynb) | Eigendecomposition A = PDP⁻¹ — changing basis turns a matrix product into scalar multiplication |
| [L18](notebooks/2_linear_algebra/L18_invertibility.ipynb) | Invertibility and rank — rank = information, null space = the directions that get crushed, diagnosing singular matrices |
| [L19](notebooks/2_linear_algebra/L19_visual_multiply.ipynb) 🎨 | Matrix transformations illustrated — rotation, scaling and shear, animated |
| [L20](notebooks/2_linear_algebra/L20_visual_factorizations.ipynb) 🎨 | A map of decompositions — LU / QR / SVD compared geometrically |
| [L21](notebooks/2_linear_algebra/L21_aurora_matrices.ipynb) 🎨 | Matrices as filters — the DFT matrix and the mel matrix: audio processing is matrix multiplication |

### ∂ Phase 3 · Calculus  `3_calculus/`  L22–L26

| # | Lesson |
|---|---|
| [L22](notebooks/3_calculus/L22_derivatives.ipynb) | Derivatives — tangent slope, the limit definition, numerical vs analytical differentiation |
| [L23](notebooks/3_calculus/L23_gradients.ipynb) | Gradients — the direction of steepest ascent; partial derivatives and the gradient vector |
| [L24](notebooks/3_calculus/L24_chain_rule.ipynb) | The chain rule — differentiating nested functions, the maths behind backpropagation |
| [L25](notebooks/3_calculus/L25_gradient_descent.ipynb) | Gradient descent — fitting a line to data, from loss function to weight-update rule |
| [L26](notebooks/3_calculus/L26_visual_calculus.ipynb) 🎨 | Calculus visualized — tangents, contour lines and gradient-descent trajectories |

### 🎲 Phase 4 · Probability & statistics  `4_probability/`  L27–L31

| # | Lesson |
|---|---|
| [L27](notebooks/4_probability/L27_probability_basics.ipynb) | Probability basics — events, conditional probability, independence and the law of large numbers |
| [L28](notebooks/4_probability/L28_descriptive_stats.ipynb) | Mean, variance, standardization — descriptive statistics, z-scores and comparing distributions |
| [L29](notebooks/4_probability/L29_distributions.ipynb) | Common distributions — uniform, Gaussian, Bernoulli: PDF / CDF and sampling |
| [L30](notebooks/4_probability/L30_softmax_crossentropy.ipynb) | Softmax and cross-entropy — the output layer and loss of a classifier, gradient derived by hand |
| [L31](notebooks/4_probability/L31_visual_probability.ipynb) 🎨 | Distributions visualized — PDF, CDF and the cross-entropy loss surface |

### 🔊 Phase 5 · Audio DSP  `5_audio_dsp/`  L32–L53

| # | Lesson |
|---|---|
| L32 | NumPy for signals — `np.arange` / `linspace`, building a one-second 16 kHz time axis *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/5_audio_dsp/L32_numpy_signals.ipynb))* |
| L33 | Generating a sine — `x[n] = A·sin(2πfn/sr)`, implemented and checked against `aurora.audio.sine` *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/5_audio_dsp/L33_sine_wave.ipynb))* |
| L34 | Nyquist and aliasing — what a 6 kHz sine becomes when sampled at 8 kHz *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/5_audio_dsp/L34_aliasing.ipynb))* |
| L35 | Euler meets the FFT — what `e^{-2πikn/N}` is; visualizing twiddle factors *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/5_audio_dsp/L35_euler_fft.ipynb))* |
| L36 | Window functions — spectral leakage from the rectangular window; Hann / Hamming / Blackman compared *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/5_audio_dsp/L36_windows.ipynb))* |
| L37 | The brute-force DFT — `X[k] = Σ x[n] e^{-2πikn/N}`, an O(N²) double loop verified against NumPy *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/5_audio_dsp/L37_dft.ipynb))* |
| L38 | The FFT butterfly — even/odd split, `E[k] + W^k·O[k]`, from O(N²) to O(N log N) *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/5_audio_dsp/L38_fft_butterfly.ipynb))* |
| L39 | Writing the FFT from scratch — recursive Cooley–Tukey, error < 1e-10 vs `numpy.fft` *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/5_audio_dsp/L39_fft_implement.ipynb))* |
| L40 | Spectrum analysis in practice — magnitude and phase spectra, frequency resolution, a 440 Hz + 880 Hz mix *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/5_audio_dsp/L40_spectrum.ipynb))* |
| L41 | The windowed-FFT pipeline — signal → window → FFT → magnitude spectrum, end to end *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/5_audio_dsp/L41_fft_full.ipynb))* |
| L42 🎨 | The FFT drawn — butterfly diagram; spectra of a pure tone, a chord and noise *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/5_audio_dsp/L42_visual_fft.ipynb))* |
| L43 | How the STFT works — putting timestamps on a spectrum; the time–frequency resolution trade-off *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/5_audio_dsp/L43_stft.ipynb))* |
| L44 | Writing the STFT — framing + windowing + FFT, checked against `aurora.audio.stft` *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/5_audio_dsp/L44_stft_implement.ipynb))* |
| L45 | Making spectrograms — `magnitude_spectrogram`, `pcolormesh` heatmaps, reading a time–frequency plot *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/5_audio_dsp/L45_spectrogram.ipynb))* |
| L46 | The mel scale — logarithmic pitch perception, mel = 2595·log₁₀(1 + f/700), triangular filters *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/5_audio_dsp/L46_mel.ipynb))* |
| L47 | Writing the mel filterbank — `mel_filterbank` from formula to NumPy, checked against the library *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/5_audio_dsp/L47_mel_implement.ipynb))* |
| L48 🎨 | Time–frequency plots compared — linear vs mel vs log-mel spectrograms *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/5_audio_dsp/L48_visual_stft.ipynb))* |
| L49 | The DCT-II — why it decorrelates; a pure-NumPy replacement for `scipy.fft.dct` *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/5_audio_dsp/L49_dct.ipynb))* |
| L50 | The full MFCC pipeline — signal → STFT → mel → log → DCT, checking the shape at every step *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/5_audio_dsp/L50_mfcc.ipynb))* |
| L51 | MFCCs on real audio — extracting features from a real WAV file, with librosa as the answer key *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/5_audio_dsp/L51_real_audio.ipynb))* |
| L52 | Audio Core complete — wrapping up feature engineering, the unit tests all green, assembling the evidence *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/5_audio_dsp/L52_features_done.ipynb))* |
| L53 🎨 | MFCCs illustrated — waveform → spectrogram → mel spectrogram → cepstral coefficients, layer by layer *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/5_audio_dsp/L53_visual_mfcc.ipynb))* |

### 🧠 Phase 6 · Deep learning  `6_deep_learning/`  L54–L65

| # | Lesson |
|---|---|
| L54 | A `Value` computation graph — scalar autodiff: forward values and backward gradients, hand-written add / mul nodes *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/6_deep_learning/L54_value_autograd.ipynb))* |
| L55 | Completing the operators — `__pow__`, ReLU, tanh, exp nodes; the full computation graph *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/6_deep_learning/L55_forward_pass.ipynb))* |
| L56 | Backpropagation by hand — the chain rule layer by layer: gradient = local gradient × upstream gradient *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/6_deep_learning/L56_backward_pass.ipynb))* |
| L57 | An MLP from scratch — fully connected layers, activations, the complete forward and backward pass *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/6_deep_learning/L57_mlp.ipynb))* |
| L58 | The training loop — loss, `optimizer.step`, convergence curves, fitting `make_moons` *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/6_deep_learning/L58_training_loop.ipynb))* |
| L59 | PyTorch tensors — converting to and from NumPy, devices, `requires_grad` *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/6_deep_learning/L59_tensor_basics.ipynb))* |
| L60 | How autograd works — `grad_fn` graphs, `backward()`, `retain_graph` *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/6_deep_learning/L60_pytorch_autograd.ipynb))* |
| L61 | `nn.Module` in practice — Linear / ReLU / Sequential, managing parameters, saving models *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/6_deep_learning/L61_pytorch_nn.ipynb))* |
| L62 | `Dataset` and `DataLoader` — a custom `__getitem__`, batching audio data *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/6_deep_learning/L62_kws_dataset.ipynb))* |
| L63 | An audio classifier — CNN on mel features, defining the network for Speech Commands *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/6_deep_learning/L63_kws_model.ipynb))* |
| L64 | Training and evaluation — train loop + validation loop, accuracy, confusion matrix, diagnosing overfitting *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/6_deep_learning/L64_kws_train_eval.ipynb))* |
| L65 🎨 | Training visualized — loss / accuracy curves, gradient norms, weight histograms *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/6_deep_learning/L65_visual_training.ipynb))* |

### 🎙️ Phase 7 · Speech recognition  `7_asr/`  L66–L75

| # | Lesson |
|---|---|
| L66 | ASR end to end — acoustic model → language model → decoder; end-to-end vs classical pipelines *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/7_asr/L66_asr_overview.ipynb))* |
| L67 | Edit distance from scratch — Levenshtein dynamic programming, the maths of WER *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/7_asr/L67_edit_distance.ipynb))* |
| L68 | How CTC alignment works — the blank symbol, monotonic paths and label collapsing *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/7_asr/L68_ctc_alignment.ipynb))* |
| L69 | The CTC forward algorithm — summing over all paths, O(T×2L) in pure NumPy *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/7_asr/L69_ctc_forward.ipynb))* |
| L70 | Inside Whisper — log-mel input, Transformer encoder–decoder, multitask heads *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/7_asr/L70_whisper_arch.ipynb))* |
| L71 | Whisper decoding — greedy decoding and beam search, from principle to implementation *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/7_asr/L71_whisper_decoding.ipynb))* |
| L72 | Fine-tuning Whisper — LoRA low-rank adapters vs full fine-tuning, adapting to Chinese / dialect data *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/7_asr/L72_whisper_finetune.ipynb))* |
| L73 | Evaluating with WER — insertions / deletions / substitutions, sentence-level analysis compared with jiwer *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/7_asr/L73_wer_eval.ipynb))* |
| L74 | ASR error analysis — substitution / deletion / insertion patterns, from a WER number to what to fix *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/7_asr/L74_asr_error_analysis.ipynb))* |
| L75 🎨 | The ASR pipeline drawn — waveform → spectrogram → tokens → text *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/7_asr/L75_visual_asr.ipynb))* |

### 🎵 Phase 8 · Music understanding  `8_music/`  L76–L82

| # | Lesson |
|---|---|
| L76 | Music theory crash course — pitch, intervals, the chroma wheel and equal temperament *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/8_music/L76_music_theory.ipynb))* |
| L77 | Music features — chroma, RMS energy, zero-crossing rate, implemented in `aurora.music` *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/8_music/L77_music_features.ipynb))* |
| L78 | Beat tracking from scratch — onset envelope, autocorrelation and tempo (BPM) estimation *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/8_music/L78_beat_tracking.ipynb))* |
| L79 | Music embeddings — contrastive learning: pull similar styles together, push genres apart *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/8_music/L79_music_embed.ipynb))* |
| L80 | Vector similarity search — cosine vs dot product vs L2, a pure-NumPy k-NN *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/8_music/L80_similarity.ipynb))* |
| L81 | A music recommender — user taste → embeddings → nearest neighbours → a playlist *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/8_music/L81_recommendation.ipynb))* |
| L82 🎨 | Music features visualized — chromagrams, beat grids, similarity heatmaps *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/8_music/L82_visual_music.ipynb))* |

### 💬 Phase 9 · LLMs & retrieval  `9_llm/`  L83–L91

| # | Lesson |
|---|---|
| L83 | A Transformer from scratch — multi-head attention + positional encoding + feed-forward *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/9_llm/L83_transformer.ipynb))* |
| L84 | LoRA — W = W₀ + BA: fine-tuning a GPT-style model with 0.1 % of the parameters *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/9_llm/L84_lora.ipynb))* |
| L85 | A KV cache from scratch — updating the key/value cache, O(seq²) → O(seq) per step *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/9_llm/L85_kv_cache.ipynb))* |
| L86 | Sampling strategies from scratch — temperature / top-k / top-p in pure NumPy *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/9_llm/L86_sampling.ipynb))* |
| L87 | Quantization and local inference — how INT8 quantization works; lightweight inference with Hugging Face *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/9_llm/L87_local_inference.ipynb))* |
| L88 | TF-IDF retrieval from scratch — term frequency × inverse document frequency, vector search in NumPy *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/9_llm/L88_tfidf_retrieval.ipynb))* |
| L89 | A complete RAG pipeline — chunking + TF-IDF retrieval + prompt construction + generation *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/9_llm/L89_rag_pipeline.ipynb))* |
| L90 | Conversational RAG and a tool-using agent (ReAct) — session memory, source attribution, Thought/Action/Observation *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/9_llm/L90_agent.ipynb))* |
| L91 🎨 | Attention illustrated — multi-head attention heatmaps, the low-rank structure of LoRA *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/9_llm/L91_visual_llm.ipynb))* |

### 🚀 Phase 10 · Integration  `10_integration/`  L92–L99

| # | Lesson |
|---|---|
| L92 | The end-to-end pipeline — microphone → ASR → LLM → text answer, assembled *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/10_integration/L92_pipeline.ipynb))* |
| L93 | MLOps basics — experiment tracking with W&B, model versioning, Docker packaging and deployment scripts *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/10_integration/L93_mlops.ipynb))* |
| L94 | Aurora v1 demo — every capability in one showcase; assembling the evidence *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/10_integration/L94_demo.ipynb))* |
| L95 | Reading research papers — the three-pass method, paper structure, submission and collaboration *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/10_integration/L95_research_papers.ipynb))* |
| L96 | Whiteboard practice — deriving the DFT / FFT / attention out loud *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/10_integration/L96_whiteboard.ipynb))* |
| L97 | Presenting your work — a 30-second summary, the GitHub evidence chain, mapping skills to a CV *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/10_integration/L97_interview.ipynb))* |
| L98 | Retrospective — six months of milestones, what worked, measuring the learning curve *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/10_integration/L98_retrospective.ipynb))* |
| L99 | What next — research directions, open-source contribution, the next milestone *(coming soon — [Chinese original](https://github.com/djzoom/AURORA/blob/main/notebooks/10_integration/L99_next_steps.ipynb))* |

---

## About this edition

This is the English edition of [AURORA](https://github.com/djzoom/AURORA), written
in Chinese by Garfield Wang. It is adapted, not transliterated: examples and
references are chosen for English-speaking readers, and the recurring students
who ask questions in later lessons are called Samuel, Ruth and Hannah. The maths,
the code and the exercises are the same as in the original, and every lesson is
checked to behave exactly like its Chinese counterpart (see
[`TRANSLATING.md`](TRANSLATING.md)).

Found a mistake, or a sentence that reads oddly? Please open an issue — include
the lesson number and the cell.

## License

MIT — see [`LICENSE`](LICENSE). Free to learn from, change, share and use commercially.
