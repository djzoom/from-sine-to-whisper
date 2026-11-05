// Question bank and chapter text — pure data, no logic.
// To change questions, chapter stories or rewards, edit only this file; the game
// mechanics live in ../app.js and the rendering in ../ui.js.
//
// `answer` is the zero-based index of the one correct choice. `source` lists the
// English lessons each chapter's questions are drawn from.

// Balance: XP for a right answer / for clearing a chapter, and XP per level.
export const XP_PER_QUESTION = 30;
export const XP_PER_PHASE_CLEAR = 60;
export const XP_PER_LEVEL = 120;

const q = (prompt, choices, answer, hint, note) => ({
  prompt,
  choices,
  answer,
  hint,
  note,
});

export const QUESTS = [
  {
    id: "prologue",
    title: "Prologue: Welcome to Aurora Quest",
    boss: "Black-Box Gatekeeper",
    artifact: {
      icon: "ID",
      name: "Enrollment Badge",
      desc: "Your pass to Jupyter, the terminal and the course map.",
    },
    source: ["README.md", "notebooks/0_foundation/L01_motivation.ipynb"],
    narrative: [
      "Welcome to the course. Nobody is going to drop you straight into a black box here — first, we make sure you can see every single brick.",
      "On this 8-bit expedition the course is the main story and the game is your sparring partner. What you win isn't points; it's the confidence of knowing why it works.",
    ],
    questions: [
      q(
        "What way of learning does this course care about most?",
        [
          "Stack up APIs, then look at the results",
          "Write it yourself, check it, then explain it",
          "Memorize the concepts",
          "Just watch the demos",
        ],
        1,
        "If all you can do is call tools, you lose your bearings the moment a problem is unfamiliar.",
        "That's the spirit of \"no black boxes\".",
      ),
      q(
        "In this course, Jupyter is most like…",
        [
          "An interactive lab",
          "A static e-book reader",
          "A stand-in for a compiler",
          "A printer for your notes",
        ],
        0,
        "A notebook isn't just for reading — you write and try things as you go.",
        "The best thing about Jupyter: you can explain, compute, plot and tweak on the same page.",
      ),
      q(
        "A piece of code seems to run, but you don't understand why. What does the course want you to do?",
        [
          "Skip it — you'll get it eventually",
          "Go back to the formula and the tests until the whole chain makes sense",
          "Just memorize the conclusion",
          "Treat it as magic",
        ],
        1,
        "Running once doesn't mean you can reproduce it, change it or explain it later.",
        "What we want is code you can write, explain and debug.",
      ),
    ],
  },
  {
    id: "phase-1",
    title: "Chapter 1: Math + DSP foundations",
    boss: "Spectrum Warden",
    artifact: {
      icon: "Σ",
      name: "Sampling Key",
      desc: "The first key for turning vibrations in the air into an array.",
    },
    source: [
      "notebooks/1_complex_trig/L06_euler.ipynb",
      "notebooks/5_audio_dsp/L34_aliasing.ipynb",
      "notebooks/5_audio_dsp/L36_windows.ipynb",
    ],
    narrative: [
      "Fourier found his way into the world of signals through a problem about how heat flows. For us the road runs through sound: sample it first, look at its spectrum, then learn to take a waveform apart, understand it and put it back together.",
      "Once Euler's formula arrives, rotation gets its most beautiful notation. You'll find the FFT isn't about memorizing formulas — it's rotation written as code.",
    ],
    questions: [
      q(
        "Why can't the sample rate be as low as you like?",
        [
          "The computer would overheat",
          "High frequencies get mistaken for lower ones",
          "The array gets shorter",
          "matplotlib throws an error",
        ],
        1,
        "That's exactly what the Nyquist theorem is warning you about.",
        "The sample rate has to be more than twice the highest frequency, or aliasing creeps in.",
      ),
      q(
        "What's the key intuition behind Euler's formula e^{iθ} in the FFT?",
        [
          "It's just a random trick",
          "It writes rotation as a complex exponential",
          "It removes noise automatically",
          "It reads the lyrics straight off the audio",
        ],
        1,
        "Think of the twiddle factor as a turn in the plane.",
        "Once rotation is something you can compute, the DFT gets its neat matrix form.",
      ),
      q(
        "What problem does a window function mainly ease?",
        ["Spectral leakage", "Running out of GPU memory", "Wrong labels", "Audio that isn't loud enough"],
        0,
        "Chopping a signal off abruptly hands the spectrum sharp edges.",
        "A window isn't there to make things louder — it keeps the spectrum clean.",
      ),
    ],
  },
  {
    id: "phase-2",
    title: "Chapter 2: ML + deep learning foundations",
    boss: "Backprop Knight",
    artifact: {
      icon: "∇",
      name: "Gradient Scroll",
      desc: "The hand-copied scroll that pushes the loss downhill.",
    },
    source: [
      "notebooks/3_calculus/L25_gradient_descent.ipynb",
      "notebooks/6_deep_learning/L54_value_autograd.ipynb",
      "notebooks/5_audio_dsp/L46_mel.ipynb",
    ],
    narrative: [
      "Training isn't mysterious. It's a process that keeps correcting its own mistakes: make the loss visible, walk downhill along the gradient, and the model gets things right a little at a time.",
      "From the earliest ideas about propagating errors to today's autograd and training loops, the logic has stayed simple: record the path, then send the derivatives back along it.",
    ],
    questions: [
      q(
        "What is gradient descent doing?",
        [
          "Updating the parameters in the direction the loss falls fastest",
          "Making the data bigger automatically",
          "Turning gradients into images",
          "Setting the learning rate to 0",
        ],
        0,
        "It isn't guessing — it's systematically looking for a lower loss.",
        "The heart of training is taking step after step downhill.",
      ),
      q(
        "What is autograd, at heart?",
        [
          "A random-number generator",
          "Recording the computation graph and passing gradients back through it",
          "A way to make Python slower",
          "Automatically turning matrices into scalars",
        ],
        1,
        "One forward pass, then a backward pass that works out each node's contribution.",
        "That's why we build the computation graph up one step at a time.",
      ),
      q(
        "Mel features are closest to…",
        [
          "How the human ear perceives frequency",
          "Random noise",
          "Edge detection in images",
          "Alphabetical order",
        ],
        0,
        "The mel scale pulls physical frequency toward perceived pitch.",
        "It's the key to lining audio features up with how our ears work.",
      ),
    ],
  },
  {
    id: "phase-3",
    title: "Chapter 3: Speech Core (ASR)",
    boss: "Alignment Referee",
    artifact: {
      icon: "↔",
      name: "Alignment Pin",
      desc: "Your pass for turning waveforms into text, one step at a time.",
    },
    source: [
      "notebooks/7_asr/L68_ctc_alignment.ipynb",
      "notebooks/7_asr/L70_whisper_arch.ipynb",
      "notebooks/7_asr/L73_wer_eval.ipynb",
    ],
    narrative: [
      "From classical acoustic models to end-to-end systems, the history of ASR is really the story of how to explain alignment. CTC is the bridge: it shows you alignment isn't magic, just bookkeeping that dynamic programming can settle.",
      "When Whisper takes the stage, the training objective and the decoding strategy get new names — but the thing to hold on to stays the same: how a model learns, along the time axis, to understand someone speaking.",
    ],
    questions: [
      q(
        "What does the blank symbol mainly do in CTC?",
        [
          "Make the model faster",
          "Allow alignment and collapse repeated labels",
          "Turn the text into upper case",
          "Replace the acoustic features",
        ],
        1,
        "It lets paths of different lengths map onto the same label sequence.",
        "The blank is the buffer zone of the alignment problem.",
      ),
      q(
        "What is Whisper's training objective closest to?",
        ["Pure CTC", "Seq2seq with cross-entropy", "Clustering", "Linear regression"],
        1,
        "It doesn't follow the old CTC road.",
        "Whisper is a standard encoder–decoder trained with cross-entropy.",
      ),
      q(
        "What does WER measure?",
        ["Word error rate", "Window-function error", "Weight-update rate", "Byte compression rate"],
        0,
        "It's one of the most common metrics in speech recognition.",
        "The fewer words you get wrong, the lower the WER.",
      ),
    ],
  },
  {
    id: "phase-4",
    title: "Chapter 4: Music Core",
    boss: "Melody Imp",
    artifact: {
      icon: "♫",
      name: "Melody Map",
      desc: "Turn songs into vectors, then vectors into recommendations.",
    },
    source: [
      "notebooks/8_music/L77_music_features.ipynb",
      "notebooks/8_music/L79_music_embed.ipynb",
      "notebooks/8_music/L80_similarity.ipynb",
    ],
    narrative: [
      "The fun of music AI is watching the way something sounds turn into structure you can compute. You don't just hear a melody anymore — you start to see rhythm, pitch classes, similarity and vector space.",
      "From feature engineering to embeddings to nearest-neighbor search, music recommendation runs along a route that's very practical and quite beautiful.",
    ],
    questions: [
      q(
        "What does a chroma feature care about most?",
        [
          "Pitch classes and key",
          "Sampling jitter in the waveform",
          "The direction of the gradient",
          "The speaker's age",
        ],
        0,
        "It folds notes with the same name in different octaves together.",
        "Chroma listens to the relationships between pitches, not the raw waveform.",
      ),
      q(
        "What's the point of an embedding?",
        [
          "Turning songs into vectors you can compare",
          "Squashing audio into text",
          "Converting a spectrogram to a PDF",
          "Doubling the sample rate",
        ],
        0,
        "Once everything is a vector, recommendation and search share one notion of distance.",
        "It's what lets a machine work with the idea of \"similar\".",
      ),
      q(
        "What does k-NN similarity search mainly rely on?",
        ["Distance / similarity", "Lyric length", "File extension", "Whether it's the same artist"],
        0,
        "Compute the distances, then see who's closest.",
        "Nearest neighbors in vector space are where recommendation starts.",
      ),
    ],
  },
  {
    id: "phase-5",
    title: "Chapter 5: LLM + RAG + agents",
    boss: "Retrieval Librarian",
    artifact: {
      icon: "⌁",
      name: "Retrieval Chip",
      desc: "Gives a large language model a library it can search and ask.",
    },
    source: [
      "notebooks/9_llm/L84_lora.ipynb",
      "notebooks/9_llm/L85_kv_cache.ipynb",
      "notebooks/9_llm/L89_rag_pipeline.ipynb",
    ],
    narrative: [
      "In the LLM chapter you'll see clearly that parameter count, context length, retrieval, sampling and quantization aren't isolated points — they're one connected set of engineering choices.",
      "From the Transformer to LoRA to plugging a library into the model, the question is no longer just \"can the model answer?\" but \"can it answer accurately and quickly — and show where the answer came from?\"",
    ],
    questions: [
      q(
        "Why is LoRA so popular?",
        [
          "It labels your data automatically",
          "Its low-rank adapters cut the number of trainable parameters",
          "It only runs on phones",
          "It can replace retrieval outright",
        ],
        1,
        "The trick is touching only a small slice of the parameters and still adapting well to a new task.",
        "A few trainable parameters, a much lower cost.",
      ),
      q(
        "What does a KV cache do?",
        [
          "Makes the model re-read everything",
          "Reuses past keys and values to speed up inference",
          "Turns the input into an image",
          "Makes the tokenizer smarter",
        ],
        1,
        "It saves a lot of repeated work during autoregressive generation.",
        "What gets cached is past context — not magic.",
      ),
      q(
        "What are the key steps of RAG?",
        ["Retrieval + generation", "Sampling + mixing", "Tokenizing + normalizing", "Windowing + FFT"],
        0,
        "Find the material first, then have the model answer from it.",
        "Retrieval connects the model to a knowledge base.",
      ),
    ],
  },
  {
    id: "phase-6",
    title: "Chapter 6: Integration + one demo + MLOps",
    boss: "Chief Architect",
    artifact: {
      icon: "★",
      name: "Finale Badge",
      desc: "The last reward, for truly bringing every module together.",
    },
    source: [
      "notebooks/10_integration/L92_pipeline.ipynb",
      "notebooks/10_integration/L93_mlops.ipynb",
      "notebooks/10_integration/L94_demo.ipynb",
    ],
    narrative: [
      "By the time you get here, training holds no more mystery. It's simply a process you can write by hand, debug, and watch converge bit by bit.",
      "What matters most now isn't piling on new buzzwords. It's explaining the whole pipeline clearly, keeping it running reliably, and handing it to someone else who can reproduce it.",
    ],
    questions: [
      q(
        "What matters most in your final demo?",
        [
          "Cramming in every acronym you know",
          "Explaining the pipeline clearly and running it end to end",
          "Making the page as flashy as possible",
          "Using as many parameters as possible",
        ],
        1,
        "Interviews and showcases both reward \"explainable + reproducible\".",
        "One end-to-end result you can explain beats a pile of half-finished parts.",
      ),
      q(
        "When you're debugging training or inference, what's the most valuable evidence?",
        [
          "As many screenshots as possible",
          "Tests, logs and reproducible inputs",
          "A feeling that it's right",
          "Knowing other people got stuck too",
        ],
        1,
        "A chain of evidence beats an impression.",
        "If you can reproduce it, you can really fix it.",
      ),
      q(
        "You've cleared the game. What's most worth doing next?",
        [
          "Make your name bigger",
          "Build an end-to-end project you can talk through",
          "Delete all the notebooks",
          "Memorize concepts without writing code",
        ],
        1,
        "You have all the parts now — time to assemble the real thing.",
        "A project you can explain is an asset that's truly yours.",
      ),
    ],
  },
];
