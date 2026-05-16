import { useState } from 'react'
import { Target } from 'lucide-react'
import { SectionFrame } from '@/components/SectionFrame'
import { ExerciseCard } from '@/components/ExerciseCard'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Difficulty, Exercise } from '@/types/course'

const difficulties: Difficulty[] = ['Beginner', 'Beginner Plus', 'Challenge']

interface PracticeZoneProps {
  exercises: Exercise[]
  completedExerciseIds: string[]
  onCompleteExercise: (id: string) => void
}

export function PracticeZone({
  exercises,
  completedExerciseIds,
  onCompleteExercise,
}: PracticeZoneProps) {
  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty>('Beginner')

  return (
    <SectionFrame
      id="practice"
      eyebrow="Practice Zone"
      badge={`${exercises.length} exercises`}
      title="A substantial space to practice, retry, and build confidence"
      description="This practice zone mixes multiple-choice questions, sorting, matching, fill-in-the-blank items, chart interpretation, and short scenario reasoning. Use it as repetition, not as a speed test."
    >
      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Target className="h-5 w-5 text-sky-300" />
            <CardTitle className="text-white">Choose your difficulty lane</CardTitle>
          </div>
          <p className="text-sm leading-6 text-slate-300">
            Beginner focuses on concept clarity, Beginner Plus adds context, and Challenge asks you to connect ideas across modules.
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeDifficulty} onValueChange={(value) => setActiveDifficulty(value as Difficulty)}>
            <TabsList>
              {difficulties.map((difficulty) => (
                <TabsTrigger key={difficulty} value={difficulty}>
                  {difficulty}
                </TabsTrigger>
              ))}
            </TabsList>
            {difficulties.map((difficulty) => {
              const filtered = exercises.filter((exercise) => exercise.difficulty === difficulty)

              return (
                <TabsContent key={difficulty} value={difficulty} className="mt-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Badge variant="sky">{difficulty}</Badge>
                    <span className="text-sm text-slate-300">
                      {filtered.filter((exercise) => completedExerciseIds.includes(exercise.id)).length} of {filtered.length} complete
                    </span>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    {filtered.map((exercise) => (
                      <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                        completed={completedExerciseIds.includes(exercise.id)}
                        onComplete={onCompleteExercise}
                      />
                    ))}
                  </div>
                </TabsContent>
              )
            })}
          </Tabs>
        </CardContent>
      </Card>
    </SectionFrame>
  )
}
