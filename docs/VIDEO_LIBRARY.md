# 🎬 Video Library · From a Sine Wave to Whisper

> **From a sine wave to Whisper, with great teachers writing the code alongside you.**
> A curated, phase-by-phase catalog of the best English-language YouTube courses and lectures — from well-known teachers and top universities — that supplement the 99 from-scratch lessons of *From a Sine Wave to Whisper*.

This is a supplementary watch list for **self-learners**, mapped to every phase of the course, lessons **L01–L99**. The selection follows the course's own rule — **write it yourself, no black boxes, first principles** — so it favours resources that let you **re-derive the maths or write the algorithm with your own hands** (Karpathy, 3Blue1Brown, Valerio Velardo, Umar Jamil, Meinard Müller, Steve Brunton…), backed by complete university courses for rigour.

- **Size**: **83 entries**, all in English, covering the whole stack: LLMs · ML/DL · TTS · ASR · DSP · music information retrieval · RAG/agents · MLOps.
- **How to use it**: when a `✏️ TODO` cell has you stuck, or you want intuition before you start, look up the lesson number `L__` and go to the matching phase below. **Watch the intuition video → watch the implementation video → go back to the notebook and write it yourself.**
- **Checklist**: the interactive version (`quest/video-library.html`, deployed with the Quest) lets you tick off each video as you watch it. Your progress bar, daily streak, cleared phases and 🥉🥈🥇💎👑 milestone medals are stored only in your own browser (localStorage). "Clear checklist" asks you to click twice before it resets.
- **Legend**: level `Beginner / Intermediate / Advanced`; 🥇 = first choice for its phase; `⚠️` = the direct link to a single video could not be confirmed — go by "channel + search terms" instead (see [Verification notes](#verification-notes) at the end).

---

## Contents

- [Quick reference: phase → first-choice video](#quick-reference-phase--first-choice-video)
- [Who's who: teachers and institutions](#whos-who-teachers-and-institutions)
- [Three learning paths](#three-learning-paths)
- [Phase 0–1 · Maths and signal intuition (L01–L08)](#phase-01--maths-and-signal-intuition-l01l08)
- [Phase 2 · Linear algebra (L09–L21)](#phase-2--linear-algebra-l09l21)
- [Phase 3 · Calculus (L22–L26)](#phase-3--calculus-l22l26)
- [Phase 4 · Probability and statistics (L27–L31)](#phase-4--probability-and-statistics-l27l31)
- [Phase 5 · Audio DSP (L32–L53)](#phase-5--audio-dsp-l32l53)
- [Phase 6 · Machine learning and deep learning (L54–L65)](#phase-6--machine-learning-and-deep-learning-l54l65)
- [Phase 7 · Speech recognition (L66–L75)](#phase-7--speech-recognition-l66l75)
- [Phase 8 · Music understanding / MIR (L76–L82)](#phase-8--music-understanding--mir-l76l82)
- [Phase 9 · LLMs, RAG and agents (L83–L91)](#phase-9--llms-rag-and-agents-l83l91)
- [Phase 10 · Integration, MLOps and interviews (L92–L99)](#phase-10--integration-mlops-and-interviews-l92l99)
- [aurora.tts · Text-to-speech (deferred module, supplementary)](#auroratts--text-to-speech-deferred-module-supplementary)
- [Verification notes](#verification-notes)

---

## Quick reference: phase → first-choice video

| Phase · lessons | Topic | 🥇 First-choice supplement (in one line) |
| --- | --- | --- |
| **Phase 0–1** · L01–L08 | Digital sound · complex numbers and trig · Fourier intuition | 3Blue1Brown's *Fourier transform / Fourier series* + *Euler's formula* — makes "complex exponential = rotation" something you can see |
| **Phase 2** · L09–L21 | Linear algebra | 3B1B *Essence of Linear Algebra* for intuition → MIT 18.06 with Gilbert Strang for rigour |
| **Phase 3** · L22–L26 | Calculus | 3B1B *Essence of Calculus* + *Backpropagation calculus* |
| **Phase 4** · L27–L31 | Probability and statistics | StatQuest statistics fundamentals + Harvard Stat 110; StatQuest's step-by-step derivatives for softmax / cross-entropy |
| **Phase 5** · L32–L53 | Audio DSP | **Valerio Velardo, *Audio Signal Processing for ML* — follows this phase almost lesson by lesson; a must** |
| **Phase 6** · L54–L65 | Deep learning | **Karpathy, *Neural Networks: Zero to Hero* (micrograd) — backpropagation written from scratch** |
| **Phase 7** · L66–L75 | Speech recognition | **CMU 11-785 lecture on the CTC forward–backward algorithm** + Stanford CS224S for the whole ASR picture |
| **Phase 8** · L76–L82 | Music / MIR | Meinard Müller (FMP) on chroma and beat tracking + Valerio's ASP series for the feature groundwork |
| **Phase 9** · L83–L91 | LLMs / RAG / agents | **Karpathy, *Let's build GPT* + Umar Jamil coding KV cache / LoRA / quantization / RAG from scratch** |
| **Phase 10** · L92–L99 | Integration / MLOps / interviews | Full Stack Deep Learning + Made With ML + Weights & Biases' own courses |
| **aurora.tts** | Speech synthesis (deferred module) | Valerio Velardo, *Text-to-Speech & Voice Cloning* + *The Neural TTS Revolution* |

---

## Who's who: teachers and institutions

Ordered by how often they appear here and how authoritative they are — so you know who is who and why they are worth following through a whole series.

| Teacher / institution | Who they are | Signature content | Relation to this course |
| --- | --- | --- | --- |
| **Andrej Karpathy** | Founding member of OpenAI, former director of AI at Tesla | Neural Networks: Zero to Hero (micrograd → GPT → tokenizer) | **The closest match** to the course's "write it from scratch" approach; the direct model for L54–L58 and L83–L87 |
| **3Blue1Brown** (Grant Sanderson) | The leading maker of mathematical animations | Intuition for linear algebra, calculus, Fourier, neural networks, Transformers | Every "Essence of" series builds intuition first, with no black boxes |
| **Valerio Velardo** (The Sound of AI) | Runs one of the largest audio-AI education communities | ASP for ML, Deep Learning for Audio, TTS & Voice Cloning, PyTorch for Audio | **Follows the audio thread almost lesson by lesson**, across DSP, DL, music and TTS |
| **Umar Jamil** | ML engineer | Coding Transformer / LLaMA / LoRA / quantization / RAG from scratch in PyTorch | A line-by-line blueprint for L83–L89 |
| **Steve Brunton** (University of Washington) | Professor, University of Washington | Data-Driven Science: Fourier / FFT / SVD | Every concept comes with hand-written Python / MATLAB code |
| **Meinard Müller** (AudioLabs Erlangen) | Author of *Fundamentals of Music Processing* | Chroma / onsets / beat tracking + the FMP notebooks | The authority in MIR, with code-level reference implementations |
| **StatQuest** (Josh Starmer) | Statistician, formerly at UNC | Statistics and ML, "broken down step by step" | Derives softmax / cross-entropy / backprop derivatives by hand |
| **Gilbert Strang / Joe Blitzstein / Alan Oppenheim / Denis Auroux** | Professors at MIT and Harvard | 18.06 linear algebra · Stat 110 probability · Signals and Systems · 18.02 calculus | The rigorous theoretical foundation |
| **Yannic Kilcher** | ML researcher | Section-by-section paper walkthroughs | Attention / wav2vec 2.0 / SimCLR / EATS; a model for L95's paper reading |
| **Full Stack Deep Learning · Made With ML · Weights & Biases** | Industry-grade MLOps courses | From demo to product, experiment tracking, CI/CD | The engineering blueprint for L92–L94 |

---

## Three learning paths

Pick one path as your main thread and treat the rest as supplements:

1. **🎨 Intuition first** (see it, then build it): 3Blue1Brown → StatQuest → Serrano.Academy → back to the notebook. Good if your maths is rusty and you need geometric intuition before anything else.
2. **⌨️ Hard-core from scratch** (type along, in step with the course): Karpathy → Umar Jamil → Valerio Velardo → Steve Brunton. Pause after each segment, reproduce it yourself in NumPy, then compare with the reference — exactly the course's own workflow.
3. **🎓 University track** (full lecture courses, for rigour): MIT 18.06 (Strang) → Harvard Stat 110 (Blitzstein) → MIT RES.6.007 Signals and Systems (Oppenheim) → MIT 6.S191 → CMU 11-785 → Stanford CS224S → Full Stack Deep Learning. Slower, but you come out with the formal foundations an interviewer will probe.

> **Time budget**: for the maths and signal foundations (Phases 0–4), one intuition video per lesson (10–30 minutes) is enough. For the three big from-scratch phases — Audio DSP, deep learning and LLMs — it is worth **typing along with the whole** Karpathy / Velardo / Umar Jamil video (2–4 hours each, and worth every minute).

---

## Phase 0–1 · Maths and signal intuition (L01–L08)

> Complex numbers, trigonometry and Fourier intuition are the first key to all of audio AI. Get "complex multiplication = rotation + scaling" and "a square wave = a sum of sines" into your bones here, and writing the DFT/FFT later won't feel like memorising formulas.

### Essence of Linear Algebra
- **Instructor**: Grant Sanderson (3Blue1Brown)
- **Links**: https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab
- **Type**: Playlist (16 episodes) · **Level**: Beginner · **Language**: English (with captions) · **Duration**: about 3 hours
- **Covers**: vectors, linear combinations and span; matrices as linear transformations; matrix multiplication as composition; determinants; inverses, column space and null space; dot and cross products; eigenvalues and eigenvectors; change of basis; abstract vector spaces
- **Lessons**: L05–L21 (the geometry of complex numbers, extended into linear algebra)
- **Why it fits**: its central claim — "a matrix is a linear transformation" — is where the course's idea of "matrices as filters" (the DFT and mel matrices) comes from. Pure geometric reasoning, no black boxes. **The intuition backbone for Phases 1–2.**

### Essence of Calculus
- **Instructor**: Grant Sanderson (3Blue1Brown)
- **Links**: https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr
- **Type**: Playlist (12 episodes) · **Level**: Beginner · **Language**: English (with captions) · **Duration**: about 3 hours
- **Covers**: the geometric meaning of the derivative, tangents, derivatives of powers / exponentials / trig functions, the chain and product rules visualised, implicit differentiation, limits, integrals and the fundamental theorem, Taylor series
- **Lessons**: L22–L26 (calculus)
- **Why it fits**: episode 4, "Visualizing the chain rule", is the intuitive foundation for backpropagation (L24–L25). Its stated aim — to make you feel you could have invented calculus yourself — is first-principles thinking at its best.

### The Fourier transform and Fourier series (two visual-intuition videos)
- **Instructor**: Grant Sanderson (3Blue1Brown)
- **Links**: Fourier transform https://www.youtube.com/watch?v=spUNpyF58BY | Fourier series https://www.youtube.com/watch?v=r6sGWTCMz2k
- **Type**: Single videos ×2 · **Level**: Beginner → Intermediate · **Language**: English (with captions) · **Duration**: about 21 min + 25 min
- **Covers**: "winding" a signal around a circle and finding its centre of mass — the geometry behind frequency decomposition; summing rotating vectors (complex exponentials) to approximate any waveform, including a square wave as a sum of sines
- **Lessons**: L07–L08 (Fourier intuition); rewatch while writing the DFT/FFT in L35–L42
- **Why it fits**: rotating vectors make "complex exponential e^{iθ} + summation = spectrum" completely clear — exactly the intuition you need before writing the DFT by hand, and more reproducible than any formal derivation.

### Euler's formula with introductory group theory
- **Instructor**: Grant Sanderson (3Blue1Brown)
- **Links**: https://www.youtube.com/watch?v=mvmuCPvRoWQ
- **Type**: Single video · **Level**: Intermediate · **Language**: English (with captions) · **Duration**: about 24 minutes
- **Covers**: thinking of numbers as actions (rotations and scalings); why e^{iθ} walks around the unit circle; the geometric meaning of e^{iπ} = −1
- **Lessons**: L05–L06 (complex geometry = rotation + scaling; Euler's formula)
- **Why it fits**: goes straight to the central claim of the complex-numbers lessons — "complex multiplication = rotation + scaling" — and understands Euler's formula through actions rather than rote memory. A textbook case of first-principles thinking.

---

## Phase 2 · Linear algebra (L09–L21)

> The course has you write Gaussian elimination, LU / QR / SVD and eigendecomposition by hand. Build intuition with 3B1B, get rigour from MIT 18.06, then land it in running code with Brunton.

### MIT 18.06 Linear Algebra (Gilbert Strang, full course)
- **Instructor**: Prof. Gilbert Strang, MIT OpenCourseWare
- **Links**: https://www.youtube.com/playlist?list=PL221E2BBF13BECF6C (18.06SC, Fall 2011)
- **Type**: Full course (35+ lectures, with recitations) · **Level**: Intermediate · **Language**: English (with captions) · **Duration**: about 35–40 hours
- **Covers**: Gaussian elimination, A = LU, column space / null space / rank, orthogonality and projections, Gram–Schmidt / QR, determinants, eigenvalues and diagonalisation A = PDP⁻¹, symmetric and positive-definite matrices, SVD, linear transformations
- **Lessons**: L09–L21 (linear algebra)
- **Why it fits**: the **authoritative, rigorous reference** for the hand-written Gaussian elimination, LU / QR / SVD and eigendecomposition in this phase. Strang explains *why* as he derives, which makes him the bridge from 3B1B's intuition to code you can actually write.

### Singular Value Decomposition (Data-Driven Science and Engineering)
- **Instructor**: Prof. Steve Brunton, University of Washington
- **Links**: https://www.youtube.com/playlist?list=PLMrJAkhIeNNSVjnsviglFoY2nXildDCcv
- **Type**: Playlist (about 7 hours) · **Level**: Intermediate → Advanced · **Language**: English · **Duration**: about 7 hours
- **Covers**: an overview of the SVD, low-rank matrix approximation, dominant correlations, image compression (in code), matrix completion, PCA and its relation to the SVD, randomised SVD
- **Lessons**: L14, L17–L18, L20 (eigenvalues and SVD, rank, matrix decompositions)
- **Why it fits**: every concept comes with **hand-written** Python / MATLAB code — almost exactly the course's "write it in NumPy and check it against a reference" workflow.

### Serrano.Academy (intuition for the maths of machine learning)
- **Instructor**: Dr. Luis Serrano (formerly Google, Apple, Udacity and Cohere; PhD in mathematics)
- **Links**: https://www.youtube.com/channel/UCgBncpylJ1kiVaPyP-PZauQ
- **Type**: Channel (with playlists on SVD/PCA, probability, softmax, Bayes and more) · **Level**: Beginner → Intermediate · **Language**: English · **Duration**: 10–30 minutes per episode
- **Covers**: SVD and image compression, principal component analysis, dot products and projection, probability and Bayes, softmax / cross-entropy, cosine similarity
- **Lessons**: L10–L21 (linear algebra), L27–L31 (probability and statistics)
- **Why it fits**: excellent at using analogies and pictures to explain SVD and softmax so well that you could rewrite them yourself — the step between 3B1B and university courses.

---

## Phase 3 · Calculus (L22–L26)

> The gradient is the steering wheel of backpropagation. See clearly here how the chain rule becomes backprop, and writing the training loop in Phase 6 will follow naturally.

### How neural networks learn: gradient descent and backpropagation calculus
- **Instructor**: Grant Sanderson (3Blue1Brown)
- **Links**: Gradient descent https://www.youtube.com/watch?v=IHZwWFHWa-w | Backpropagation calculus https://www.youtube.com/watch?v=tIeHLnjs5U8
- **Type**: Single videos ×2 (part of the Neural Networks series) · **Level**: Intermediate · **Language**: English (with captions) · **Duration**: about 21 min + 14 min
- **Covers**: the cost-function surface, the gradient as the direction of steepest descent, iterating gradient descent; how backpropagation uses the chain rule to compute gradients efficiently
- **Lessons**: L24–L25 (chain rule / gradient descent), extending to L54–L57
- **Why it fits**: the best visual explanation of "chain rule → backpropagation" there is — essential intuition before you write the training loop yourself.

### MIT 18.02 Multivariable Calculus (gradients and partial derivatives)
- **Instructor**: Prof. Denis Auroux, MIT OpenCourseWare (Fall 2007)
- **Links**: https://www.youtube.com/playlist?list=PLEAYkSg4uSQ2dvsWLz9X6ANX_U-cwtOaX
- **Type**: Full course (35 lectures) · **Level**: Intermediate · **Language**: English · **Duration**: about 30 hours
- **Covers**: partial derivatives, gradients and directional derivatives, the multivariable chain rule, Lagrange multipliers, double and triple integrals, vector calculus
- **Lessons**: L23 (gradients / partial derivatives), supporting L24–L25
- **Why it fits**: gives gradient descent and backpropagation a **rigorous multivariable-calculus foundation**; Auroux's lectures on partial derivatives and gradients turn 3B1B's intuition into something you can derive and implement.

---

## Phase 4 · Probability and statistics (L27–L31)

### StatQuest Statistics Fundamentals
- **Instructor**: Josh Starmer (StatQuest)
- **Links**: https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9
- **Type**: Playlist (about 60 episodes) · **Level**: Beginner · **Language**: English (clear delivery, with captions) · **Duration**: about 10–15 hours
- **Covers**: histograms and distributions; mean, variance and standard deviation; the normal distribution; samples and population parameters; covariance and correlation; the central limit theorem; standard error; probability vs likelihood; maximum likelihood; expected values; z-scores
- **Lessons**: L27–L31 (probability and statistics)
- **Why it fits**: its "break every method into the smallest steps" teaching style is in tune with writing things yourself; the easiest grounding for mean / variance / z-scores / sampling from distributions (L28–L29).

### Harvard Stat 110: Probability (Joe Blitzstein, full course)
- **Instructor**: Prof. Joe Blitzstein, Harvard University
- **Links**: https://www.youtube.com/playlist?list=PL2SOU6wwxB0uwwH80KTQ6ht66KWxbzTIo
- **Type**: Full course (34 lectures) · **Level**: Intermediate → Advanced · **Language**: English · **Duration**: about 28 hours
- **Covers**: probability and counting; conditional probability and independence; random variables and distributions (Bernoulli, binomial, geometric, Poisson, uniform, normal, exponential); expectation and linearity; variance and covariance; conditional expectation; inequalities; the law of large numbers and the central limit theorem
- **Lessons**: L27–L31 (probability and statistics)
- **Why it fits**: the gold standard for conditional probability, independence and the law of large numbers (L27). Blitzstein insists on reasoning step by step from definitions rather than plugging into formulas.

### StatQuest Neural Networks / Deep Learning (including softmax and cross-entropy derivatives)
- **Instructor**: Josh Starmer (StatQuest)
- **Links**: https://www.youtube.com/playlist?list=PLblh5JKOoLUIxGDQs4LFFD--41Vzf-ME1
- **Type**: Playlist · **Level**: Intermediate · **Language**: English · **Duration**: about 6–8 hours
- **Covers**: ArgMax and SoftMax, the SoftMax derivative step by step, cross-entropy, the cross-entropy derivative and backpropagation, from neural-network basics up to Transformers
- **Lessons**: L30–L31 (softmax and cross-entropy), extending to L56–L58
- **Why it fits**: derives the **softmax and cross-entropy gradients by hand, one step at a time** — exactly what L30 asks you to write and verify.

---

## Phase 5 · Audio DSP (L32–L53)

> **This phase is the audio core of the course, and the place where this library lines up most tightly.** Sampling → windows → DFT/FFT → STFT → mel → MFCC, all written by hand without librosa or scipy. The first choice is Valerio Velardo, who follows it almost lesson by lesson.

### 🥇 Audio Signal Processing for Machine Learning (a must · start here)
- **Instructor**: Valerio Velardo — The Sound of AI
- **Links**: https://www.youtube.com/playlist?list=PL-wATfeyAMNqIee7cH3q1bh4QJFAaeNv0
- **Type**: Playlist (about 24 lectures) · **Level**: Beginner → Intermediate · **Language**: English (with English captions) · **Duration**: about 12 hours in total
- **Covers**: sound waves and waveforms; time- and frequency-domain features (RMS, zero-crossing rate, spectral centroid); the Fourier transform and STFT; spectrograms; the mel scale and triangular filterbanks; mel spectrograms; the full MFCC pipeline. Each lecture runs "intuition + maths + Python implementation", with code on GitHub
- **Lessons**: L32–L53 (the whole Audio DSP phase)
- **Why it fits**: follows this phase almost lesson by lesson — the closest match anywhere to the course's audio core. FFT, STFT, mel and MFCC are all implemented by hand with no black boxes: a model of first-principles coding.

### The Sound of AI channel (standalone deep dives on mel spectrograms and MFCCs)
- **Instructor**: Valerio Velardo — The Sound of AI
- **Links**: https://www.youtube.com/channel/UCZPFjMe1uRSirmSpznqvJfQ
- **Type**: Channel (several standalone long videos) · **Level**: Intermediate · **Language**: English · **Duration**: 40–60 minutes per video
- **Covers**: standalone lectures on mel spectrograms, the cepstrum, step-by-step derivation and visualisation of MFCCs, and the physics of the vocal tract and speech production
- **Lessons**: L46–L53 (mel / MFCC)
- **Why it fits**: when explaining MFCCs it takes apart every link of "signal → STFT → mel → log → DCT" and computes it by hand, directly supporting L49–L53. ⚠️ Direct links to the individual lectures were not checked one by one; search the channel for "Mel-Frequency Cepstral Coefficients Explained Easily".

### But what is the Fourier Transform? / Fourier series (visual intuition)
- **Instructor**: 3Blue1Brown (Grant Sanderson)
- **Links**: Transform https://www.youtube.com/watch?v=spUNpyF58BY | Series https://www.youtube.com/watch?v=r6sGWTCMz2k (see also [Phase 0–1](#phase-01--maths-and-signal-intuition-l01l08))
- **Type**: Single videos ×2 · **Level**: Beginner · **Language**: English (with captions) · **Duration**: about 20 min + 25 min
- **Covers**: the geometric meaning of the twiddle factor e^{-2πift}; summing complex exponentials to approximate periodic functions
- **Lessons**: L35, L37–L42
- **Why it fits**: builds the geometric intuition for twiddle factors and complex exponentials before you write the DFT, so that Euler in L35 and the brute-force sum in L37 stop being formulas to memorise.

### Fourier Analysis [Data-Driven Science and Engineering]
- **Instructor**: Steve Brunton — University of Washington
- **Links**: https://www.youtube.com/playlist?list=PLMrJAkhIeNNT_Xh3Oy0Y4LTj0Oxo8GqsC
- **Type**: Playlist (full course) · **Level**: Intermediate · **Language**: English · **Duration**: about 8 hours / 40+ lectures
- **Covers**: Fourier series, complex Fourier series, the Fourier transform, the DFT, the FFT algorithm, the Gabor transform / spectrogram, wavelets; hands-on MATLAB + Python (denoising, differentiation, solving PDEs)
- **Lessons**: L35–L48
- **Why it fits**: a professor walks systematically through the maths and code from DFT to FFT; the DFT-matrix factorisation view guides both the O(N²) brute force of L37 and the butterfly divide-and-conquer of L38–L42.

### The Fast Fourier Transform (FFT): Most Ingenious Algorithm Ever?
- **Instructor**: Reducible
- **Links**: https://www.youtube.com/watch?v=h7apO7q16V0
- **Type**: Single video · **Level**: Intermediate · **Language**: English · **Duration**: about 28 minutes
- **Covers**: starts from polynomial multiplication; Nth roots of unity, recursive divide-and-conquer, the Cooley–Tukey butterfly and the inverse FFT, with animations that take O(N log N) apart
- **Lessons**: L38–L42
- **Why it fits**: the clearest animated answer to "why can the FFT divide and conquer?" — a direct companion to the butterfly of L38 and the from-scratch FFT of L39; the recursive structure translates straight into NumPy.

### Denoising Data with FFT [Python]
- **Instructor**: Steve Brunton — University of Washington
- **Links**: https://www.youtube.com/watch?v=s2K1JfNR7Sc
- **Type**: Single video · **Level**: Intermediate · **Language**: English · **Duration**: about 11 minutes
- **Covers**: a complete Python/NumPy demo — FFT of a noisy signal, inspecting the magnitude spectrum, thresholding by power, then inverse-transforming
- **Lessons**: L40–L42 (spectrum analysis in practice)
- **Why it fits**: an end-to-end exercise in FFT spectrum analysis with magnitude and power spectra — a good test case once your own FFT works.

### How the Cooley–Tukey FFT algorithm works (deriving the FFT step by step)
- **Instructor**: Mark Newman — Mark Newman Education
- **Links**: https://www.youtube.com/c/MarkNewmanEducation ⚠️ (direct links to the individual videos in the series were not checked; the channel was; companion articles with the same title, Parts 1–4, are on dsprelated.com)
- **Type**: Channel / multi-part series · **Level**: Intermediate → Advanced · **Language**: English · **Duration**: four parts
- **Covers**: even/odd decomposition explained by analogy with merge sort, the 2-point DFT as an add and a subtract, bit-reversal reordering, deriving the twiddle factors, all the way to a butterfly diagram you can implement
- **Lessons**: L38–L42
- **Why it fits**: takes the FFT apart to the level where you can type the code from it — ideal for implementing the FFT from scratch (search "Mark Newman Cooley-Tukey FFT").

### MIT RES.6.007 Signals and Systems (full course)
- **Instructor**: Alan V. Oppenheim — MIT OpenCourseWare
- **Links**: https://www.youtube.com/playlist?list=PL41692B571DD0AF9B
- **Type**: Full course (about 30 lectures) · **Level**: Advanced · **Language**: English · **Duration**: about 50 minutes per lecture
- **Covers**: continuous- and discrete-time signals and systems, Fourier series and transforms, sampling and reconstruction, Laplace and Z transforms
- **Lessons**: L32–L48
- **Why it fits**: taught by a founding figure of DSP and author of the classic textbook — the most authoritative theoretical foundation and notation for the course's Fourier and sampling lessons.

### MIT RES.6.007, Lecture 16: Sampling (Nyquist and aliasing)
- **Instructor**: Alan V. Oppenheim — MIT OpenCourseWare
- **Links**: https://www.youtube.com/watch?v=P3eLer1edx8
- **Type**: Single video (lecture 16 of the course) · **Level**: Advanced · **Language**: English · **Duration**: about 50 minutes
- **Covers**: impulse-train sampling, periodic replication of the spectrum, proof of the Nyquist sampling theorem, the causes of aliasing illustrated in the frequency domain, conditions for reconstruction
- **Lessons**: L33–L34 (Nyquist and aliasing)
- **Why it fits**: the authoritative derivation of the Nyquist theorem and aliasing — the theory behind L34.

---

## Phase 6 · Machine learning and deep learning (L54–L65)

> From scalar autodiff (micrograd) to PyTorch, then to a CNN audio classifier. **First choice: Karpathy's *Zero to Hero*, which lines up with L54–L58 lesson by lesson — the gold standard for writing backpropagation from scratch.**

### 🥇 Neural Networks: Zero to Hero (full course)
- **Instructor**: Andrej Karpathy (formerly OpenAI; former director of AI at Tesla)
- **Links**: https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ
- **Type**: Playlist (8 lectures) · **Level**: Beginner → Advanced · **Language**: English (with captions) · **Duration**: about 15+ hours
- **Covers**: micrograd, a scalar autodiff engine; backpropagation; makemore (bigram → MLP → BatchNorm → manual backward pass "Backprop Ninja" → WaveNet); Let's build GPT
- **Lessons**: L54–L58 (deep learning), extending to L83 (LLMs)
- **Why it fits**: the gold-standard match for first-principles, hand-written implementation — nodes, forward and backward passes and the training loop are all written from scratch, with no wrappers. **The core entry for this phase.**

### The spelled-out intro to neural networks and backpropagation: building micrograd
- **Instructor**: Andrej Karpathy
- **Links**: https://youtu.be/VMj-3S1tku0 (companions: makemore Part 2 (MLP) https://youtu.be/TCH_1BHY58I | "Backprop Ninja" https://youtu.be/q8SA3rM6ckI )
- **Type**: Single video · **Level**: Beginner · **Language**: English (with captions) · **Duration**: 2 hours 25 minutes
- **Covers**: writing a `Value` node by hand (add / mul / pow / tanh / exp), building a dynamic computation graph (DAG), applying the chain rule backwards layer by layer, deriving gradients by hand, building and training an MLP on top of micrograd
- **Lessons**: L54–L56 (the `Value` graph, completing the operators, backpropagation by hand)
- **Why it fits**: matches L54–L56 almost point for point — the most detailed "spelled-out" explanation of backpropagation there is. makemore Part 2 matches L57 (the MLP), and "Backprop Ninja" matches L56 (backprop by hand).

### Neural Networks (visual series)
- **Instructor**: Grant Sanderson (3Blue1Brown)
- **Links**: https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi
- **Type**: Playlist (4 core episodes) · **Level**: Beginner · **Language**: English (with captions) · **Duration**: about 1.5 hours
- **Covers**: what a neural network is, how gradient descent learns, the intuition of backpropagation, backpropagation calculus (the chain rule)
- **Lessons**: L56–L57
- **Why it fits**: world-class animation makes the geometry of the chain rule and backpropagation clear — the best intuition to have before deriving the backward pass by hand in L56, and a complement to Karpathy's code.

### Neural Networks / Deep Learning
- **Instructor**: StatQuest with Josh Starmer
- **Links**: https://www.youtube.com/playlist?list=PLblh5JKOoLUIxGDQs4LFFD--41Vzf-ME1
- **Type**: Playlist · **Level**: Beginner · **Language**: English (with captions) · **Duration**: about 5–6 hours (mostly 10–20-minute episodes)
- **Covers**: neural-network basics, the main idea of backpropagation, the chain rule for optimising one parameter at a time, ReLU, CNNs for image classification
- **Lessons**: L56–L58, L63
- **Why it fits**: "Backpropagation Details Pt. 1 / Pt. 2" break the hand-derived backward pass of L56 into the smallest steps; the CNN episode gives the convolution intuition behind the audio classifier of L63.

### MIT 6.S191: Introduction to Deep Learning
- **Instructor**: MIT (Alexander Amini / Ava Soleimany)
- **Links**: https://www.youtube.com/playlist?list=PLtBw6njQRU-rwp5__7C0oIVt26ZgjG9NI (course site https://introtodeeplearning.com/ )
- **Type**: Full course (updated every year) · **Level**: Beginner → Intermediate · **Language**: English (with captions) · **Duration**: about 10 lectures, 45–60 minutes each
- **Covers**: perceptrons and MLPs, backpropagation, training techniques (regularisation, diagnosing overfitting), CNNs, RNNs / Transformers, with TensorFlow / PyTorch labs
- **Lessons**: L54–L65 (overview of the whole phase)
- **Why it fits**: a top university course refreshed every year, giving L54–L65 an authoritative overall framework from MLPs to CNNs and overfitting diagnosis.

### 🥇 PyTorch for Audio + Music Processing
- **Instructor**: Valerio Velardo — The Sound of AI
- **Links**: https://www.youtube.com/playlist?list=PL-wATfeyAMNoirN4idjev6aRu8ISZYVWm (code https://github.com/musikalkemist/pytorchforaudio ; example "Training a Sound Classifier with PyTorch" https://www.youtube.com/watch?v=MMkeLjcBTcI )
- **Type**: Playlist · **Level**: Intermediate · **Language**: English (with captions) · **Duration**: about 3–4 hours
- **Covers**: a custom audio `Dataset` with torchaudio (`__getitem__`), batching with `DataLoader`, extracting mel spectrograms, resampling and mixdown, building a CNN and training a sound classifier on UrbanSound8K, the training loop
- **Lessons**: L62–L65
- **Why it fits**: overlaps heavily with L62–L65 — custom `Dataset`/`DataLoader` + mel features + CNN audio classification + the full training loop. It is practically a PyTorch blueprint for the course's keyword-spotting task.

### Learn PyTorch for Deep Learning – Full Course
- **Instructor**: Daniel Bourke (published by freeCodeCamp.org)
- **Links**: https://www.youtube.com/watch?v=V_xro1bcAuA (companion site https://www.learnpytorch.io/ | code https://github.com/mrdbourke/pytorch-deep-learning )
- **Type**: Single video (about 25 hours) / full course · **Level**: Beginner → Intermediate · **Language**: English (with captions) · **Duration**: about 25 hours
- **Covers**: PyTorch tensors, autograd and `requires_grad`, `nn.Module` / `Linear` / `Sequential`, the training loop, custom datasets, CNNs, saving and loading models
- **Lessons**: L59–L65
- **Why it fits**: covers every PyTorch topic in L59–L65; can serve as the main tutorial for the PyTorch part of the phase.

### PyTorch Tutorials — Complete Beginner Course
- **Instructor**: Patrick Loeber (now developer relations at Google DeepMind)
- **Links**: https://www.youtube.com/playlist?list=PLqnslRFeH2UrcDBWF5mfPGpqQDSta6VK4 (code https://github.com/patrickloeber/pytorchTutorial )
- **Type**: Playlist · **Level**: Beginner · **Language**: English (with captions) · **Duration**: about 4–5 hours
- **Covers**: tensor basics and converting to and from NumPy, how autograd works, `backward` and gradients, hand-written linear / logistic regression training, `nn.Module`, `Dataset` & `DataLoader`, activation functions
- **Lessons**: L59–L62
- **Why it fits**: short and focused, one concept at a time; it writes the training loop by hand first and only then wraps it in `nn` — the same "first principles, then abstraction" rhythm as the course.

### Deep Learning (for Audio) with Python
- **Instructor**: Valerio Velardo — The Sound of AI
- **Links**: Channel https://www.youtube.com/@ValerioVelardoTheSoundofAI (code https://github.com/musikalkemist/DeepLearningForAudioWithPython ) ⚠️ the playlist's direct link was not checked; open "Playlists" on the channel and choose "Deep Learning (For Audio) With Python"
- **Type**: Playlist · **Level**: Beginner → Intermediate · **Language**: English (with captions) · **Duration**: about 5–6 hours
- **Covers**: neurons and backpropagation written from scratch → sound, waveforms, Fourier, STFT, mel spectrograms, MFCCs → MLP / CNN / RNN-LSTM music-genre classification
- **Lessons**: L54–L56, L63–L64
- **Why it fits**: the first episodes write neurons and backpropagation from scratch (echoing L54–L56); the second half covers mel / MFCC features and CNN classification (echoing L63–L64), joining hand-written ML to audio AI.

### Practical Deep Learning for Coders 2022
- **Instructor**: Jeremy Howard (fast.ai)
- **Links**: https://www.youtube.com/playlist?list=PLfYUBJiXbdtSvpQjSnJJ_PmDQB_VyT5iU (course site https://course.fast.ai/ )
- **Type**: Full course (9 lectures) · **Level**: Beginner → Intermediate · **Language**: English (with captions) · **Duration**: about 90 minutes per lecture
- **Covers**: training and deploying models, implementing an MLP and backpropagation from scratch ("starting from matrix multiplication"), the SGD training loop, CNNs, diagnosing overfitting
- **Lessons**: L57–L65
- **Why it fits**: complements Karpathy with an engineer's "get it running, then open it up" view; implements the network and training loop from scratch, matching L57–L58 and extending to the full train-and-evaluate loop.

### Machine Learning Specialization / DeepLearning.AI
- **Instructor**: Andrew Ng (Stanford / DeepLearning.AI)
- **Links**: https://www.youtube.com/playlist?list=PLkDaE6sCZn6FNC6YRfRQc_FbeQrF8BwGI (channel https://www.youtube.com/c/deeplearningai )
- **Type**: Playlist / full course · **Level**: Beginner · **Language**: English (with captions) · **Duration**: tens of hours
- **Covers**: neural-network and deep-learning basics, forward and backward propagation, from logistic regression to deep networks, gradient descent, hyperparameters and regularisation
- **Lessons**: L54–L58
- **Why it fits**: the classic, authoritative introduction; explains MLPs, forward/backward passes and convergence very steadily — a good theoretical companion to Karpathy's implementation.

---

## Phase 7 · Speech recognition (L66–L75)

> From edit distance and WER, through the CTC forward algorithm, to the Whisper architecture and beam search. **First choice for the CTC forward-algorithm maths: CMU 11-785. For the whole ASR landscape: Stanford CS224S.**

### 🥇 CMU 11-785 Introduction to Deep Learning — CTC / Seq2Seq
- **Instructor**: Bhiksha Raj, Rita Singh (Carnegie Mellon University)
- **Links**: Channel https://www.youtube.com/channel/UC8hYZGEkI2dDO8scT8C5UQA | course site https://www.cs.cmu.edu/~bhiksha/courses/deeplearning/ | CTC lecture https://www.youtube.com/watch?v=5Rj0J9AuGw0
- **Type**: Topic lectures from a full course · **Level**: Intermediate → Advanced · **Language**: English · **Duration**: about 80 minutes per lecture
- **Covers**: step-by-step derivation of the CTC forward–backward algorithm, the blank symbol, summing over paths, CTC beam search; seq2seq / attention alignment
- **Lessons**: L68–L69 (CTC alignment + the forward algorithm)
- **Why it fits**: of all university lectures, the most solid mathematical derivation of the CTC forward algorithm — exactly the target of the course's "CTC forward pass in pure NumPy", and you can implement straight from it.

### Whisper Paper Explained — Robust Speech Recognition via Large-Scale Weak Supervision
- **Instructor**: Aladdin Persson (known for "from scratch" implementations)
- **Links**: Channel https://www.youtube.com/@AladdinPersson | search: "Aladdin Persson Whisper Paper Explained" ⚠️ the exact URL of the single video was not checked (about 33 minutes)
- **Type**: Single video (paper walkthrough) · **Level**: Intermediate · **Language**: English · **Duration**: about 33 minutes
- **Covers**: the Whisper architecture (log-mel + conv + encoder–decoder), 680,000 hours of weakly supervised data, zero-shot evaluation, long-form transcription
- **Lessons**: L70–L71 (Whisper architecture + decoding)
- **Why it fits**: from a "from scratch" educator who ties the paper to engineering trade-offs — a cost-effective way into the reasons behind Whisper's design.

### Reusing a decoder for Whisper: Let's build GPT (Karpathy)
- **Instructor**: Andrej Karpathy
- **Links**: https://www.youtube.com/watch?v=kCc8FmEb1nY (code https://github.com/karpathy/build-nanogpt ; full description in [Phase 9](#phase-9--llms-rag-and-agents-l83l91))
- **Type**: Single video · **Level**: Intermediate · **Language**: English · **Duration**: about 1 hour 56 minutes
- **Covers**: a Transformer decoder written from scratch (self-attention, causal mask, autoregressive generation)
- **Lessons**: L70 (Whisper's decoder)
- **Why it fits**: Whisper is an encoder–decoder Transformer; its GPT-style decoder can reuse the hand-written implementation from this video, with an audio encoder and cross-attention added on top.

### wav2vec 2.0 paper walkthrough
- **Instructor**: Yannic Kilcher
- **Links**: https://www.youtube.com/watch?v=aUSXvoWfy3w (title checked: "wav2vec 2.0: A Framework for Self-Supervised Learning of Speech Representations"; channel https://www.youtube.com/c/YannicKilcher )
- **Type**: Single video (section-by-section paper reading) · **Level**: Advanced · **Language**: English · **Duration**: about 50 minutes
- **Covers**: self-supervised speech representations, latent masking, contrastive loss, product quantization, beating semi-supervised methods after fine-tuning
- **Lessons**: L72 (extension: self-supervised pre-training)
- **Why it fits**: Yannic's signature paper reading makes the intuition of self-supervised pre-training clear — an authoritative walkthrough for going beyond Whisper fine-tuning to wav2vec 2.0.

### Hugging Face Audio Course + fine-tuning Whisper in practice
- **Instructor**: Hugging Face (Sanchit Gandhi and others)
- **Links**: Course https://huggingface.co/learn/audio-course | CTC chapter https://huggingface.co/learn/audio-course/chapter3/ctc | fine-tuning Whisper https://huggingface.co/blog/fine-tune-whisper
- **Type**: Full course + hands-on notebooks (**free official course, not on YouTube**) · **Level**: Beginner → Intermediate · **Language**: English · **Duration**: self-paced
- **Covers**: CTC architectures (Wav2Vec2 / HuBERT), the Whisper encoder–decoder, fine-tuning whisper-small on Common Voice / LibriSpeech, WER evaluation
- **Lessons**: L69, L72 (fine-tuning Whisper-small)
- **Why it fits**: lines up directly with L72's Whisper fine-tuning; the CTC chapter explains the difference between the encoder-only + CTC route and Whisper's end-to-end route, and it is the closest to hands-on practice.

### Stanford CS224S — Spoken Language Processing
- **Instructor**: Stanford (in the Dan Jurafsky tradition, with recent guest lectures on LLMs and speech)
- **Links**: Course site https://web.stanford.edu/class/cs224s/ | Stanford Online https://online.stanford.edu/courses/cs224s-spoken-language-processing | end-to-end speech lecture (with CTC) https://www.youtube.com/watch?v=3MjIkWxXigM
- **Type**: Full course (some public lectures + course notes) · **Level**: Intermediate → Advanced · **Language**: English · **Duration**: one semester
- **Covers**: WER evaluation, HMM-GMM, CTC / attention end-to-end models, decoding strategies, the whole landscape of spoken-language processing
- **Lessons**: L66–L75
- **Why it fits**: a complete university course on spoken language processing, covering WER → CTC → end-to-end systematically; its notes can scaffold the whole phase. (Note: most full lecture videos are only on the enrolled students' Canvas; only some lectures are public on YouTube.)

### Valerio Velardo — Deep Learning for Audio / building an ASR system
- **Instructor**: Valerio Velardo (The Sound of AI)
- **Links**: Channel https://www.youtube.com/channel/UCZPFjMe1uRSirmSpznqvJfQ | Deep Learning (For Audio) with Python playlist https://www.youtube.com/playlist?list=PL-wATfeyAMNrtbkCNsLcpoAyBBRJZVlnf
- **Type**: Playlist · **Level**: Beginner → Intermediate · **Language**: English · **Duration**: about 15–18 videos
- **Covers**: audio features (mel spectrogram / MFCC), CNN / RNN acoustic modelling, building a speech-recognition app from design to deployment
- **Lessons**: L63, L66 (audio front end + acoustic modelling)
- **Why it fits**: the "intuition + maths + code" format fills in the first-principles audio front end that the ASR phase relies on.

### University of Edinburgh — Automatic Speech Recognition (ASR)
- **Instructor**: Steve Renals, Hiroshi Shimodaira (University of Edinburgh, CSTR)
- **Links**: Course site https://www.inf.ed.ac.uk/teaching/courses/asr/ | HMM-GMM notes https://www.inf.ed.ac.uk/teaching/courses/asr/2018-19/asr03-hmmgmm-handout.pdf
- **Type**: Full course (**public slides / PDF notes**; videos are for enrolled students) · **Level**: Advanced · **Language**: English · **Duration**: 18 lectures
- **Covers**: HMM-GMM acoustic models, Viterbi decoding, WFSTs, hybrid DNN-HMM, and the evolution to end-to-end models (CTC / attention)
- **Lessons**: L66 (classical pipelines vs end-to-end)
- **Why it fits**: the most authoritative public material on the evolution from HMM-GMM to DNN-HMM to end-to-end — exactly the "end-to-end vs classical pipeline" comparison of L66.

### AssemblyAI — intuitive explanations of speech recognition and Whisper
- **Instructor**: AssemblyAI (an industry speech-API team, educational content)
- **Links**: Channel https://www.youtube.com/@assemblyai | search: "AssemblyAI Whisper how it works"
- **Type**: Channel / series of short videos · **Level**: Beginner · **Language**: English · **Duration**: about 10–20 minutes per episode
- **Covers**: intuition for the ASR pipeline, how Whisper works, CTC vs seq2seq, real-time / streaming transcription concepts
- **Lessons**: L66, L70 (introduction + Whisper)
- **Why it fits**: light, big-picture intuition — a warm-up for the ASR overview in L66 and Whisper in L70 before diving into CMU and Stanford.

> **About L67 (edit distance) and L73 (WER)**: Levenshtein distance and WER are a classic two-dimensional dynamic programme. Stanford CS224S and the Hugging Face Audio Course both explain WER evaluation. If you only need the DP, just write it in the notebook — no video required.

---

## Phase 8 · Music understanding / MIR (L76–L82)

> Chroma, onsets, beat tracking, music embeddings, similarity search. **The authoritative first choice is Meinard Müller (FMP) — with open-source notebooks, the gold-standard reference for writing it yourself from first principles.**

### Audio Signal Processing for Machine Learning (feature groundwork)
- **Instructor**: Valerio Velardo — The Sound of AI
- **Links**: https://www.youtube.com/playlist?list=PL-wATfeyAMNqIee7cH3q1bh4QJFAaeNv0 (full description in [Phase 5](#phase-5--audio-dsp-l32l53))
- **Type**: Playlist · **Level**: Beginner → Intermediate · **Language**: English · **Duration**: about 8–10 hours
- **Lessons**: L77–L78 (feature groundwork)
- **Why it fits**: the feature-extraction groundwork you need before chromagrams and onsets; fully in line with the course's "audio features written in NumPy" approach.

### 🥇 Music Processing using Chroma Features
- **Instructor**: Meinard Müller — AudioLabs Erlangen (author of *Fundamentals of Music Processing*)
- **Links**: https://www.youtube.com/watch?v=PF05xP1NqUM (open-source FMP notebooks https://www.audiolabs-erlangen.de/FMP )
- **Type**: Single video (companion to FMP) · **Level**: Beginner → Intermediate · **Language**: English · **Duration**: short
- **Covers**: pitch classes and chroma, mapping a spectrum to a chromagram, the role of chroma in chord recognition and music synchronisation / alignment
- **Lessons**: L76–L77 (chroma)
- **Why it fits**: from the authority in MIR and author of the FMP textbook. Pair it with his open-source **FMP notebooks** (pure Python / Jupyter reference implementations) — the gold-standard reference for writing it yourself.

### 🥇 Tempo and Beat Tracking
- **Instructor**: Meinard Müller — AudioLabs Erlangen
- **Links**: https://www.youtube.com/watch?v=FmwpkdcAXl0 (FMP chapter C6 notebook)
- **Type**: Single video (companion to FMP) · **Level**: Intermediate · **Language**: English · **Duration**: short
- **Covers**: onset detection and spectral novelty (the onset envelope), pulse / periodicity analysis, the core ideas of tempo estimation and beat tracking
- **Lessons**: L78 (onset envelope + beat tracking)
- **Why it fits**: maps directly onto L78, making the chain "onset envelope → autocorrelation / novelty → beats" clear; with the FMP C6 notebook you can reproduce it by hand step by step.

### Learn Music Theory in Half an Hour
- **Instructor**: Andrew Huang
- **Links**: https://www.youtube.com/watch?v=rgaTLrZGlk0
- **Type**: Single video · **Level**: Beginner · **Language**: English · **Duration**: about 30 minutes
- **Covers**: notes, octaves, semitones and whole tones, scales and intervals, how chords are built — intuition for how pitch is organised in twelve-tone equal temperament
- **Lessons**: L76 (pitch classes / the chroma wheel / MIDI ↔ Hz)
- **Why it fits**: supplies the music-theory intuition for L76, helping readers with a pure engineering background see why chroma folds everything into 12 pitch classes.

### Generating Sound with Neural Networks (generating sound with a VAE)
- **Instructor**: Valerio Velardo — The Sound of AI
- **Links**: https://www.youtube.com/playlist?list=PL-wATfeyAMNpEyENTc-tVH5tfLGKtSWPp
- **Type**: Playlist · **Level**: Intermediate · **Language**: English · **Duration**: about 5–6 hours
- **Covers**: from autoencoders to variational autoencoders (VAEs), principles and hand-written implementation; learning a latent representation (embedding) in the mel-spectrogram domain and reconstructing / generating audio
- **Lessons**: L79 (music embedding models)
- **Why it fits**: a music encoder is, at heart, a way of squeezing audio into an embedding space. This series implements the VAE encoder / decoder and latent space line by line — the closest hands-on bridge to understanding music embeddings.

### C4W4L04 Triplet Loss
- **Instructor**: Andrew Ng — DeepLearning.AI
- **Links**: https://www.youtube.com/watch?v=d2XB5-tuCWU
- **Type**: Single video · **Level**: Intermediate · **Language**: English · **Duration**: about 15 minutes
- **Covers**: anchor / positive / negative triplets, the margin, the embedding objective that pulls same-class items together and pushes different-class items apart (the FaceNet idea)
- **Lessons**: L79 (triplet loss)
- **Why it fits**: the classic explanation of triplet loss from an authoritative teacher; the loss is exactly the one used to train a music encoder with triplets, and the formula transfers directly to NumPy.

### SimCLR Explained (NT-Xent contrastive learning)
- **Instructor**: Yannic Kilcher
- **Links**: https://www.youtube.com/watch?v=7Id8SPH31UE
- **Type**: Single video · **Level**: Intermediate · **Language**: English · **Duration**: about 14–16 minutes
- **Covers**: positive and negative pairs, data augmentation, the NT-Xent loss (temperature-scaled normalised cross-entropy), in-batch negatives
- **Lessons**: L79 (NT-Xent contrastive learning)
- **Why it fits**: lines up directly with NT-Xent in L79, taking the SimCLR contrastive objective down to the formula, so you can see how to write the contrastive branch of a music embedding yourself.

### Recommendation Systems using Nearest Neighbors (k-NN recommendation)
- **Instructor**: Krish Naik
- **Links**: https://www.youtube.com/watch?v=kccT0FVK6OY
- **Type**: Single video (tutorial) · **Level**: Beginner → Intermediate · **Language**: English · **Duration**: about 20 minutes
- **Covers**: nearest-neighbour similarity search, user / item similarity, the workflow for top-k recommendation with k-NN
- **Lessons**: L80–L81 (similarity search + recommendation)
- **Why it fits**: maps directly onto L80–L81's "pure k-NN similarity search + recommendation"; compare it with your own NumPy cosine similarity + top-k (note: a community tutorial, useful as a practical reference).

### MusicGen Paper Explained (Meta's music generation)
- **Instructor**: AI Bites
- **Links**: https://www.youtube.com/watch?v=cbAa7kart-4
- **Type**: Single video (paper walkthrough) · **Level**: Advanced · **Language**: English · **Duration**: about 13 minutes
- **Covers**: the EnCodec codec, residual vector quantization (RVQ), codebook interleaving patterns, text / melody-conditioned generation, the single-language-model architecture
- **Lessons**: Extension beyond L82 (music generation with MusicGen)
- **Why it fits**: explains the core mechanism of "audio → discrete tokens → language-model generation" — a cost-effective way into the modern music-generation paradigm.

### How Shazam Works (Probably!) (audio fingerprinting)
- **Instructor**: David Domminney Fowler — Computerphile
- **Links**: https://www.youtube.com/watch?v=RRsq9apr5QY
- **Type**: Single video · **Level**: Intermediate · **Language**: English · **Duration**: about 14 minutes
- **Covers**: FFT / spectrogram peak picking, the constellation map, hashing pairs of peaks into fingerprints, matching against a database
- **Lessons**: Extension of L80 (audio fingerprinting / exact-match retrieval)
- **Why it fits**: explains Shazam's fingerprinting algorithm well enough to reproduce — a second, "exact-match" approach to retrieval alongside similarity search.

> **Main code-level MIR reference**: Meinard Müller's [FMP notebooks](https://www.audiolabs-erlangen.de/FMP) and the [ISMIR 2019 FMP tutorial](https://www.audiolabs-erlangen.de/resources/MIR/2019_TutorialFMP_ISMIR/) (a full set of Jupyter notebooks on chroma, onsets, beats and structure analysis) are recommended as the main code-level reference for L77–L78, alongside the videos above.

---

## Phase 9 · LLMs, RAG and agents (L83–L91)

> Transformer → LoRA → KV cache → sampling → quantization → TF-IDF / RAG → agents. **First choice: Karpathy's *Let's build GPT* for the big picture, then Umar Jamil coding KV cache / LoRA / quantization / RAG from scratch in PyTorch, line by line.**

### 🥇 Let's build GPT: from scratch, in code, spelled out
- **Instructor**: Andrej Karpathy
- **Links**: Video https://www.youtube.com/watch?v=kCc8FmEb1nY | full course playlist https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ
- **Type**: Single video (part of a full course) · **Level**: Intermediate · **Language**: English · **Duration**: about 1 h 56 min
- **Covers**: writing and training a Transformer line by line from scratch (bigram baseline → self-attention → multi-head → positional encoding → residuals / LayerNorm / FFN), ending with the core of nanoGPT
- **Lessons**: L83–L84
- **Why it fits**: the classic "write GPT starting from an empty file"; every matrix operation is explained, in complete agreement with the course's "no wrappers, write attention yourself". **Watch this first.**

### Let's reproduce GPT-2 (124M)
- **Instructor**: Andrej Karpathy
- **Links**: https://www.youtube.com/watch?v=l8pRSuU81PU
- **Type**: Single video · **Level**: Advanced · **Language**: English · **Duration**: about 4 hours
- **Covers**: reproducing GPT-2 from an empty file: building the network → loading weights → optimising training (mixed precision, gradient accumulation, learning-rate schedules) → sampling / evaluation
- **Lessons**: L83–L87
- **Why it fits**: carries the hand-written Transformer of L83 all the way to real pre-training and inference-time sampling — an industrial-grade reference for the KV cache and sampling of L85–L86 and the inference of L87.

### Let's build the GPT Tokenizer
- **Instructor**: Andrej Karpathy
- **Links**: https://www.youtube.com/watch?v=zduSFxRajkE
- **Type**: Single video · **Level**: Intermediate · **Language**: English · **Duration**: about 2 h 13 min
- **Covers**: implementing a BPE (byte-pair encoding) tokenizer from scratch: Unicode / byte encoding, training, encode / decode, regex splitting
- **Lessons**: L87 (preparing input for local inference)
- **Why it fits**: tokenization is a separate and easily overlooked part of an LLM; writing BPE by hand is first principles through and through.

### Deep Dive into LLMs like ChatGPT
- **Instructor**: Andrej Karpathy
- **Links**: https://www.youtube.com/watch?v=7xTGNNLPyMI
- **Type**: Single video · **Level**: Beginner → Intermediate · **Language**: English · **Duration**: about 3 h 31 min
- **Covers**: a mental model of the full LLM training stack: pre-training / tokenization / architecture → SFT → RLHF, including hallucination, tool use and knowledge representation
- **Lessons**: L83–L91 (the whole chain)
- **Why it fits**: few formulas, lots of big picture — builds an end-to-end understanding before and after you write each module, and ties L83–L91 together (including the motivation for RAG and agents).

### Neural Networks · Chapters 5–7 (Transformers and attention, visualised)
- **Instructor**: 3Blue1Brown (Grant Sanderson)
- **Links**: Playlist https://www.youtube.com/playlist?list=PLZZWrBYkx7Otcjr3eCLZDCgfpqnxMY29s | Ch5 Transformers https://www.youtube.com/watch?v=wjZofJX0v4M | Ch6 Attention https://www.youtube.com/watch?v=eMlx5fFNoYc
- **Type**: Playlist (episodes stand alone) · **Level**: Beginner → Intermediate · **Language**: English (with captions) · **Duration**: about 26–27 minutes per episode
- **Covers**: word embeddings and the data flow of a Transformer (Ch5), attention and Q/K/V visualised step by step (Ch6), the MLP / how facts are stored
- **Lessons**: L83, L91
- **Why it fits**: the clearest visual intuition for the geometry of attention — build the intuition first, then write it in NumPy. The "you can see it" version of L83's self-attention and multi-head attention, and a model for L91's attention plots.

### 🥇 Coding a Transformer from scratch on PyTorch
- **Instructor**: Umar Jamil
- **Links**: https://www.youtube.com/watch?v=ISNdQcPhsts | channel https://www.youtube.com/@umarjamilai
- **Type**: Single video · **Level**: Intermediate · **Language**: English · **Duration**: about 3 hours
- **Covers**: writing a complete encoder–decoder Transformer layer by layer (input embeddings, positional encoding, multi-head self-attention, projection layer) + training on a translation task + visualising attention
- **Lessons**: L83, L91
- **Why it fits**: the benchmark of the "code it from scratch" approach — line-by-line PyTorch checked against the paper, very close to the course's philosophy (the rest of his from-scratch series is on the same channel).

### LoRA: Low-Rank Adaptation — explanation + PyTorch implementation from scratch
- **Instructor**: Umar Jamil
- **Links**: https://www.youtube.com/watch?v=PXWYUTMt-AU
- **Type**: Single video · **Level**: Intermediate · **Language**: English · **Duration**: about 26 minutes
- **Covers**: the maths of LoRA (frozen weights + a low-rank B·A update) + a from-scratch PyTorch implementation on MNIST
- **Lessons**: L84 (LoRA)
- **Why it fits**: hits L84 directly — explains the low-rank intuition first and then writes it, making it easy to reproduce in NumPy.

### Coding LLaMA 2 from scratch (KV cache / RoPE / GQA / RMSNorm)
- **Instructor**: Umar Jamil
- **Links**: https://www.youtube.com/watch?v=oM4VmoabDAI
- **Type**: Single video · **Level**: Advanced · **Language**: English · **Duration**: about 3 hours
- **Covers**: writing LLaMA 2 from scratch: KV cache, rotary positional embeddings, grouped-query attention, RMSNorm, SwiGLU, plus sampling strategies (greedy / beam / temperature / top-k / top-p)
- **Lessons**: L85–L86 (KV cache + sampling strategies)
- **Why it fits**: the best single source for L85's KV cache and L86's sampling strategies; the line-by-line implementation gives a clear blueprint for a NumPy KV cache.

### Quantization explained with PyTorch (PTQ / QAT)
- **Instructor**: Umar Jamil
- **Links**: https://www.youtube.com/watch?v=0VdNflU08yA
- **Type**: Single video · **Level**: Intermediate → Advanced · **Language**: English · **Duration**: about 1 h 39 min
- **Covers**: integer and floating-point representation, symmetric / asymmetric quantization, quantization range and granularity, dynamic / static quantization, PTQ and QAT, hardware acceleration with GPU MAC units
- **Lessons**: L87 (INT8 quantization from scratch)
- **Why it fits**: the theory and implementation behind L87; takes "scale / zero point / rounding" all the way down to the hardware, supporting a hand-written quantization kernel.

### Retrieval Augmented Generation (RAG) Explained
- **Instructor**: Umar Jamil
- **Links**: https://www.youtube.com/watch?v=rhZgXNdhWDY
- **Type**: Single video · **Level**: Intermediate · **Language**: English · **Duration**: about 35 minutes
- **Covers**: the full RAG pipeline: embeddings, Sentence-BERT, vector databases and HNSW nearest-neighbour search, retrieving into the prompt and generating
- **Lessons**: L88–L90
- **Why it fits**: explains every link of RAG (chunk → index → retrieve → build the prompt → generate). Swap its vector search for the course's hand-written TF-IDF / cosine similarity and you see exactly how the ideas map.

### Transformers and Attention, Clearly Explained
- **Instructor**: StatQuest with Josh Starmer
- **Links**: Transformer https://www.youtube.com/watch?v=zxQyTK8quyY | Attention https://www.youtube.com/watch?v=PSs6nxngL6k
- **Type**: Single videos (a series on the same channel) · **Level**: Beginner · **Language**: English · **Duration**: about 36 min / 16 min
- **Covers**: word embeddings, positional encoding, self-attention, encoder–decoder and parallel computation, plus a separate video on the attention mechanism
- **Lessons**: L83
- **Why it fits**: very slow and very clear — the first choice for building intuition from zero before writing L83, and together with Karpathy it forms an "intuition → implementation" ladder.

### The maths of attention (Serrano.Academy)
- **Instructor**: Luis Serrano (formerly Google and Apple; former head of ML at Udacity)
- **Links**: Playlists https://www.youtube.com/@SerranoAcademy/playlists | the maths in detail https://www.youtube.com/watch?v=g2BRIuln4uc
- **Type**: Playlist (a trilogy) · **Level**: Beginner → Intermediate · **Language**: English · **Duration**: about 20–38 minutes per episode
- **Covers**: embeddings, similarity, the Keys / Queries / Values matrices and the derivation of attention, building up to the Transformer over three episodes
- **Lessons**: L83
- **Why it fits**: analogies and diagrams make the linear algebra of Q/K/V clear — the mathematical step between 3B1B's intuition and your own implementation.

### The Narrated Transformer Language Model
- **Instructor**: Jay Alammar (author of "The Illustrated Transformer"; Cohere)
- **Links**: https://www.youtube.com/watch?v=sMPq4cVS4kg
- **Type**: Single video · **Level**: Beginner → Intermediate · **Language**: English · **Duration**: about 30 minutes
- **Covers**: a visual narration of the components of a Transformer language model: tokenization, embeddings, self-attention, the feed-forward network, the output projection
- **Lessons**: L83
- **Why it fits**: the talk version of *The Illustrated Transformer*; intuitive diagrams make it a classic companion to L83's architecture overview.

### Attention Is All You Need (paper walkthrough)
- **Instructor**: Yannic Kilcher
- **Links**: https://www.youtube.com/watch?v=iDulhoQ2pro
- **Type**: Single video · **Level**: Advanced · **Language**: English · **Duration**: about 27 minutes
- **Covers**: a section-by-section reading of the original Vaswani et al. (2017) paper: the attention-only architecture, positional encoding, multi-head attention, the motivation for dropping RNNs / CNNs, and the experiments
- **Lessons**: L83
- **Why it fits**: back to the primary source — the original paper — so you can check every design decision of your implementation against it.

---

## Phase 10 · Integration, MLOps and interviews (L92–L99)

> From the mic → ASR → LLM pipeline, through W&B / Docker / CI-CD, to the evidence chain of "from demo to product" and research-engineer interviews. **First choice: Full Stack Deep Learning + Made With ML + Weights & Biases' own material.**

### 🥇 Full Stack Deep Learning — 2022 course
- **Instructor**: Josh Tobin, Sergey Karayev, Charles Frye (UC Berkeley alumni, FSDL)
- **Links**: https://www.youtube.com/playlist?list=PL1T8fO7ArWleMMI8KPJ_5D5XSlovTW_Ur (course site https://fullstackdeeplearning.com/course/2022/ )
- **Type**: Full course (12 lectures + labs) · **Level**: Intermediate · **Language**: English · **Duration**: 15–20 hours
- **Covers**: the full stack of a DL product — training infrastructure and tooling, data management and versioning, deploying models as web services, monitoring, ML teams and project management, "from demo to product"
- **Lessons**: L92–L94 (the whole course is a methodological blueprint for the Aurora v1 capstone)
- **Why it fits**: widely regarded as the authoritative course on going "from model to product", directly matching L94's "Aurora v1 demo + evidence chain" and a live demo deployed in the cloud. **The first entry for this phase.**

### Made With ML — MLOps Course
- **Instructor**: Goku Mohandas (Made With ML / Anyscale)
- **Links**: https://madewithml.com/courses/mlops/ (code https://github.com/GokuMohandas/mlops-course | videos https://www.youtube.com/playlist?list=PLqy_sIcckLC2jrxQhyqWDhL_9Uwxz8UFq )
- **Type**: Full course (website + GitHub + YouTube) · **Level**: Intermediate · **Language**: English · **Duration**: self-paced
- **Covers**: production ML design → data → models (training / tracking / tuning / evaluation / serving) → testing (code, data, models) → reproducibility and versioning → CI/CD → monitoring
- **Lessons**: L93–L94
- **Why it fits**: one of the most popular open-source MLOps courses on GitHub; turns a "first-principles, hand-written system" into proper engineering practice (tests, CI/CD, monitoring) and supplies a reusable code skeleton beyond FSDL.

### Weights & Biases — official channel and courses
- **Instructor**: Weights & Biases (official)
- **Links**: Channel https://www.youtube.com/channel/UCBp3w4DCEC64FZr4k9ROxig | official courses https://wandb.ai/site/courses/
- **Type**: Channel + full courses · **Level**: Beginner → Intermediate · **Language**: English · **Duration**: 5–30 minutes per video
- **Covers**: experiment tracking, logging metrics and models, dataset versioning, hyperparameter sweeps, model evaluation and collaborative reproducibility
- **Lessons**: L93 (experiment tracking)
- **Why it fits**: L93 uses W&B by name; first-hand official tutorials make your training experiments traceable and reproducible, directly supporting L94's evidence chain.

### Build a Fully Local AI Voice Assistant (STT + LLM + TTS)
- **Instructor**: Independent tutorial (⚠️ channel name not checked; title and content checked)
- **Links**: https://www.youtube.com/watch?v=2IffgzB8USw (fallback search: "fully local AI voice assistant Whisper TTS")
- **Type**: Single video · **Level**: Beginner → Intermediate · **Language**: English · **Duration**: about 30–60 minutes
- **Covers**: a fully local voice assistant with no cloud APIs — Whisper STT + a local LLM + TTS, with a Python orchestrator running the mic → ASR → LLM → TTS loop, and a discussion of latency
- **Lessons**: L92, aurora.realtime (the real-time mic → ASR → LLM → TTS pipeline)
- **Why it fits**: a minimal working implementation with the same shape as L92 and aurora.realtime, naturally on the "no wrappers" path; a starting baseline from which to cut latency layer by layer toward a <500 ms target.

### freeCodeCamp — Docker Tutorial for Beginners
- **Instructor**: freeCodeCamp.org
- **Links**: https://www.youtube.com/watch?v=fqMOX6JJhGo
- **Type**: Single video (full course) · **Level**: Beginner · **Language**: English · **Duration**: about 2 hours
- **Covers**: containers vs virtual machines, Dockerfiles and building images, Docker Hub, networking and volumes, multi-container orchestration with Docker Compose
- **Lessons**: L93 (packaging with Docker)
- **Why it fits**: prepares you to package the real-time and serving components into reproducible images, and from there to deploy on cloud GPUs.

### MLOps Tutorial #1 — CI/CD for ML pipelines with GitHub Actions
- **Instructor**: DVCorg / Iterative (the DVC team)
- **Links**: https://www.youtube.com/watch?v=9I8X-3HIErc
- **Type**: Single video (first in a series) · **Level**: Intermediate · **Language**: English · **Duration**: about 20–40 minutes
- **Covers**: continuous integration for ML pipelines with GitHub Actions — tests triggered by pull requests, automatic training / evaluation runs, posting metrics back to the PR, deployment after merge
- **Lessons**: L93 (CI/CD)
- **Why it fits**: focused on CI/CD for ML specifically (not generic DevOps), turning Made With ML's concepts into concrete GitHub Actions workflows.

### A Practical Tutorial on Building ML Demos with Gradio
- **Instructor**: Abubakar Abid (creator of Gradio / Hugging Face)
- **Links**: https://www.youtube.com/watch?v=97KxA1r184o
- **Type**: Single video · **Level**: Beginner · **Language**: English · **Duration**: about 1 hour
- **Covers**: building interactive demos and web interfaces in pure Python, audio / text input components, share links, hosting on Spaces
- **Lessons**: L94 (live demo)
- **Why it fits**: explained first-hand by its creator; the least-effort route to L94's live Aurora v1 demo. Native microphone / audio support means it can wrap the real-time pipeline directly.

### How to Deploy ML Models with FastAPI, Docker and Fly.io
- **Instructor**: Independent tutorial
- **Links**: https://www.youtube.com/watch?v=jzGzw98Eikk
- **Type**: Single video (end to end) · **Level**: Intermediate · **Language**: English · **Duration**: about 30–50 minutes
- **Covers**: the whole chain of wrapping a model in a FastAPI inference service, containerising it, and deploying to Fly.io to get a public URL
- **Lessons**: L93–L94, serving aurora.realtime
- **Why it fits**: produces exactly the "live demo URL in the cloud" that L94 needs; FastAPI + Docker is the mainstream stack for serving a real-time back end.

### Enable Model Quantization for ONNX and TensorRT
- **Instructor**: Nicolai Nielsen
- **Links**: https://www.youtube.com/watch?v=phmFvMOHt4I ⚠️ (title confirmed by search; content not checked frame by frame)
- **Type**: Single video · **Level**: Advanced · **Language**: English · **Duration**: about 15–30 minutes
- **Covers**: trained model → ONNX export → building a TensorRT engine with INT8 / FP8 calibration, for low-latency, high-throughput GPU inference
- **Lessons**: L94 (deployment optimisation), aurora.realtime (<500 ms latency budget)
- **Why it fits**: to get the real-time pipeline under 500 ms, quantization plus ONNX / TensorRT is a key engineering lever for speeding up ASR / TTS models.

### Machine Learning System Design Interview — Hello Interview
- **Instructor**: Hello Interview (senior engineers and hiring managers from large tech companies)
- **Links**: Channel https://www.youtube.com/@hello_interview | guide https://www.hellointerview.com/learn/ml-system-design
- **Type**: Channel + companion course · **Level**: Intermediate → Advanced · **Language**: English · **Duration**: 20–60 minutes per video
- **Covers**: a framework for ML system design, classic recommendation / retrieval / ranking questions, real mock interviews with feedback, translating a business problem into an ML solution
- **Lessons**: L96–L97 (ML / system-design interviews)
- **Why it fits**: core interview preparation for L96–L97. "Framework + mock + feedback" targets the ML system-design round of research-engineer interviews, and your own Aurora project makes good design material.

### NeetCode — coding / whiteboard interviews + roadmap
- **Instructor**: Navdeep Singh (former Google / Amazon engineer)
- **Links**: Channel https://www.youtube.com/c/neetcode | roadmap https://neetcode.io/roadmap
- **Type**: Channel + structured roadmap · **Level**: Beginner → Advanced · **Language**: English · **Duration**: 410+ videos
- **Covers**: NeetCode 150 / Blind 75 organised by pattern (two pointers, sliding window, trees, graphs, DP…), each with a clean explanation of the idea and the code
- **Lessons**: L96 (whiteboard / coding interviews)
- **Why it fits**: the de facto standard for algorithm and whiteboard interviews, directly supporting the coding round practised in L96.

> **About L95 (reading research papers)**: there is no dedicated L95 video here. Yannic Kilcher's section-by-section paper walkthroughs in this library — [wav2vec 2.0](#wav2vec-20-paper-walkthrough), [SimCLR](#simclr-explained-nt-xent-contrastive-learning), [Attention Is All You Need](#attention-is-all-you-need-paper-walkthrough) and [EATS](#end-to-end-adversarial-text-to-speech-eats--paper-explained) — are good worked examples of the three-pass method: read the paper yourself first, then watch how he takes it apart.

---

## aurora.tts · Text-to-speech (deferred module, supplementary)

> Text-to-speech is a **deferred module** on the course roadmap (no deep training within the six months), but it is the natural next step, so the material is collected here. There are few complete, high-quality video courses on TTS, so this section combines **a systematic English course (Valerio Velardo) + paper walkthroughs + front-end basics + the link back to DSP**. **The mel spectrogram an acoustic model outputs is exactly the DSP representation you already built in Phase 5 — learning TTS is a natural extension of `aurora.audio`.**

### 🥇 Text-to-Speech & Voice Cloning Course (full course)
- **Instructor**: Valerio Velardo — The Sound of AI
- **Links**: First episode https://www.youtube.com/watch?v=_MFrEYPdEn8 | all videos on the channel https://www.youtube.com/c/ValerioVelardoTheSoundofAI/videos
- **Type**: Full course (released in episodes, ongoing) · **Level**: Beginner → Intermediate · **Language**: English · **Duration**: about 30–45 minutes per episode
- **Covers**: the evolution from concatenative to neural TTS; the two-stage pipeline (acoustic model + vocoder); the mel spectrogram as the bridge; WaveNet / WaveGlow / HiFi-GAN vocoders; parallel architectures such as FastSpeech / Glow-TTS; codec-based generation such as VALL-E / AudioLM / SPEAR-TTS; voice cloning
- **Lessons**: aurora.tts (the whole pipeline)
- **Why it fits**: currently the most complete English TTS course on YouTube; it focuses on understanding the internal mechanisms rather than calling APIs, and works as the main textbook for aurora.tts.

### The Neural TTS Revolution (a one-episode overview)
- **Instructor**: Valerio Velardo — The Sound of AI
- **Links**: https://www.youtube.com/watch?v=4Lbox-d0UcE
- **Type**: Single video · **Level**: Beginner → Intermediate · **Language**: English · **Duration**: about 41 minutes
- **Covers**: the 2016 starting point of WaveNet / Tacotron, the two-stage pipeline, the mel spectrogram as bridge, kinds of vocoders, parallel architectures, codec-based generation
- **Lessons**: aurora.tts (concept map)
- **Why it fits**: lays the whole neural-TTS landscape out on a single timeline — a map for aurora.tts, so you won't get lost when you dig into the individual papers.

### End-to-End Adversarial Text-to-Speech (EATS) — Paper Explained
- **Instructor**: Yannic Kilcher
- **Links**: https://www.youtube.com/watch?v=WTB2p4bqtXU
- **Type**: Single video (paper walkthrough) · **Level**: Advanced · **Language**: English · **Duration**: about 41 minutes
- **Covers**: the problems of multi-stage TTS pipelines, adversarial training, end-to-end training, discriminator / generator structure, the alignment problem and the aligner, spectrogram prediction loss, DTW
- **Lessons**: aurora.tts (end-to-end / adversarial)
- **Why it fits**: takes "why alignment is the core difficulty of TTS" down to the formulas — a prerequisite reading for end-to-end adversarial models such as VITS.

### In-depth Review of VALL-E — Zero-Shot TTS
- **Instructor**: ⚠️ producing channel not checked (video title and content checked to be a walkthrough of the VALL-E paper)
- **Links**: https://www.youtube.com/watch?v=fCtbnhR83UI | if it is gone, search: "VALL-E paper explained neural codec language model zero-shot TTS"
- **Type**: Single video (paper walkthrough) · **Level**: Advanced · **Language**: English · **Duration**: about 20–40 minutes
- **Covers**: treating TTS as conditional language modelling, discrete EnCodec codes in place of mel spectrograms, two-stage autoregressive + non-autoregressive decoding, zero-shot voice cloning from a 3-second prompt
- **Lessons**: aurora.tts (zero-shot voice cloning)
- **Why it fits**: matches the "VALL-E approach / zero-shot voice cloning" item, and makes clear how the codec-LM paradigm differs from the traditional mel-spectrogram route; read it alongside the paper, arXiv 2301.02111.

### Text Processing for Speech Synthesis (TTS front end · G2P / normalisation)
- **Instructor**: Prof. Simon King / University of Edinburgh (CSTR), SPCC 2016
- **Links**: https://www.youtube.com/watch?v=6lMs1VcUrYc | same series, HMM-based synthesis https://www.youtube.com/watch?v=3Ffd75PVjjc
- **Type**: Single video (lecture series) · **Level**: Intermediate · **Language**: English · **Duration**: about 1 hour
- **Covers**: text normalisation, grapheme-to-phoneme conversion (G2P), lexicons and pronunciation, prosody / phrase-break annotation — how a TTS front end turns text into model input
- **Lessons**: aurora.tts (front end: text → phonemes / G2P)
- **Why it fits**: neural-TTS videos usually skip the front end, yet the first stage of the aurora.tts pipeline is exactly "text → phonemes / G2P"; the Edinburgh speech-synthesis group is the most authoritative school in the field.

### Audio Signal Processing for ML (the DSP connection)
- **Instructor**: Valerio Velardo — The Sound of AI
- **Links**: https://www.youtube.com/playlist?list=PL-wATfeyAMNqIee7cH3q1bh4QJFAaeNv0 (full description in [Phase 5](#phase-5--audio-dsp-l32l53))
- **Type**: Playlist · **Level**: Beginner → Intermediate · **Language**: English
- **Covers**: deriving STFT → mel spectrogram from scratch — the shared representation that the acoustic model outputs and the vocoder takes in
- **Lessons**: aurora.tts ↔ aurora.audio connection (L43–L48)
- **Why it fits**: answers directly how TTS connects to the DSP you have already written (mel spectrograms / STFT) — the bridge between the two modules.

### WaveNet by Google DeepMind | Two Minute Papers #93
- **Instructor**: Károly Zsolnai-Fehér — Two Minute Papers
- **Links**: https://www.youtube.com/watch?v=CqFIVCD1WWo
- **Type**: Single video (overview) · **Level**: Beginner · **Language**: English · **Duration**: about 4 minutes
- **Covers**: WaveNet modelling the raw waveform directly, autoregressive generation, the leap in perceived quality (conceptual level)
- **Lessons**: aurora.tts (vocoder overview)
- **Why it fits**: a quick "why it matters" introduction to WaveNet, the starting point of neural vocoders — fast intuition before you begin; for the mechanisms, go to Valerio's course and the EATS walkthrough.

> **VITS / HiFi-GAN / FastSpeech 2 / Grad-TTS**: we did not find standalone, verifiable, high-quality videos on these from well-known teachers or universities (most material is blog posts, documentation or code). They are covered in Valerio's full course; read them alongside the original papers: VITS `arXiv 2106.06103`, HiFi-GAN `2010.05646`, FastSpeech 2 `2006.04558`, Grad-TTS `2105.06337`.

---

## Verification notes

- The links in this library were carried over from the original catalog, where they were checked mainly against **YouTube search results and official pages** to confirm that they exist and point to the resource described. They have **not** been re-checked one by one for this English edition. Because YouTube pages are rendered client-side, scraping tools cannot read back the list of videos inside a playlist, so:
  1. the library **prefers the most stable URL — a playlist, channel or official course page**;
  2. entries marked **`⚠️`** have a single-video link that could not be confirmed — go by the **channel + search terms** given;
  3. a few entries are free official courses or lecture notes **not on YouTube** (the Hugging Face Audio Course, the Edinburgh ASR notes, the FMP notebooks); this is stated in their "Type" field.
- Videos can be **taken down or renamed** over time. If a link stops working, search YouTube for the title or channel name and you will usually find it.
- Caption notes ("with captions") come from the original catalog and were not re-checked for this edition.
- **Reuse across phases**: Karpathy (micrograd / GPT), Valerio Velardo (the whole audio thread) and 3Blue1Brown (maths / Transformers) appear in several phases. Each gets a full entry in its "home" phase, and a short cross-reference elsewhere, to avoid repetition.
- **This edition lists English-language lectures only.** Courses taught in other languages have been left out, so every entry can be followed without subtitles or dubbing.

---

*English edition, 2026-11-05 · aligned with the L01–L99 lesson list in [`README.md`](../README.md) · a supplement only, separate from the course notebooks themselves.*
