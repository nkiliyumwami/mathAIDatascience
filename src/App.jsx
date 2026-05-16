import { useMemo, useState } from 'react'
import { courseModules, finalQuiz, schedulePlan } from './data/courseContent'
import { useLocalStorage } from './hooks/useLocalStorage'
import { Sidebar } from './components/Sidebar'
import { HeroSection } from './components/HeroSection'
import { ProgressPanel } from './components/ProgressPanel'
import { ModuleSection } from './components/ModuleSection'
import { BayesCalculator } from './components/BayesCalculator'
import { StudySchedule } from './components/StudySchedule'
import { FinalQuiz } from './components/FinalQuiz'
import { NotesPanel } from './components/NotesPanel'

const defaultProgress = courseModules.reduce((accumulator, module) => {
  accumulator[module.id] = false
  return accumulator
}, {})

export default function App() {
  const [activeSection, setActiveSection] = useState('overview')
  const [completedModules, setCompletedModules] = useLocalStorage(
    'ai-prep-progress',
    defaultProgress,
  )
  const [notes, setNotes] = useLocalStorage('ai-prep-notes', '')

  const completedCount = Object.values(completedModules).filter(Boolean).length
  const completionRate = Math.round((completedCount / courseModules.length) * 100)

  const activeModule = useMemo(
    () => courseModules.find((module) => module.id === activeSection),
    [activeSection],
  )

  const toggleModuleComplete = (moduleId) => {
    setCompletedModules((current) => ({
      ...current,
      [moduleId]: !current[moduleId],
    }))
  }

  return (
    <div className="min-h-screen text-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 md:px-6 lg:flex-row lg:px-8">
        <Sidebar
          activeSection={activeSection}
          completionRate={completionRate}
          completedModules={completedModules}
          moduleCount={courseModules.length}
          onSelect={setActiveSection}
          modules={courseModules}
        />

        <main className="flex-1 space-y-6 pb-10">
          <HeroSection
            completedCount={completedCount}
            moduleCount={courseModules.length}
            onJumpToModules={() => setActiveSection(courseModules[0].id)}
          />

          <ProgressPanel
            completionRate={completionRate}
            completedCount={completedCount}
            moduleCount={courseModules.length}
            nextModule={courseModules.find((module) => !completedModules[module.id])}
          />

          <section id="overview" className="surface overflow-hidden p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
              <div className="space-y-4">
                <p className="eyebrow">Course Map</p>
                <h2 className="section-title">A practical path into AI and data science</h2>
                <p className="max-w-3xl text-sm leading-7 text-ink/80 md:text-base">
                  This study app is built for learners starting from scratch. You will move from
                  math comfort and probability thinking into Python habits, machine learning
                  intuition, and an applied capstone mindset. Each module tells a story, explains
                  the idea, shows a concrete example, gives you a Python lab, and ends with a
                  mini-project so the material feels usable rather than abstract.
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    ['6 modules', 'Sequenced from foundations to model thinking'],
                    ['Bayes lab', 'Change prevalence, sensitivity, and specificity live'],
                    ['Saved notes', 'Keep reflections and reminders in your browser'],
                  ].map(([title, description]) => (
                    <div key={title} className="rounded-2xl bg-mist p-4">
                      <h3 className="font-display text-lg font-semibold">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink/75">{description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <NotesPanel notes={notes} setNotes={setNotes} activeModule={activeModule} />
            </div>
          </section>

          <section className="space-y-6">
            {courseModules.map((module, index) => (
              <ModuleSection
                key={module.id}
                index={index}
                isActive={activeSection === module.id}
                isComplete={completedModules[module.id]}
                module={module}
                onActivate={() => setActiveSection(module.id)}
                onToggleComplete={() => toggleModuleComplete(module.id)}
              />
            ))}
          </section>

          <BayesCalculator onActivate={() => setActiveSection('bayes')} />
          <StudySchedule items={schedulePlan} />
          <FinalQuiz quizItems={finalQuiz} />
        </main>
      </div>
    </div>
  )
}
