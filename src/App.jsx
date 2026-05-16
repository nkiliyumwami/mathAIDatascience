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
      </div>
    </main>
  )
}
