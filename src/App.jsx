import { useMemo, useState } from 'react'
import modules from './data/modules'
import finalQuiz from './data/finalQuiz'
import schedule from './data/schedule'
import { useLocalStorage } from './hooks/useLocalStorage'
import { ProgressRing } from './components/ProgressRing'
import { Sidebar } from './components/Sidebar'
import { ModuleViewer } from './components/ModuleViewer'
import { BayesCalculator } from './components/BayesCalculator'
import { StudySchedule } from './components/StudySchedule'
import { FinalQuiz } from './components/FinalQuiz'

const nextSteps = [
  {
    title: 'Python tools',
    detail: 'Focus next on NumPy, Pandas, and Matplotlib. You will use them constantly.',
  },
  {
    title: 'Math intuition',
    detail:
      'Use 3Blue1Brown’s “Essence of Linear Algebra” and Khan Academy statistics and probability for extra repetition.',
  },
  {
    title: 'Machine learning practice',
    detail:
      'Use the scikit-learn tutorial and train a small classifier on the digits dataset you saw in the PCA module.',
  },
  {
    title: 'Reading',
    detail:
      'A strong gentle bridge text is “Mathematics for Machine Learning” by Deisenroth and co-authors.',
  },
]

const defaultProgress = modules.reduce((accumulator, module) => {
  accumulator[module.id] = false
  return accumulator
}, {})

export default function App() {
  const [activeModule, setActiveModule] = useState(0)
  const [completed, setCompleted] = useLocalStorage('math-ai-course-completed', defaultProgress)
  const [notes, setNotes] = useLocalStorage('math-ai-course-notes', '')

  const completedCount = useMemo(
    () => Object.values(completed).filter(Boolean).length,
    [completed],
  )
  const progress = Math.round((completedCount / modules.length) * 100)
  const module = modules[activeModule]

  const toggleCompleted = (id) => {
    setCompleted((previous) => ({
      ...previous,
      [id]: !previous[id],
    }))
  }

  return (
    <main className="min-h-screen px-4 py-4 text-slate-900 md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="hero-shell overflow-hidden rounded-[2rem] text-white shadow-2xl">
          <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:p-8">
            <div>
              <p className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-sm font-medium ring-1 ring-white/20">
                Beginner-friendly Applied AI prep
              </p>
              <h1 className="max-w-4xl text-3xl font-black tracking-tight md:text-5xl">
                Maths &amp; Stats Behind Data Science and AI
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
                A guided, interactive course with plain-English explanations, formulas, Python
                labs, check-yourself questions, and a focused study schedule.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-200">
                <span className="rounded-full bg-white/10 px-3 py-1">Probability</span>
                <span className="rounded-full bg-white/10 px-3 py-1">Bayes&apos; Rule</span>
                <span className="rounded-full bg-white/10 px-3 py-1">Matrices</span>
                <span className="rounded-full bg-white/10 px-3 py-1">Image arrays</span>
                <span className="rounded-full bg-white/10 px-3 py-1">PCA</span>
              </div>
            </div>

            <div className="flex items-center justify-center rounded-3xl bg-white p-5 text-slate-950">
              <div className="text-center">
                <ProgressRing value={progress} />
                <p className="mt-2 text-sm font-medium text-slate-600">
                  {completedCount} of {modules.length} modules complete
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="card grid gap-5 p-5 md:grid-cols-[1.1fr_0.9fr] md:p-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              How to use this course
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">
              One repeated rhythm for every module
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              Each module follows the same pattern: The Story, The Idea, a Concrete Example,
              Python Lab, Check Yourself questions, and a Mini-Project. The point is to move from
              plain English to numbers to code without losing the meaning of the problem.
            </p>
            <p className="mt-3 leading-7 text-slate-700">
              Estimated total time is about 6 to 8 hours, split into bite-size sessions. You do
              not need to rush. Use the notes box to rewrite ideas in your own words.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
            <h3 className="text-lg font-black text-slate-950">Course rhythm</h3>
            <div className="mt-4 grid gap-3">
              {[
                'The Story: why we care, in plain English',
                'The Idea: the math, gently',
                'Concrete Example: real numbers worked out',
                'Python Lab: copy-paste code you can run',
                'Check Yourself: active recall with revealable answers',
                'Mini-Project: a tiny challenge you do yourself',
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-white p-3 text-sm leading-6 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <Sidebar
            activeModule={activeModule}
            completed={completed}
            modules={modules}
            notes={notes}
            onNotesChange={setNotes}
            onSelectModule={setActiveModule}
          />

          <div className="space-y-6">
            <ModuleViewer
              module={module}
              isCompleted={Boolean(completed[module.id])}
              onToggleComplete={() => toggleCompleted(module.id)}
            />
            <BayesCalculator />
          </div>
        </section>

        <StudySchedule schedule={schedule} />
        <FinalQuiz quizItems={finalQuiz} />

        <section className="card p-5 md:p-6">
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Where to go next
            </p>
            <h2 className="text-2xl font-black text-slate-950">
              Keep the momentum after this prep course
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {nextSteps.map((step) => (
              <div key={step.title} className="rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <h3 className="font-bold text-slate-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{step.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
