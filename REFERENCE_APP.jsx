import React, { useEffect, useMemo, useState } from "react";

const modules = [
  {
    id: 0,
    title: "Why Math Matters in AI",
    time: "5 min",
    theme: "Warm-up",
    story:
      "Data Science turns real questions into math, solves the math, then translates the answer back into a decision. AI may look magical, but underneath it uses probability, statistics, vectors, matrices, and patterns in numbers.",
    idea:
      "The three pillars are: probability for uncertainty, linear algebra for representing data, and statistics for describing what the data says overall.",
    example:
      "A refugee program question like ‘Which clients need follow-up first?’ becomes a data question: What factors increase risk, how likely is each case to need support, and what pattern do we see across past clients?",
    lab: `# Reflection lab\nquestions = [\n    "What is one work decision I make using data?",\n    "What information would help me make that decision better?"\n]\nfor q in questions:\n    print(q)`,
    checks: [
      { q: "What does probability help us answer?", a: "How likely something is." },
      { q: "What do vectors and matrices help us do?", a: "Store and compare data as numbers." },
      { q: "What does statistics help us summarize?", a: "Averages, spread, patterns, and what is normal or unusual." },
    ],
    project: "Write one work question from refugee resettlement that could become a data science question.",
  },
  {
    id: 1,
    title: "Probability Basics",
    time: "45 min",
    theme: "Foundations",
    story:
      "Probability is the math of uncertainty. You may not know what will happen next, but you can estimate how likely it is based on possible outcomes.",
    idea:
      "P(A) = favorable outcomes / total possible outcomes. Probability ranges from 0, impossible, to 1, certain.",
    example:
      "A bag has 3 red marbles and 7 blue marbles. P(red) = 3 / 10 = 0.3, or 30%.",
    lab: `import random\n\nbag = ['red']*3 + ['blue']*7\ndraws = [random.choice(bag) for _ in range(10000)]\nprint("Empirical P(red) =", draws.count('red') / 10000)`,
    checks: [
      { q: "A die is rolled. What is P(even)?", a: "3/6 = 0.5." },
      { q: "If P(A) = 0.8, what is P(not A)?", a: "0.2." },
      { q: "Why does the simulation get closer to 0.3 with more draws?", a: "Because more samples usually give a more stable estimate. This is the law of large numbers." },
    ],
    project: "Create a simple probability example using program data, such as the probability that a randomly selected client belongs to a specific program.",
  },
  {
    id: 2,
    title: "Conditional Probability & Bayes’ Rule",
    time: "75 min",
    theme: "Core idea",
    story:
      "Bayes’ Rule explains why our intuition can be wrong when evidence depends on context. A test can be very accurate, but a positive result may still be less certain when the condition is rare.",
    idea:
      "P(Disease | Positive) = [P(Positive | Disease) × P(Disease)] / P(Positive). The key is that false positives can overwhelm true positives when prevalence is low.",
    example:
      "In 10,000 people: 100 have Covid. With 95% sensitivity, 95 true positives appear. Of 9,900 healthy people, 5% false positive gives 495 false positives. So P(Covid | Positive) = 95 / 590 ≈ 16.1%.",
    lab: `def bayes_disease(prevalence, sensitivity, specificity):\n    p_pos_given_disease = sensitivity\n    p_pos_given_healthy = 1 - specificity\n    p_pos = p_pos_given_disease * prevalence + p_pos_given_healthy * (1 - prevalence)\n    return (p_pos_given_disease * prevalence) / p_pos\n\nprint(bayes_disease(0.01, 0.95, 0.95))\nprint(bayes_disease(0.10, 0.95, 0.95))\nprint(bayes_disease(0.01, 0.95, 0.99))`,
    checks: [
      { q: "With 99% specificity and 1% prevalence, what is P(Disease | Positive)?", a: "About 49%." },
      { q: "Why does retesting work?", a: "The first positive raises the prior probability, so the second test starts with stronger evidence." },
      { q: "Why is 95% not the answer in the Covid example?", a: "Because specificity and prevalence matter. Many healthy people can produce false positives." },
    ],
    project: "Use the Bayes calculator in this app and compare how the result changes when prevalence moves from 1% to 10%.",
  },
  {
    id: 3,
    title: "Vectors, Matrices & Recommendations",
    time: "70 min",
    theme: "Data as structure",
    story:
      "A recommendation system stores users and items as numbers. Each row might be a user, each column might be a movie, service, or product, and each cell stores a rating or interaction.",
    idea:
      "A vector is an ordered list of numbers. A matrix is a grid of numbers. Machine learning models compare rows, columns, and patterns inside the grid.",
    example:
      "A user-item matrix can predict missing ratings by comparing user averages and item averages. Simple methods use averages; stronger methods use similarity and factorization.",
    lab: `import numpy as np\n\nR = np.array([\n    [5,2,1,4,1],\n    [4,0,1,3,3],\n    [3,3,2,0,4],\n    [2,1,2,2,5],\n    [5,3,0,4,3],\n])\n\na = np.array([row[row > 0].mean() for row in R])\nb = np.array([R[:, j][R[:, j] > 0].mean() for j in range(R.shape[1])])\n\npred = (a[1] + b[1]) / 2\nprint("User averages:", a)\nprint("Item averages:", b)\nprint("Predicted rating:", round(pred, 2))`,
    checks: [
      { q: "What is the shape of the matrix in the lab?", a: "5 × 5." },
      { q: "If you add a 6th movie, do you add a row or a column?", a: "A column." },
      { q: "Why is average of averages limited?", a: "It ignores deeper similarity between users and items." },
    ],
    project: "Create a tiny matrix where rows are clients and columns are service needs. Mark 1 for received and 0 for not received, then think about what patterns might matter.",
  },
  {
    id: 4,
    title: "Images as Numbers",
    time: "45 min",
    theme: "Computer vision",
    story:
      "A computer does not see a picture the way humans do. It sees a grid of numbers. Each number describes brightness or color intensity.",
    idea:
      "A grayscale image is a matrix. A color image has three matrices: red, green, and blue. A 128 × 128 RGB image has 128 × 128 × 3 = 49,152 numbers.",
    example:
      "A white pixel is 255, a black pixel is 0, and gray values fall between them. Machine learning learns visual patterns from those numerical grids.",
    lab: `import numpy as np\nimport matplotlib.pyplot as plt\n\nimg = np.random.randint(0, 256, size=(8, 8))\nplt.imshow(img, cmap='gray', vmin=0, vmax=255)\nplt.show()\nprint(img)`,
    checks: [
      { q: "How many numbers describe a 28 × 28 MNIST digit?", a: "784." },
      { q: "What value is pure white in an 8-bit image?", a: "255." },
      { q: "Why is it useful that images are numbers?", a: "Because models can compare, transform, and learn from numbers." },
    ],
    project: "Think of a scanned handwritten van log. Explain why OCR is hard when handwriting changes the pixel patterns.",
  },
  {
    id: 5,
    title: "Dimension Reduction & PCA",
    time: "65 min",
    theme: "Signal vs noise",
    story:
      "Many datasets contain repeated, noisy, or low-value details. Dimension reduction keeps the most informative parts while dropping some of the noise.",
    idea:
      "PCA keeps directions of maximum variance. Variance means the places where the data changes most, which often carry the strongest signal.",
    example:
      "A digit image can be reduced from 784 numbers to fewer components and still look recognizable. The trade-off is that less detail means a blurrier reconstruction.",
    lab: `from sklearn.datasets import load_digits\nfrom sklearn.decomposition import PCA\nimport matplotlib.pyplot as plt\n\ndigits = load_digits()\nX = digits.data\n\npca = PCA(n_components=10).fit(X)\nprint("Variance kept:", pca.explained_variance_ratio_.sum())\n\nX_reduced = pca.transform(X)\nX_back = pca.inverse_transform(X_reduced)\n\nplt.imshow(X_back[0].reshape(8, 8), cmap='gray')\nplt.title('Reconstructed from 10 dimensions')\nplt.show()`,
    checks: [
      { q: "If you reduce 784 dimensions to 50, what happens?", a: "You keep only 50 features and remove about 93.6% of the original dimensions." },
      { q: "PCA keeps directions of maximum what?", a: "Variance." },
      { q: "What is the main trade-off?", a: "Less complexity, but some detail is lost." },
    ],
    project: "Pick a large spreadsheet and identify which columns may be redundant, rarely used, or low-value for decision-making.",
  },
  {
    id: 6,
    title: "Putting It All Together",
    time: "45 min",
    theme: "Review",
    story:
      "The goal is not to become a mathematician overnight. The goal is to recognize the math ideas when they appear in AI, Python, dashboards, and decision systems.",
    idea:
      "Probability supports decisions under uncertainty. Vectors and matrices represent data. Statistics summarizes patterns. Dimension reduction keeps the signal and drops noise.",
    example:
      "A practical AI workflow starts with a real question, turns it into data, uses math to find a pattern, then returns to the real world as a recommendation, alert, forecast, or decision support tool.",
    lab: `skills = ["Probability", "Bayes", "Matrices", "Images", "PCA"]\nfor skill in skills:\n    print(f"I can explain the basic idea of {skill} and where it appears in AI.")`,
    checks: [
      { q: "Which idea helps with uncertainty?", a: "Probability." },
      { q: "Which idea represents users, images, text, or ratings as numbers?", a: "Vectors and matrices." },
      { q: "Which idea keeps signal while reducing complexity?", a: "Dimension reduction / PCA." },
    ],
    project: "Create a one-page cheat sheet with the four lenses: probability, matrices, statistics, and dimension reduction.",
  },
];

const finalQuiz = [
  {
    q: "A test has 90% sensitivity, 95% specificity, and 2% prevalence. What is P(Disease | Positive)?",
    a: "About 27%. Use the Bayes calculator to verify.",
  },
  { q: "In a user-item matrix, what does each row typically represent?", a: "One user." },
  { q: "A 64 × 64 RGB image is how many numbers?", a: "64 × 64 × 3 = 12,288." },
  { q: "Why does Bayes’ Rule give non-intuitive results for rare diseases?", a: "Because false positives from the much larger healthy group can swamp true positives." },
  { q: "PCA keeps directions of maximum ____.", a: "Variance." },
  { q: "If prevalence doubles, does P(Disease | Positive) usually go up or down?", a: "Up." },
  { q: "Name one real-world AI system that uses Bayes-like reasoning.", a: "Spam filter, fraud detection, medical diagnosis, or Naive Bayes classifier." },
];

const schedule = [
  {
    day: "Thu, May 14",
    focus: "Build the foundation",
    blocks: [
      { time: "45 min", task: "Module 0 + Module 1: AI math overview and probability basics" },
      { time: "75 min", task: "Module 2: Bayes’ Rule, Covid test example, and calculator practice" },
      { time: "30 min", task: "Mini-review: explain probability, prevalence, sensitivity, and specificity out loud" },
    ],
  },
  {
    day: "Fri, May 15",
    focus: "Connect the math to ML and Python",
    blocks: [
      { time: "70 min", task: "Module 3: vectors, matrices, and recommendation systems" },
      { time: "45 min", task: "Module 4: images as numerical arrays" },
      { time: "65 min", task: "Module 5: PCA and dimension reduction" },
      { time: "45 min", task: "Module 6 + Final quiz + write one-page cheat sheet" },
    ],
  },
  {
    day: "Sat, May 16",
    focus: "Light review only",
    blocks: [
      { time: "30 min", task: "Retake final quiz without notes" },
      { time: "30 min", task: "Review weak areas only; avoid cramming new material" },
    ],
  },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProgressRing({ value }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const dash = (value / 100) * circumference;
  return (
    <div className="relative h-28 w-28">
      <svg viewBox="0 0 100 100" className="h-28 w-28 rotate-[-90deg]">
        <circle cx="50" cy="50" r={radius} stroke="currentColor" strokeWidth="8" fill="none" className="text-slate-200" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeLinecap="round"
          className="text-slate-900 transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">{value}%</div>
    </div>
  );
}

function BayesCalculator() {
  const [prevalence, setPrevalence] = useState(1);
  const [sensitivity, setSensitivity] = useState(95);
  const [specificity, setSpecificity] = useState(95);

  const result = useMemo(() => {
    const prev = prevalence / 100;
    const sens = sensitivity / 100;
    const spec = specificity / 100;
    const pPositive = sens * prev + (1 - spec) * (1 - prev);
    if (pPositive <= 0) return 0;
    return (sens * prev) / pPositive;
  }, [prevalence, sensitivity, specificity]);

  const truePositives = Math.round(10000 * (prevalence / 100) * (sensitivity / 100));
  const falsePositives = Math.round(10000 * (1 - prevalence / 100) * (1 - specificity / 100));
  const totalPositives = truePositives + falsePositives;

  const Slider = ({ label, value, setter, min = 0, max = 100, step = 1 }) => (
    <label className="block rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="font-medium text-slate-800">{label}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">{value}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setter(Number(e.target.value))}
        className="w-full accent-slate-900"
      />
    </label>
  );

  return (
    <section className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Interactive calculator</p>
        <h2 className="text-2xl font-bold text-slate-950">Bayes’ Rule: positive test result</h2>
        <p className="mt-1 text-slate-600">Move the sliders and watch how prevalence and specificity change the answer.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <Slider label="Prevalence" value={prevalence} setter={setPrevalence} min={1} max={50} />
          <Slider label="Sensitivity" value={sensitivity} setter={setSensitivity} min={50} max={100} />
          <Slider label="Specificity" value={specificity} setter={setSpecificity} min={50} max={100} />
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-medium text-slate-500">P(Disease | Positive)</p>
          <div className="mt-2 text-5xl font-black tracking-tight text-slate-950">{(result * 100).toFixed(1)}%</div>
          <div className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-3">
              <div className="font-bold text-slate-950">{truePositives}</div>
              true positives / 10,000
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <div className="font-bold text-slate-950">{falsePositives}</div>
              false positives / 10,000
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <div className="font-bold text-slate-950">{totalPositives}</div>
              total positives
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-600">
            Plain English: among everyone who tested positive, about {(result * 100).toFixed(1)}% truly have the disease under these assumptions.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function MathsStatsAIInteractiveCourse() {
  const [activeModule, setActiveModule] = useState(0);
  const [completed, setCompleted] = useState({});
  const [revealedChecks, setRevealedChecks] = useState({});
  const [revealedQuiz, setRevealedQuiz] = useState({});
  const [notes, setNotes] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("math-ai-course-progress") || "{}");
      setCompleted(saved.completed || {});
      setNotes(saved.notes || "");
    } catch {
      // Ignore localStorage errors in restricted environments.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("math-ai-course-progress", JSON.stringify({ completed, notes }));
    } catch {
      // Ignore localStorage errors in restricted environments.
    }
  }, [completed, notes]);

  const module = modules[activeModule];
  const completedCount = Object.values(completed).filter(Boolean).length;
  const progress = Math.round((completedCount / modules.length) * 100);

  const toggleCompleted = (id) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 text-slate-900 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-xl">
          <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:p-8">
            <div>
              <p className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-sm font-medium ring-1 ring-white/20">Beginner-friendly Applied AI prep</p>
              <h1 className="max-w-3xl text-3xl font-black tracking-tight md:text-5xl">Maths & Stats Behind Data Science and AI</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
                A guided, interactive course with plain-English explanations, Python labs, check-yourself questions, and a focused study schedule.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-200">
                <span className="rounded-full bg-white/10 px-3 py-1">Probability</span>
                <span className="rounded-full bg-white/10 px-3 py-1">Bayes’ Rule</span>
                <span className="rounded-full bg-white/10 px-3 py-1">Matrices</span>
                <span className="rounded-full bg-white/10 px-3 py-1">Image arrays</span>
                <span className="rounded-full bg-white/10 px-3 py-1">PCA</span>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-3xl bg-white p-5 text-slate-950">
              <div className="text-center">
                <ProgressRing value={progress} />
                <p className="mt-2 text-sm font-medium text-slate-600">{completedCount} of {modules.length} modules complete</p>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-4">
            <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <h2 className="mb-3 text-lg font-bold">Course modules</h2>
              <div className="space-y-2">
                {modules.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setActiveModule(m.id)}
                    className={cn(
                      "w-full rounded-2xl p-3 text-left transition hover:bg-slate-100",
                      activeModule === m.id ? "bg-slate-950 text-white hover:bg-slate-900" : "bg-slate-50 text-slate-800"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold">Module {m.id}</span>
                      <span className={cn("text-xs", activeModule === m.id ? "text-slate-300" : "text-slate-500")}>{m.time}</span>
                    </div>
                    <div className="mt-1 text-sm opacity-90">{m.title}</div>
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <span className={cn("h-2 w-2 rounded-full", completed[m.id] ? "bg-emerald-400" : "bg-slate-300")} />
                      {completed[m.id] ? "Completed" : m.theme}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-lg font-bold">My study notes</h2>
              <p className="mt-1 text-sm text-slate-600">Use this space for formulas, confusing ideas, and examples from work.</p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Example: Prevalence means how common something is before the test..."
                className="mt-3 min-h-40 w-full rounded-2xl border border-slate-200 p-3 text-sm outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </aside>

          <div className="space-y-6">
            <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 md:p-6">
              <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Module {module.id} • {module.theme}</p>
                  <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-950">{module.title}</h2>
                  <p className="mt-1 text-sm text-slate-500">Estimated time: {module.time}</p>
                </div>
                <button
                  onClick={() => toggleCompleted(module.id)}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm font-bold transition",
                    completed[module.id] ? "bg-emerald-100 text-emerald-900 hover:bg-emerald-200" : "bg-slate-950 text-white hover:bg-slate-800"
                  )}
                >
                  {completed[module.id] ? "Marked complete" : "Mark complete"}
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <h3 className="font-bold text-slate-950">The Story</h3>
                  <p className="mt-2 leading-7 text-slate-700">{module.story}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <h3 className="font-bold text-slate-950">The Idea</h3>
                  <p className="mt-2 leading-7 text-slate-700">{module.idea}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 md:col-span-2">
                  <h3 className="font-bold text-slate-950">Concrete Example</h3>
                  <p className="mt-2 leading-7 text-slate-700">{module.example}</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-950 p-4 text-white">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="font-bold">Python Lab</h3>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">Copy into Jupyter</span>
                </div>
                <pre className="overflow-x-auto rounded-xl bg-black/30 p-4 text-sm leading-6 text-slate-100"><code>{module.lab}</code></pre>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                  <h3 className="font-bold">Check Yourself</h3>
                  <div className="mt-3 space-y-3">
                    {module.checks.map((item, index) => {
                      const key = `${module.id}-${index}`;
                      return (
                        <div key={key} className="rounded-xl bg-slate-50 p-3">
                          <p className="font-medium text-slate-800">{index + 1}. {item.q}</p>
                          <button
                            onClick={() => setRevealedChecks((prev) => ({ ...prev, [key]: !prev[key] }))}
                            className="mt-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white"
                          >
                            {revealedChecks[key] ? "Hide answer" : "Show answer"}
                          </button>
                          {revealedChecks[key] && <p className="mt-2 text-sm text-slate-700">{item.a}</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-200">
                  <h3 className="font-bold text-amber-950">Mini-Project</h3>
                  <p className="mt-2 leading-7 text-amber-900">{module.project}</p>
                  <p className="mt-4 rounded-xl bg-white/70 p-3 text-sm text-amber-900">
                    Best practice: after finishing, explain your answer in plain English before moving to the next module.
                  </p>
                </div>
              </div>
            </section>

            <BayesCalculator />
          </div>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 md:p-6">
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Study schedule</p>
            <h2 className="text-2xl font-black text-slate-950">Focused plan through May 16</h2>
            <p className="mt-1 text-slate-600">The main learning load is May 14–15. May 16 is intentionally light review.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {schedule.map((day) => (
              <div key={day.day} className="rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <h3 className="text-lg font-black">{day.day}</h3>
                <p className="mt-1 text-sm font-medium text-slate-500">{day.focus}</p>
                <div className="mt-4 space-y-3">
                  {day.blocks.map((block, index) => (
                    <div key={index} className="rounded-2xl bg-white p-3 shadow-sm">
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">{block.time}</span>
                      <p className="mt-2 text-sm leading-6 text-slate-700">{block.task}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 md:p-6">
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Final practice</p>
            <h2 className="text-2xl font-black text-slate-950">7-question quiz</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {finalQuiz.map((item, index) => (
              <div key={index} className="rounded-2xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-800">{index + 1}. {item.q}</p>
                <button
                  onClick={() => setRevealedQuiz((prev) => ({ ...prev, [index]: !prev[index] }))}
                  className="mt-3 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white"
                >
                  {revealedQuiz[index] ? "Hide answer" : "Show answer"}
                </button>
                {revealedQuiz[index] && <p className="mt-2 text-sm leading-6 text-slate-700">{item.a}</p>}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
