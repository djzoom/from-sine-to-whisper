// Course guide (the "Course" panel) — pure data, no logic.
// Lesson codes, titles, phase names, folders and ranges come from the course
// table in README.md via course-snapshot.generated.js (regenerate it with
// `node scripts/generate_quest_data.mjs`). The prose for each phase — the lead,
// key ideas and summary — is written here, keyed by the phase's folder.

import { courseSnapshot } from "../course-snapshot.generated.js";

export const COURSE_INTRO = {
  title: "Course guide",
  range: "L01 → L99",
  lead:
    "This map lays the 99 lessons out as one continuous route: from mathematical intuition and audio DSP to deep learning and a system you can ship. At every stage the formula, the code and the picture sit side by side, so you never end up just calling a black box.",
  thesis:
    "The first half of the map answers \"how do sound and mathematical objects live inside a computer?\" The second half answers \"how does a model understand sound, music and language — and how do you turn that into a system you can demo?\"",
};

const PHASE_PROSE = {
  "0_foundation/": {
    lead:
      "We start by sorting out the motivation, the route and your environment. Once that footing is steady, everything after it connects, one stretch to the next.",
    keyIdeas: [
      "The course route and what you'll build",
      "Sampling sound into PCM arrays",
      "The three axes of a spectrogram: time, frequency, energy",
    ],
    summary:
      "Finish these three lessons and you hold the three most important keys for digital audio and everything AI-shaped that follows. Next, we'll put sound into the computer together and watch vibrations in the air become an array.",
  },
  "1_complex_trig/": {
    lead:
      "Next we set off with complex numbers and trigonometry. This is the road Fourier took when he carried a problem about heat flow all the way into signal processing — and once Euler's formula appears, rotation gets its most beautiful notation.",
    keyIdeas: [
      "Frequency, amplitude and phase of a sine wave",
      "Complex multiplication as rotation and scaling",
      "The geometry behind Fourier sums",
    ],
    summary:
      "By now a sine wave isn't just a curve on a pair of axes. It starts to feel like a language — something you can rotate, take apart and use again and again.",
  },
  "2_linear_algebra/": {
    lead:
      "A little further on, linear algebra takes the stage. Once vectors and matrices — numbers standing in line — start to look natural, decompositions, filters and eigenvalues all begin to feel like something you can get your hands on.",
    keyIdeas: [
      "Vector spaces, projection and similarity",
      "Matrices as linear maps",
      "SVD, the DFT matrix and the mel filter matrix",
    ],
    summary:
      "With linear algebra steady, decompositions, filtering and eigenvalues all follow naturally — and a lot of audio algorithms start to feel tangible for the first time.",
  },
  "3_calculus/": {
    lead:
      "Then we switch to calculus. First learn to read a slope, then learn to walk down it. The gradient is your steering wheel, and this way of thinking grew into the backbone of deep learning.",
    keyIdeas: [
      "Derivatives and local slope",
      "Multivariable gradients and the steepest direction",
      "From the chain rule to gradient descent",
    ],
    summary:
      "Adjusting parameters is no longer guesswork. You can now see why optimization heads in the direction it does.",
  },
  "4_probability/": {
    lead:
      "Next, probability and statistics bring randomness back onto computable ground. Plenty of models look like they're guessing, but underneath they're working with distributions, expectations and loss functions.",
    keyIdeas: [
      "Conditional probability and independence",
      "Mean, variance and common distributions",
      "Softmax outputs and the cross-entropy loss",
    ],
    summary:
      "With distributions and losses in hand, a classifier stops trying things at random and starts following the rhythm of the data.",
  },
  "5_audio_dsp/": {
    lead:
      "This is where audio processing really joins the main road. Sampling, spectra, filtering and MFCCs unfold one after another, and the boundary Nyquist and Shannon worked out finally becomes something you can feel.",
    keyIdeas: [
      "Sampling, aliasing and window functions",
      "Complete DFT, FFT and STFT implementations",
      "The mel spectrogram and the MFCC feature pipeline",
    ],
    summary:
      "Sound isn't just being taken apart anymore — it can be put back together, too. The main trunk of audio processing is now standing on its own.",
  },
  "6_deep_learning/": {
    lead:
      "From here on, the way a neural network learns finally takes shape. Gradients, backpropagation and the training loop connect layer by layer, and the black box slowly becomes a system you can build yourself.",
    keyIdeas: [
      "A scalar autodiff computation graph",
      "MLP forward pass, backward pass and parameter updates",
      "PyTorch training, evaluation and diagnosing overfitting",
    ],
    summary:
      "Once you finish Phase 6, training holds no more mystery. You'll find it's simply a process you can write by hand, debug, and watch converge bit by bit.",
  },
  "7_asr/": {
    lead:
      "And next, in Phase 7, we teach sound to speak. The ASR track turns waveforms into text step by step, and shows you how the field evolved from classical acoustic models all the way to Whisper.",
    keyIdeas: [
      "Acoustic model, language model and decoder",
      "CTC alignment and dynamic programming",
      "Whisper's architecture, decoding and WER evaluation",
    ],
    summary:
      "From sound wave to sentence, the chain is finally connected. A recognition system is no longer just a term — it's an engineering path you can run end to end.",
  },
  "8_music/": {
    lead:
      "Now we turn our ears toward melody. The features, beats and similarities of music information retrieval are a lot like the intuitions people have when they listen to a song — they just end up as numbers.",
    keyIdeas: [
      "Pitch, chroma and energy features",
      "Beat tracking and the onset envelope",
      "Music embeddings, similarity search and recommendation",
    ],
    summary:
      "Music isn't only being heard anymore. It's starting to be understood, searched, and even organized into recommendations.",
  },
  "9_llm/": {
    lead:
      "Then comes the chapter on language systems. Once attention, caching and retrieval are all on stage, text isn't simply \"generated\" anymore — it can remember, look things up, and call on tools to get things done.",
    keyIdeas: [
      "Transformer attention and positional encoding",
      "LoRA, the KV cache, sampling and quantization",
      "TF-IDF / RAG and ReAct tool use",
    ],
    summary:
      "At this point the language system can generate and fetch the knowledge it needs — you've strung together the core moves of a modern LLM + RAG system.",
  },
  "10_integration/": {
    lead:
      "Finally, we bring every voice together into one complete machine. Once the microphone, ASR, the LLM and the delivery process are all connected, you'll see how a whole system makes its way from an idea to a product.",
    keyIdeas: [
      "An end-to-end pipeline from microphone to ASR and LLM",
      "Experiment tracking, Docker and deployment scripts",
      "The demo, reading papers and your chain of evidence",
    ],
    summary:
      "The whole system has landed: it runs, you can explain it, and you can ship it. What's left is polishing it into a piece of work that's yours.",
  },
};

export const COURSE_PHASES = courseSnapshot.phases.map((phase, index) => {
  const prose = PHASE_PROSE[phase.folder] ?? { lead: "", keyIdeas: [], summary: "" };
  return {
    id: `phase-${index}`,
    icon: phase.icon,
    phase: phase.phase,
    title: phase.title,
    folder: phase.folder,
    range: phase.range,
    lead: prose.lead,
    keyIdeas: prose.keyIdeas,
    summary: prose.summary,
    lessons: phase.lessons.map(([code, title]) => [code, title]),
  };
});
