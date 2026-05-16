import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpenCheck, BrainCircuit, UsersRound } from 'lucide-react'
import { CourseSidebar } from '@/components/CourseSidebar'
import { FoundationsModule } from '@/components/FoundationsModule'
import { ProbabilityModule } from '@/components/ProbabilityModule'
import { StatisticsModule } from '@/components/StatisticsModule'
import { MatricesModule } from '@/components/MatricesModule'
import { AppliedConnections } from '@/components/AppliedConnections'
import { UseCasesSection } from '@/components/UseCasesSection'
import { PracticeZone } from '@/components/PracticeZone'
import { QASection } from '@/components/QASection'
import { NextStepsSection } from '@/components/NextStepsSection'
import { WelcomeSection } from '@/components/WelcomeSection'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import {
  chartData,
  countyDemandData,
  exercises,
  faqs,
  foundationCards,
  glossary,
  learnerProfiles,
  matrixRecords,
  misconceptionCallouts,
  roadmap,
  sectionOrder,
  sectionTitles,
  serviceDatasets,
  useCases,
} from '@/data/courseData'

const exerciseIdsBySection = exercises.reduce<Record<string, string[]>>((accumulator, exercise) => {
  accumulator[exercise.moduleId] = [...(accumulator[exercise.moduleId] ?? []), exercise.id]
  return accumulator
}, {})

export default function App() {
  const [selectedProfile, setSelectedProfile] = useLocalStorage('ai-primer-profile', learnerProfiles[0].id)
  const [completedExerciseIds, setCompletedExerciseIds] = useLocalStorage<string[]>(
    'ai-primer-completed-exercises',
    [],
  )
  const [visitedSections, setVisitedSections] = useLocalStorage<string[]>('ai-primer-visited-sections', [
    'welcome',
  ])
  const [notes, setNotes] = useLocalStorage('ai-primer-notes', '')
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('ai-primer-theme', 'dark')
  const [activeSection, setActiveSection] = useState<string>('welcome')
  const observerRef = useRef<IntersectionObserver | null>(null)

  const completeExercise = (exerciseId: string) => {
    setCompletedExerciseIds((current) =>
      current.includes(exerciseId) ? current : [...current, exerciseId],
    )
  }

  const progressValue = Math.round(
    ((completedExerciseIds.length / exercises.length) * 0.75 +
      (visitedSections.length / sectionOrder.length) * 0.25) *
      100,
  )

  const sectionCompletion = useMemo(() => {
    return sectionOrder.reduce<Record<string, boolean>>((accumulator, sectionId) => {
      const sectionExercises = exerciseIdsBySection[sectionId] ?? []

      if (sectionExercises.length > 0) {
        accumulator[sectionId] = sectionExercises.every((id) => completedExerciseIds.includes(id))
      } else {
        accumulator[sectionId] = visitedSections.includes(sectionId)
      }

      return accumulator
    }, {})
  }, [completedExerciseIds, visitedSections])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (!visible) {
          return
        }

        const sectionId = visible.target.id
        setActiveSection(sectionId)
        setVisitedSections((current) =>
          current.includes(sectionId) ? current : [...current, sectionId],
        )
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.2 },
    )

    sectionOrder.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        observerRef.current?.observe(element)
      }
    })

    return () => observerRef.current?.disconnect()
  }, [setVisitedSections])

  const jumpToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className={theme === 'light' ? 'theme-light' : 'theme-dark'}>
      <main className="min-h-screen px-4 py-4 md:px-6 md:py-6">
        <div className="mx-auto max-w-[1600px] space-y-6">
          <motion.header
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel overflow-hidden px-6 py-6 md:px-8"
          >
            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr] xl:items-center">
              <div>
                <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">
                  Beginner-first learning product
                </div>
                <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
                  AI Primer: The Must-Know Mathematics &amp; Statistics Behind AI
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                  Learn probability, descriptive statistics, and matrices through guided simulations,
                  data labs, matrix builders, chart reading, and fictional service scenarios inspired
                  by refugee resettlement work in Massachusetts and across the USA.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      icon: BrainCircuit,
                      title: 'Intuition-first teaching',
                      body: 'Concepts start in plain language before moving into formulas or numeric structures.',
                    },
                    {
                      icon: UsersRound,
                      title: 'Human-centered examples',
                      body: 'The app uses humane, fictional cases around housing, schools, interpretation, and referrals.',
                    },
                    {
                      icon: BookOpenCheck,
                      title: 'Guided practice',
                      body: `${exercises.length} graded exercises with hints, retry flows, and explanations.`,
                    },
                  ].map((item) => (
                    <Card key={item.title} className="border-white/10 bg-white/5">
                      <CardContent className="p-5">
                        <item.icon className="h-5 w-5 text-sky-300" />
                        <h2 className="mt-3 font-semibold text-white">{item.title}</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{item.body}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Card className="border-white/10 bg-slate-950/70">
                <CardContent className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">
                    Learning signal
                  </p>
                  <p className="mt-3 text-4xl font-black text-white">{progressValue}%</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Progress blends completed exercises with visited sections so learners can keep momentum even before they finish every practice item.
                  </p>
                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                      <span>{completedExerciseIds.length} exercises finished</span>
                      <span>{visitedSections.length}/{sectionOrder.length} sections visited</span>
                    </div>
                    <Progress value={progressValue} />
                  </div>
                  <div className="mt-6 space-y-2">
                    {sectionOrder.map((sectionId) => (
                      <div
                        key={sectionId}
                        className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2 text-sm"
                      >
                        <span className="text-slate-200">{sectionTitles[sectionId]}</span>
                        <span className={sectionCompletion[sectionId] ? 'text-emerald-300' : 'text-slate-500'}>
                          {sectionCompletion[sectionId] ? 'Ready' : 'In progress'}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.header>

          <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
            <CourseSidebar
              activeSection={activeSection}
              completedExercises={completedExerciseIds.length}
              notes={notes}
              onNotesChange={setNotes}
              onSectionSelect={jumpToSection}
              progressValue={progressValue}
              sectionCompletion={sectionCompletion}
              theme={theme}
              toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              totalExercises={exercises.length}
            />

            <div className="space-y-6">
              <WelcomeSection
                learnerProfiles={learnerProfiles}
                selectedProfile={selectedProfile}
                onProfileSelect={setSelectedProfile}
                onStartLearning={() => jumpToSection('foundations')}
                progressValue={progressValue}
              />

              <FoundationsModule
                cards={foundationCards}
                glossary={glossary}
                misconceptions={misconceptionCallouts}
                exercises={exercises.filter((exercise) => exercise.moduleId === 'foundations')}
                completedExerciseIds={completedExerciseIds}
                onCompleteExercise={completeExercise}
              />

              <ProbabilityModule
                exercises={exercises.filter((exercise) => exercise.moduleId === 'probability')}
                completedExerciseIds={completedExerciseIds}
                onCompleteExercise={completeExercise}
              />

              <StatisticsModule
                datasets={serviceDatasets}
                chartData={chartData}
                exercises={exercises.filter((exercise) => exercise.moduleId === 'statistics')}
                completedExerciseIds={completedExerciseIds}
                onCompleteExercise={completeExercise}
              />

              <MatricesModule
                records={matrixRecords}
                countyDemandData={countyDemandData}
                exercises={exercises.filter((exercise) => exercise.moduleId === 'matrices')}
                completedExerciseIds={completedExerciseIds}
                onCompleteExercise={completeExercise}
              />

              <AppliedConnections
                exercises={exercises.filter((exercise) => exercise.moduleId === 'ai-connections')}
                completedExerciseIds={completedExerciseIds}
                onCompleteExercise={completeExercise}
              />

              <UseCasesSection useCases={useCases} />

              <PracticeZone
                exercises={exercises.filter((exercise) => exercise.moduleId === 'practice')}
                completedExerciseIds={completedExerciseIds}
                onCompleteExercise={completeExercise}
              />

              <QASection items={faqs} />
              <NextStepsSection roadmap={roadmap} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
