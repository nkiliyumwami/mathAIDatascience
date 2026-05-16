import { useMemo } from 'react'
import { CheckCircle2, CircleHelp, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { QuizQuestion } from '@/data/courseModules'
import { useLocalStorage } from '@/hooks/useLocalStorage'

interface FinalPracticeQuizProps {
  questions: QuizQuestion[]
}

export function FinalPracticeQuiz({ questions }: FinalPracticeQuizProps) {
  const [answers, setAnswers] = useLocalStorage<Record<string, string>>('ai-prep-final-quiz-answers', {})
  const [submitted, setSubmitted] = useLocalStorage('ai-prep-final-quiz-submitted', false)

  const score = useMemo(
    () => questions.filter((question) => answers[question.id] === question.answer).length,
    [answers, questions],
  )

  const resetQuiz = () => {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <Card className="border-white/10 bg-white/88 shadow-[0_18px_60px_rgba(15,23,42,0.12)]">
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CircleHelp className="h-5 w-5 text-cyan-700" />
              <CardTitle>Final Practice Quiz</CardTitle>
            </div>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Use this as a low-pressure checkpoint before moving into a deeper AI or data science course.
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-slate-950 px-4 py-3 text-white">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Score</p>
            <p className="mt-1 text-3xl font-black">
              {submitted ? `${score}/${questions.length}` : '--'}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {questions.map((question, index) => {
          const selected = answers[question.id]
          const isCorrect = selected === question.answer
          return (
            <div key={question.id} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-4">
              <p className="text-sm font-semibold leading-6 text-slate-900">
                {index + 1}. {question.prompt}
              </p>
              <div className="mt-4 grid gap-3">
                {question.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAnswers((current) => ({ ...current, [question.id]: option }))}
                    className={`rounded-[1.25rem] border px-4 py-3 text-left text-sm transition ${
                      selected === option
                        ? 'border-cyan-600 bg-cyan-50 text-cyan-900'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {submitted ? (
                <div className={`mt-4 rounded-[1.25rem] px-4 py-4 text-sm leading-7 ${isCorrect ? 'bg-emerald-50 text-emerald-900' : 'bg-amber-50 text-amber-900'}`}>
                  <p className="font-semibold">
                    {isCorrect ? 'Correct' : `Correct answer: ${question.answer}`}
                  </p>
                  <p>{question.explanation}</p>
                </div>
              ) : null}
            </div>
          )
        })}

        <div className="flex flex-col gap-3 md:flex-row">
          <Button onClick={() => setSubmitted(true)}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Check answers
          </Button>
          <Button variant="outline" onClick={resetQuiz}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset quiz
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
