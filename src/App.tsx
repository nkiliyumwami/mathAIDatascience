import { useMemo, useState } from 'react'
import {
  Binary,
  BookOpenCheck,
  BrainCircuit,
  CalendarClock,
  ChevronRight,
  GraduationCap,
  LayoutGrid,
  Percent,
  Sigma,
  Target,
} from 'lucide-react'
import { BayesCalculator } from '@/components/BayesCalculator'
import { CapstoneProject } from '@/components/CapstoneProject'
import { FinalPracticeQuiz } from '@/components/FinalPracticeQuiz'
import { ModuleViewer } from '@/components/ModuleViewer'
import { StudyNotesPanel } from '@/components/StudyNotesPanel'
import { StudySchedule } from '@/components/StudySchedule'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { capstoneProject, courseModules, finalQuiz, studySchedule } from '@/data/courseModules'
import { useLocalStorage } from '@/hooks/useLocalStorage'

const overviewPoints = [
  'Start with intuition before formulas.',
  'Learn probability, statistics, Python, and ML in one connected path.',
  'Track progress locally so you can study in small sessions.',
]

const quickWins = [
  {
    title: 'Beginner-friendly sequence',
    body: 'The modules move from foundations to probability, statistics, Python, and machine learning.',
    icon: BookOpenCheck,
  },
  {
    title: 'Practical examples',
    body: 'Each lesson uses realistic program and community-service scenarios instead of abstract textbook-only language.',
    icon: Target,
  },
  {
    title: 'Interactive revision',
    body: 'You can mark modules done, use a Bayes calculator, work a study plan, and test yourself with a final quiz.',
    icon: BrainCircuit,
  },
]

const moduleIconMap = {
  foundations: LayoutGrid,
  probability: Percent,
  statistics: Sigma,
  matrices: Target,
  'python-ml': Binary,
} as const

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState(courseModules[0].id)
  const [completedModuleIds, setCompletedModuleIds] = useLocalStorage<string[]>('ai-prep-completed-modules', [])
  const [completedScheduleTaskIds, setCompletedScheduleTaskIds] = useLocalStorage<string[]>(
    'ai-prep-completed-schedule-tasks',
    [],
  )
  const [selectedLessonAnswers] = useLocalStorage<Record<string, string>>('ai-prep-sublesson-answers', {})
  const [selectedModuleExerciseAnswers] = useLocalStorage<Record<string, string>>(
    'ai-prep-module-exercise-answers',
    {},
  )
  const [finalQuizAnswers] = useLocalStorage<Record<string, string>>('ai-prep-final-quiz-answers', {})

  const activeModule = courseModules.find((module) => module.id === activeModuleId) ?? courseModules[0]
  const totalScheduleTasks = studySchedule.reduce((count, entry) => count + entry.tasks.length, 0)
  const totalSubLessonChecks = courseModules.reduce((count, module) => count + module.subLessons.length, 0)
  const totalModuleExercises = courseModules.reduce((count, module) => count + module.questions.length, 0)
  const completedSubLessonChecks = courseModules.reduce((count, module) => {
    return (
      count +
      module.subLessons.filter(
        (lesson, index) =>
          selectedLessonAnswers[`${module.id}-sublesson-${index}`] === lesson.quickCheck.correctOption,
      ).length
    )
  }, 0)
  const completedModuleExercises = courseModules.reduce((count, module) => {
    return (
      count +
      module.questions.filter(
        (question, index) =>
          selectedModuleExerciseAnswers[`${module.id}-exercise-${index}`] === question.correctOption,
      ).length
    )
  }, 0)
  const completedFinalQuizAnswers = finalQuiz.filter(
    (question) => finalQuizAnswers[question.id] === question.answer,
  ).length
  const totalTrackableItems =
    courseModules.length + totalScheduleTasks + totalSubLessonChecks + totalModuleExercises + finalQuiz.length
  const completedItems =
    completedModuleIds.length +
    completedScheduleTaskIds.length +
    completedSubLessonChecks +
    completedModuleExercises +
    completedFinalQuizAnswers
  const progressValue = Math.round((completedItems / totalTrackableItems) * 100)

  const moduleProgressLabel = useMemo(
    () => `${completedModuleIds.length}/${courseModules.length} modules complete`,
    [completedModuleIds.length],
  )
  const lessonProgressLabel = `${completedSubLessonChecks}/${totalSubLessonChecks} checks correct`
  const exerciseProgressLabel = `${completedModuleExercises}/${totalModuleExercises} exercises correct`
  const quizProgressLabel = `${completedFinalQuizAnswers}/${finalQuiz.length} quiz correct`
  const recommendedNextLesson = useMemo(() => {
    for (const module of courseModules) {
      for (const [index, lesson] of module.subLessons.entries()) {
        if (selectedLessonAnswers[`${module.id}-sublesson-${index}`] !== lesson.quickCheck.correctOption) {
          return {
            moduleId: module.id,
            title: lesson.title,
            reason: `This is the first sub-lesson that is not yet mastered in ${module.shortLabel}. Revisiting it should improve your progress fastest.`,
          }
        }
      }

      for (const [index, question] of module.questions.entries()) {
        if (selectedModuleExerciseAnswers[`${module.id}-exercise-${index}`] !== question.correctOption) {
          return {
            moduleId: module.id,
            title: `${module.shortLabel}: end-of-module exercise`,
            reason: `One of the module-end checks in ${module.shortLabel} is still incomplete or incorrect.`,
          }
        }
      }
    }

    return null
  }, [selectedLessonAnswers, selectedModuleExerciseAnswers])

  const toggleModuleComplete = (moduleId: string) => {
    setCompletedModuleIds((current) =>
      current.includes(moduleId) ? current.filter((item) => item !== moduleId) : [...current, moduleId],
    )
  }

  const toggleScheduleTask = (taskId: string) => {
    setCompletedScheduleTaskIds((current) =>
      current.includes(taskId) ? current.filter((item) => item !== taskId) : [...current, taskId],
    )
  }

  const resetAllProgress = () => {
    setCompletedModuleIds([])
    setCompletedScheduleTaskIds([])
    localStorage.setItem('ai-prep-sublesson-answers', JSON.stringify({}))
    localStorage.setItem('ai-prep-sublesson-completions', JSON.stringify([]))
    localStorage.setItem('ai-prep-module-exercise-answers', JSON.stringify({}))
    localStorage.setItem('ai-prep-module-exercise-completions', JSON.stringify([]))
    localStorage.setItem('ai-prep-final-quiz-answers', JSON.stringify({}))
    localStorage.setItem('ai-prep-final-quiz-submitted', JSON.stringify(false))
    window.location.reload()
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f5fbff_0%,#eef7f2_40%,#fffaf1_100%)] px-4 py-5 text-slate-950 md:px-6 md:py-8">
      <div className="mx-auto max-w-[1500px] space-y-6">
        <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.22),transparent_28%),linear-gradient(135deg,#062b3d_0%,#0f172a_38%,#15384d_100%)] px-6 py-7 text-white shadow-[0_30px_90px_rgba(15,23,42,0.24)] md:px-8 md:py-9">
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr] xl:items-center">
            <div>
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.3em] text-cyan-200">
                Applied AI Prep
              </div>
              <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
                A beginner-friendly study app for math, probability, Python, and machine learning
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-200 md:text-lg">
                This single-page course helps a new learner build the practical foundations for an Applied AI &amp; Data Science program without assuming prior confidence in math or code.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {overviewPoints.map((point) => (
                  <div key={point} className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-cyan-50">
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-white/10 bg-white/10 text-white shadow-none backdrop-blur-md">
              <CardHeader>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">Your progress</p>
                <CardTitle className="text-5xl font-black text-white">{progressValue}%</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-7 text-slate-200">
                  Progress now combines module completion, sub-lesson mastery, module exercises, study tasks, and final quiz results. Everything is saved in local storage.
                </p>
                <Progress value={progressValue} className="bg-white/15" />
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  <ProgressStat label="Modules" value={moduleProgressLabel} />
                  <ProgressStat label="Study tasks" value={`${completedScheduleTaskIds.length}/${totalScheduleTasks} done`} />
                  <ProgressStat label="Lesson checks" value={lessonProgressLabel} />
                  <ProgressStat label="Exercises" value={exerciseProgressLabel} />
                  <ProgressStat label="Final quiz" value={quizProgressLabel} />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {quickWins.map((item) => (
            <Card key={item.title} className="border-white/70 bg-white/82 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
              <CardHeader>
                <item.icon className="h-5 w-5 text-cyan-700" />
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7 text-slate-600">{item.body}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
          <aside className="xl:sticky xl:top-6 xl:self-start">
            <Card className="border-white/70 bg-white/88 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-cyan-700" />
                  <CardTitle>Module Navigation</CardTitle>
                </div>
                <p className="text-sm leading-7 text-slate-600">
                  Follow the course in order. Each module includes a story, concept, example, Python lab, self-checks, and mini-project.
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {courseModules.map((module, index) => {
                  const isActive = activeModuleId === module.id
                  const isComplete = completedModuleIds.includes(module.id)
                  const Icon = moduleIconMap[module.id as keyof typeof moduleIconMap]
                  const completedChecksForModule =
                    module.subLessons.filter(
                      (lesson, lessonIndex) =>
                        selectedLessonAnswers[`${module.id}-sublesson-${lessonIndex}`] === lesson.quickCheck.correctOption,
                    ).length +
                    module.questions.filter(
                      (question, questionIndex) =>
                        selectedModuleExerciseAnswers[`${module.id}-exercise-${questionIndex}`] === question.correctOption,
                    ).length
                  const totalChecksForModule = module.subLessons.length + module.questions.length
                  return (
                    <button
                      key={module.id}
                      type="button"
                      onClick={() => setActiveModuleId(module.id)}
                      className={`flex w-full items-center justify-between rounded-[1.5rem] border px-4 py-4 text-left transition ${
                        isActive
                          ? 'border-cyan-600 bg-cyan-50 shadow-[0_10px_30px_rgba(8,145,178,0.15)]'
                          : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                          <Icon className="h-4 w-4" />
                          <span>Module {index + 1}</span>
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">{module.shortLabel}</p>
                        <p className="mt-1 text-xs text-slate-500">{module.duration}</p>
                        <p className="mt-2 text-xs text-slate-500">
                          {completedChecksForModule}/{totalChecksForModule} checks correct
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${isComplete ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
                          {isComplete ? 'Done' : 'Open'}
                        </span>
                        <ChevronRight className="h-4 w-4 text-slate-500" />
                      </div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>
          </aside>

          <div className="space-y-6">
            <section>
              <div className="mb-4 flex items-center gap-2">
                <BookOpenCheck className="h-5 w-5 text-cyan-700" />
                <h2 className="text-2xl font-black tracking-tight text-slate-950">Home / Overview</h2>
              </div>
              <Card className="border-white/70 bg-white/88 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                <CardContent className="grid gap-6 p-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-700">What you will learn</p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      You will move from basic data thinking to probability, descriptive statistics, beginner Python, and machine learning readiness. The design assumes you are capable but early in the journey.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-700">How to use the app</p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      Study one module at a time, reveal answers only after you attempt each prompt, and use the schedule and quiz for spaced repetition. Mark sections complete as you go.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <StudyNotesPanel recommendation={recommendedNextLesson} onJumpToModule={setActiveModuleId} />
            </section>

            <section>
              <Card className="border-white/70 bg-white/88 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                <CardHeader>
                  <CardTitle className="text-xl">Reset Progress</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <p className="text-sm leading-7 text-slate-600">
                    Clear all saved learning state, including sub-lesson answers, module exercises, study tasks, and final quiz progress.
                  </p>
                  <button
                    type="button"
                    onClick={resetAllProgress}
                    className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                  >
                    Reset all progress
                  </button>
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="mb-4 flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-cyan-700" />
                <h2 className="text-2xl font-black tracking-tight text-slate-950">Current Module</h2>
              </div>
              <ModuleViewer
                module={activeModule}
                completed={completedModuleIds.includes(activeModule.id)}
                onToggleComplete={toggleModuleComplete}
              />
            </section>

            <section>
              <div className="mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-cyan-700" />
                <h2 className="text-2xl font-black tracking-tight text-slate-950">Bayes Practice</h2>
              </div>
              <BayesCalculator />
            </section>

            <section>
              <div className="mb-4 flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-cyan-700" />
                <h2 className="text-2xl font-black tracking-tight text-slate-950">Study Schedule</h2>
              </div>
              <StudySchedule
                schedule={studySchedule}
                completedTaskIds={completedScheduleTaskIds}
                onToggleTask={toggleScheduleTask}
              />
            </section>

            <section>
              <div className="mb-4 flex items-center gap-2">
                <BookOpenCheck className="h-5 w-5 text-cyan-700" />
                <h2 className="text-2xl font-black tracking-tight text-slate-950">Final Quiz</h2>
              </div>
              <FinalPracticeQuiz questions={finalQuiz} />
            </section>

            <section>
              <div className="mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-cyan-700" />
                <h2 className="text-2xl font-black tracking-tight text-slate-950">Capstone Project</h2>
              </div>
              <CapstoneProject project={capstoneProject} />
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

function ProgressStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">{label}</p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  )
}
