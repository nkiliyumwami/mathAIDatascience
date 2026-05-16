import type { ReactNode } from 'react'
import { useMemo } from 'react'
import {
  Binary,
  BriefcaseBusiness,
  CheckCircle2,
  Circle,
  Cpu,
  GraduationCap,
  LayoutGrid,
  Lightbulb,
  LockKeyhole,
  NotebookPen,
  Percent,
  Sigma,
  TerminalSquare,
} from 'lucide-react'
import { CodeBlock } from '@/components/CodeBlock'
import { MatrixLab } from '@/components/MatrixLab'
import { ProbabilityLab } from '@/components/ProbabilityLab'
import { PythonMlLab } from '@/components/PythonMlLab'
import { StatisticsLab } from '@/components/StatisticsLab'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { CourseModule } from '@/data/courseModules'
import { useLocalStorage } from '@/hooks/useLocalStorage'

interface ModuleViewerProps {
  module: CourseModule
  completed: boolean
  onToggleComplete: (moduleId: string) => void
}

export function ModuleViewer({ module, completed, onToggleComplete }: ModuleViewerProps) {
  const [selectedLessonAnswers, setSelectedLessonAnswers] = useLocalStorage<Record<string, string>>(
    'ai-prep-sublesson-answers',
    {},
  )
  const [completedLessonChecks, setCompletedLessonChecks] = useLocalStorage<string[]>(
    'ai-prep-sublesson-completions',
    [],
  )
  const [selectedModuleExerciseAnswers, setSelectedModuleExerciseAnswers] = useLocalStorage<Record<string, string>>(
    'ai-prep-module-exercise-answers',
    {},
  )
  const [completedModuleExerciseChecks, setCompletedModuleExerciseChecks] = useLocalStorage<string[]>(
    'ai-prep-module-exercise-completions',
    [],
  )

  const handleLessonAnswer = (lessonKey: string, option: string, correctOption: string) => {
    setSelectedLessonAnswers((current) => ({ ...current, [lessonKey]: option }))
    if (option === correctOption) {
      setCompletedLessonChecks((current) =>
        current.includes(lessonKey) ? current : [...current, lessonKey],
      )
    }
  }

  const handleModuleExerciseAnswer = (exerciseKey: string, option: string, correctOption: string) => {
    setSelectedModuleExerciseAnswers((current) => ({ ...current, [exerciseKey]: option }))
    if (option === correctOption) {
      setCompletedModuleExerciseChecks((current) =>
        current.includes(exerciseKey) ? current : [...current, exerciseKey],
      )
    }
  }

  const moduleExerciseProgress = useMemo(() => {
    const completedCount = module.questions.filter((_, index) =>
      completedModuleExerciseChecks.includes(`${module.id}-exercise-${index}`),
    ).length

    return `${completedCount}/${module.questions.length} correct`
  }, [completedModuleExerciseChecks, module.id, module.questions])

  const totalChecks = module.subLessons.length + module.questions.length
  const completedChecks = module.subLessons.filter(
    (lesson, index) =>
      selectedLessonAnswers[`${module.id}-sublesson-${index}`] === lesson.quickCheck.correctOption,
  ).length + module.questions.filter(
    (question, index) =>
      selectedModuleExerciseAnswers[`${module.id}-exercise-${index}`] === question.correctOption,
  ).length
  const readyToComplete = completedChecks === totalChecks
  const hero = getModuleHero(module.id)

  return (
    <div className="space-y-5">
      <Card className="border-white/10 bg-white/80 shadow-[0_18px_60px_rgba(15,23,42,0.14)]">
        <CardHeader className="border-b border-slate-200/70">
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className={`overflow-hidden rounded-[1.75rem] border ${hero.border} ${hero.background} px-5 py-5`}>
              <div className="flex items-start gap-4">
                <div className={`rounded-[1.25rem] ${hero.iconWrap} p-3`}>
                  <hero.icon className={`h-6 w-6 ${hero.iconColor}`} />
                </div>
                <div>
                  <p className={`text-xs font-bold uppercase tracking-[0.28em] ${hero.kickerColor}`}>{module.duration}</p>
                  <CardTitle className="mt-2 text-3xl tracking-tight text-slate-950">{module.title}</CardTitle>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">{module.goal}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <HeroStat label="Sub-lessons" value={String(module.subLessons.length)} />
                <HeroStat label="Checks" value={`${completedChecks}/${totalChecks}`} />
                <HeroStat label="Status" value={completed ? 'Complete' : readyToComplete ? 'Ready' : 'In progress'} />
              </div>
            </div>

            <Button
              variant={completed ? 'accent' : readyToComplete ? 'accent' : 'default'}
              className="min-w-44 self-start lg:justify-self-end"
              onClick={() => onToggleComplete(module.id)}
            >
              {completed ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <Circle className="mr-2 h-4 w-4" />}
              {completed ? 'Completed' : readyToComplete ? 'Ready To Complete' : 'Mark Complete'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 pt-6">
          {!completed && readyToComplete ? (
            <div className="rounded-[1.5rem] bg-emerald-50 px-4 py-4 text-sm leading-7 text-emerald-950">
              <span className="font-semibold">Completion suggestion:</span> you have answered all guided checks and module exercises correctly. This module is ready to be marked complete.
            </div>
          ) : null}
          <div className="grid gap-5 xl:grid-cols-2">
            <InfoCard title="The Story" icon={<NotebookPen className="h-5 w-5 text-cyan-700" />}>
              {module.story}
            </InfoCard>
            <InfoCard title="The Idea" icon={<Lightbulb className="h-5 w-5 text-amber-500" />}>
              {module.idea}
            </InfoCard>
          </div>

          <Card className="border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#f8fafc_100%)]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-cyan-700" />
                <CardTitle className="text-xl">Guided Sub-Lessons</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4">
              {module.subLessons.map((lesson, index) => {
                const lessonKey = `${module.id}-sublesson-${index}`
                const selectedOption = selectedLessonAnswers[lessonKey]
                const isCorrect = selectedOption === lesson.quickCheck.correctOption
                const isCompleted = completedLessonChecks.includes(lessonKey)
                return (
                  <div key={lesson.title} className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <h3 className="text-base font-semibold text-slate-950">{lesson.title}</h3>
                      <span className={`w-max rounded-full px-3 py-1 text-xs font-bold ${
                        lesson.level === 'Start'
                          ? 'bg-cyan-100 text-cyan-800'
                          : lesson.level === 'Build'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {lesson.level}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{lesson.explanation}</p>
                    <div className="mt-4 rounded-[1.25rem] bg-cyan-50 px-4 py-4 text-sm leading-7 text-cyan-950">
                      <span className="font-semibold">Example:</span> {lesson.example}
                    </div>
                    <div className="mt-4 rounded-[1.25rem] bg-emerald-50 px-4 py-4 text-sm leading-7 text-emerald-950">
                      <span className="font-semibold">Takeaway:</span> {lesson.takeaway}
                    </div>
                    <div className="mt-4 rounded-[1.25rem] bg-rose-50 px-4 py-4 text-sm leading-7 text-rose-950">
                      <span className="font-semibold">Common mistake:</span> {lesson.commonMistake}
                    </div>
                    <div className="mt-4 rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <p className="max-w-3xl text-sm font-semibold leading-6 text-slate-900">
                          Quick Check: {lesson.quickCheck.prompt}
                        </p>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {isCompleted ? 'Completed' : 'Not yet correct'}
                        </span>
                      </div>
                      <div className="mt-4 grid gap-3">
                        {lesson.quickCheck.options.map((option) => {
                          const isSelected = selectedOption === option
                          const showCorrect = selectedOption !== undefined && option === lesson.quickCheck.correctOption
                          const showIncorrect = isSelected && selectedOption !== lesson.quickCheck.correctOption
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleLessonAnswer(lessonKey, option, lesson.quickCheck.correctOption)}
                              className={`rounded-[1.25rem] border px-4 py-3 text-left text-sm transition ${
                                showCorrect
                                  ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                                  : showIncorrect
                                    ? 'border-amber-500 bg-amber-50 text-amber-900'
                                    : isSelected
                                      ? 'border-cyan-600 bg-cyan-50 text-cyan-900'
                                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                              }`}
                            >
                              {option}
                            </button>
                          )
                        })}
                      </div>
                      {selectedOption ? (
                        <div className={`mt-4 rounded-[1.25rem] px-4 py-4 text-sm leading-7 ${
                          isCorrect ? 'bg-emerald-50 text-emerald-950' : 'bg-amber-50 text-amber-950'
                        }`}>
                          <p className="font-semibold">
                            {isCorrect ? 'Correct.' : `Not quite. Correct answer: ${lesson.quickCheck.correctOption}`}
                          </p>
                          <p className="mt-2">
                            <span className="font-semibold">Answer:</span> {lesson.quickCheck.answer}
                          </p>
                          <p className="mt-2">
                            <span className="font-semibold">Why:</span> {lesson.quickCheck.explanation}
                          </p>
                        </div>
                      ) : (
                        <div className="mt-4 flex items-center gap-2 rounded-[1.25rem] bg-white px-4 py-4 text-sm text-slate-500">
                          <LockKeyhole className="h-4 w-4" />
                          Choose an answer to reveal the explanation.
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-slate-50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-indigo-600" />
                <CardTitle className="text-xl">The Math Behind It</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4">
              {module.mathBehind.map((section) => (
                <div key={section.title} className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4">
                  <h3 className="text-base font-semibold text-slate-950">{section.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{section.body}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-slate-50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <CardTitle className="text-xl">Concrete Examples and Interpretation</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4">
              {module.workedExamples.map((example) => (
                <div key={example.title} className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4">
                  <h3 className="text-base font-semibold text-slate-950">{example.title}</h3>
                  <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-600">
                    {example.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  <div className="mt-4 rounded-[1.25rem] bg-emerald-50 px-4 py-4 text-sm leading-7 text-emerald-950">
                    <span className="font-semibold">Interpretation:</span> {example.interpretation}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-5 xl:grid-cols-2">
            <Card className="border-slate-200 bg-slate-50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-cyan-700" />
                  <CardTitle className="text-xl">How This Applies to Data Science, ML, and AI</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                {module.aiApplications.map((item) => (
                  <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4">
                    <h3 className="text-base font-semibold text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-slate-50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness className="h-5 w-5 text-amber-600" />
                  <CardTitle className="text-xl">Refugee Resettlement Use Cases</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                {module.refugeeUseCases.map((item) => (
                  <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4">
                    <h3 className="text-base font-semibold text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="border-slate-200 bg-slate-50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TerminalSquare className="h-5 w-5 text-indigo-600" />
                <CardTitle className="text-xl">{module.pythonLab.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeBlock code={module.pythonLab.snippet} />
              <p className="text-sm leading-7 text-slate-600">{module.pythonLab.explanation}</p>
            </CardContent>
          </Card>

          {module.id === 'probability' ? <ProbabilityLab /> : null}
          {module.id === 'statistics' ? <StatisticsLab /> : null}
          {module.id === 'matrices' ? <MatrixLab /> : null}
          {module.id === 'python-ml' ? <PythonMlLab /> : null}
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-white/85">
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <CardTitle>Check Yourself: Exercises and Responses</CardTitle>
            <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-800">
              {moduleExerciseProgress}
            </span>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          {module.questions.map((question, index) => {
            const exerciseKey = `${module.id}-exercise-${index}`
            const selectedOption = selectedModuleExerciseAnswers[exerciseKey]
            const isCorrect = selectedOption === question.correctOption
            const isCompleted = completedModuleExerciseChecks.includes(exerciseKey)
            return (
              <div key={question.prompt} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <p className="max-w-3xl text-sm font-semibold leading-6 text-slate-900">{question.prompt}</p>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isCompleted ? 'Completed' : 'Not yet correct'}
                  </span>
                </div>
                <div className="mt-4 grid gap-3">
                  {question.options.map((option) => {
                    const isSelected = selectedOption === option
                    const showCorrect = selectedOption !== undefined && option === question.correctOption
                    const showIncorrect = isSelected && selectedOption !== question.correctOption
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleModuleExerciseAnswer(exerciseKey, option, question.correctOption)}
                        className={`rounded-[1.25rem] border px-4 py-3 text-left text-sm transition ${
                          showCorrect
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                            : showIncorrect
                              ? 'border-amber-500 bg-amber-50 text-amber-900'
                              : isSelected
                                ? 'border-cyan-600 bg-cyan-50 text-cyan-900'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
                {selectedOption ? (
                  <div className={`mt-4 rounded-[1.25rem] px-4 py-4 text-sm leading-7 ${
                    isCorrect ? 'bg-emerald-50 text-emerald-950' : 'bg-amber-50 text-amber-950'
                  }`}>
                    <p className="font-semibold">
                      {isCorrect ? 'Correct.' : `Not quite. Correct answer: ${question.correctOption}`}
                    </p>
                    <p className="mt-2">
                      <span className="font-semibold">Answer:</span> {question.answer}
                    </p>
                    <p className="mt-2">
                      <span className="font-semibold">Why:</span> {question.explanation}
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 flex items-center gap-2 rounded-[1.25rem] bg-white px-4 py-4 text-sm text-slate-500">
                    <LockKeyhole className="h-4 w-4" />
                    Choose an answer to reveal the explanation.
                  </div>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card className="border-emerald-200 bg-[linear-gradient(135deg,rgba(236,253,245,1),rgba(239,246,255,1))]">
        <CardHeader>
          <CardTitle>{module.miniProject.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm leading-7 text-slate-700">{module.miniProject.brief}</p>
          <div className="rounded-[1.25rem] border border-emerald-200 bg-white/80 px-4 py-4 text-sm font-medium leading-6 text-slate-900">
            Deliverable: {module.miniProject.deliverable}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-white/60 bg-white/70 px-4 py-3">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-slate-950">{value}</p>
    </div>
  )
}

function getModuleHero(moduleId: string) {
  switch (moduleId) {
    case 'foundations':
      return {
        icon: LayoutGrid,
        border: 'border-cyan-200',
        background: 'bg-[linear-gradient(135deg,rgba(236,254,255,1),rgba(239,246,255,1))]',
        iconWrap: 'bg-cyan-100',
        iconColor: 'text-cyan-700',
        kickerColor: 'text-cyan-700',
      }
    case 'probability':
      return {
        icon: Percent,
        border: 'border-amber-200',
        background: 'bg-[linear-gradient(135deg,rgba(255,251,235,1),rgba(239,246,255,1))]',
        iconWrap: 'bg-amber-100',
        iconColor: 'text-amber-700',
        kickerColor: 'text-amber-700',
      }
    case 'statistics':
      return {
        icon: Sigma,
        border: 'border-emerald-200',
        background: 'bg-[linear-gradient(135deg,rgba(236,253,245,1),rgba(239,246,255,1))]',
        iconWrap: 'bg-emerald-100',
        iconColor: 'text-emerald-700',
        kickerColor: 'text-emerald-700',
      }
    case 'matrices':
      return {
        icon: Cpu,
        border: 'border-indigo-200',
        background: 'bg-[linear-gradient(135deg,rgba(238,242,255,1),rgba(239,246,255,1))]',
        iconWrap: 'bg-indigo-100',
        iconColor: 'text-indigo-700',
        kickerColor: 'text-indigo-700',
      }
    case 'python-ml':
      return {
        icon: Binary,
        border: 'border-rose-200',
        background: 'bg-[linear-gradient(135deg,rgba(255,241,242,1),rgba(255,247,237,1))]',
        iconWrap: 'bg-rose-100',
        iconColor: 'text-rose-700',
        kickerColor: 'text-rose-700',
      }
    default:
      return {
        icon: LayoutGrid,
        border: 'border-cyan-200',
        background: 'bg-[linear-gradient(135deg,rgba(236,254,255,1),rgba(239,246,255,1))]',
        iconWrap: 'bg-cyan-100',
        iconColor: 'text-cyan-700',
        kickerColor: 'text-cyan-700',
      }
  }
}

function InfoCard({
  title,
  icon,
  children,
}: {
  title: string
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <Card className="h-full border-slate-200 bg-slate-50">
      <CardHeader>
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm leading-7 text-slate-600">{children}</div>
      </CardContent>
    </Card>
  )
}
