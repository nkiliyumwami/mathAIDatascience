import { useMemo, useState } from 'react'
import { CheckCircle2, Lightbulb, RotateCcw, XCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Exercise, MatchingExercise, SortingExercise } from '@/types/course'

interface ExerciseCardProps {
  exercise: Exercise
  completed: boolean
  onComplete: (id: string) => void
}

export function ExerciseCard({ exercise, completed, onComplete }: ExerciseCardProps) {
  const [selected, setSelected] = useState<string>('')
  const [textAnswer, setTextAnswer] = useState('')
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle')
  const [showHint, setShowHint] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [matches, setMatches] = useState<Record<string, string>>({})
  const [sortingAssignments, setSortingAssignments] = useState<Record<string, string>>({})

  const isCorrect = useMemo(() => {
    if (exercise.type === 'multiple-choice') {
      return selected === exercise.answer
    }

    if (exercise.type === 'true-false') {
      return selected === String(exercise.answer)
    }

    if (exercise.type === 'fill-blank') {
      return exercise.acceptableAnswers.includes(textAnswer.trim().toLowerCase())
    }

    if (exercise.type === 'matching') {
      return exercise.pairs.every((pair) => matches[pair.left] === pair.right)
    }

    return exercise.items.every((item) => sortingAssignments[item.id] === item.category)
  }, [exercise, matches, selected, sortingAssignments, textAnswer])

  const submit = () => {
    if (isCorrect) {
      setFeedback('correct')
      setShowExplanation(true)
      onComplete(exercise.id)
      return
    }

    setFeedback('incorrect')
    setShowExplanation(true)
  }

  const reset = () => {
    setSelected('')
    setTextAnswer('')
    setFeedback('idle')
    setShowHint(false)
    setShowExplanation(false)
    setMatches({})
    setSortingAssignments({})
  }

  return (
    <Card className="border-white/10 bg-white/5">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="sky">{exercise.difficulty}</Badge>
          <Badge variant="slate">{exercise.type.replace('-', ' ')}</Badge>
          {completed ? <Badge variant="emerald">Completed</Badge> : null}
        </div>
        <CardTitle className="text-xl text-white">{exercise.prompt}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {exercise.type === 'multiple-choice' ? (
          <div className="grid gap-3 md:grid-cols-2">
            {exercise.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSelected(option)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  selected === option
                    ? 'border-sky-400 bg-sky-500/20 text-white'
                    : 'border-white/10 bg-slate-950/70 text-slate-200 hover:border-sky-400/50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        ) : null}

        {exercise.type === 'true-false' ? (
          <div className="flex flex-wrap gap-3">
            {['true', 'false'].map((value) => (
              <Button
                key={value}
                variant={selected === value ? 'accent' : 'secondary'}
                onClick={() => setSelected(value)}
              >
                {value === 'true' ? 'True' : 'False'}
              </Button>
            ))}
          </div>
        ) : null}

        {exercise.type === 'fill-blank' ? (
          <input
            value={textAnswer}
            onChange={(event) => setTextAnswer(event.target.value.toLowerCase())}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none focus:border-sky-400"
            placeholder={exercise.placeholder ?? 'Type your answer'}
          />
        ) : null}

        {exercise.type === 'matching' ? (
          <MatchingBoard exercise={exercise} matches={matches} onChange={setMatches} />
        ) : null}

        {exercise.type === 'sorting' ? (
          <SortingBoard
            exercise={exercise}
            assignments={sortingAssignments}
            onChange={setSortingAssignments}
          />
        ) : null}

        <div className="flex flex-wrap gap-3">
          <Button onClick={submit}>Check answer</Button>
          <Button variant="outline" onClick={() => setShowHint((current) => !current)}>
            <Lightbulb className="mr-2 h-4 w-4" />
            {showHint ? 'Hide hint' : 'Show hint'}
          </Button>
          <Button variant="ghost" onClick={reset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>

        {showHint ? (
          <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-3 text-sm text-amber-100">
            {exercise.hint}
          </div>
        ) : null}

        {feedback !== 'idle' ? (
          <div
            className={`rounded-2xl border p-3 text-sm ${
              feedback === 'correct'
                ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-100'
                : 'border-rose-400/30 bg-rose-500/10 text-rose-100'
            }`}
          >
            <div className="flex items-center gap-2 font-semibold">
              {feedback === 'correct' ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              {feedback === 'correct' ? 'Nice work' : 'Not quite yet'}
            </div>
            {showExplanation ? <p className="mt-2 leading-6">{exercise.explanation}</p> : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

function MatchingBoard({
  exercise,
  matches,
  onChange,
}: {
  exercise: MatchingExercise
  matches: Record<string, string>
  onChange: (value: Record<string, string>) => void
}) {
  return (
    <div className="space-y-3">
      {exercise.pairs.map((pair) => (
        <div key={pair.left} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
          <label className="mb-2 block text-sm font-semibold text-white">{pair.left}</label>
          <select
            value={matches[pair.left] ?? ''}
            onChange={(event) =>
              onChange({
                ...matches,
                [pair.left]: event.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400"
          >
            <option value="">Choose a match</option>
            {exercise.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  )
}

function SortingBoard({
  exercise,
  assignments,
  onChange,
}: {
  exercise: SortingExercise
  assignments: Record<string, string>
  onChange: (value: Record<string, string>) => void
}) {
  const unassigned = exercise.items.filter((item) => !assignments[item.id])

  const handleDrop = (itemId: string, category: string) => {
    onChange({
      ...assignments,
      [itemId]: category,
    })
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-dashed border-white/15 bg-slate-950/60 p-4">
        <p className="mb-3 text-sm font-semibold text-white">Drag from here</p>
        <div className="flex flex-wrap gap-2">
          {unassigned.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(event) => event.dataTransfer.setData('text/plain', item.id)}
              className="cursor-grab rounded-full border border-white/10 bg-slate-800 px-3 py-2 text-sm text-slate-100"
            >
              {item.label}
            </div>
          ))}
          {unassigned.length === 0 ? (
            <p className="text-sm text-slate-400">All cards are placed. You can re-drag by refreshing with Retry.</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {exercise.categories.map((category) => (
          <div
            key={category}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault()
              const itemId = event.dataTransfer.getData('text/plain')
              handleDrop(itemId, category)
            }}
            className="min-h-36 rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <p className="mb-3 text-sm font-semibold text-white">{category}</p>
            <div className="space-y-2">
              {exercise.items
                .filter((item) => assignments[item.id] === category)
                .map((item) => (
                  <div key={item.id} className="rounded-2xl bg-slate-900/80 p-3 text-sm text-slate-100">
                    {item.label}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
