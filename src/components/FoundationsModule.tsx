import { BookOpen, Lightbulb, ShieldAlert } from 'lucide-react'
import { CalloutBox } from '@/components/CalloutBox'
import { ExerciseCard } from '@/components/ExerciseCard'
import { SectionFrame } from '@/components/SectionFrame'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { Exercise, FoundationCard, GlossaryItem } from '@/types/course'

interface FoundationsModuleProps {
  cards: FoundationCard[]
  glossary: GlossaryItem[]
  misconceptions: { title: string; body: string }[]
  exercises: Exercise[]
  completedExerciseIds: string[]
  onCompleteExercise: (id: string) => void
}

const iconMap = {
  brain: BookOpen,
  sparkles: Lightbulb,
  'bar-chart-3': ShieldAlert,
} as const

export function FoundationsModule({
  cards,
  glossary,
  misconceptions,
  exercises,
  completedExerciseIds,
  onCompleteExercise,
}: FoundationsModuleProps) {
  return (
    <SectionFrame
      id="foundations"
      eyebrow="Foundations Before the Math"
      title="Why these ideas matter before any formulas appear"
      description="This section answers the beginner questions first: what AI is, what machine learning is, why data science matters, and why probability, statistics, and matrices keep appearing in modern AI tools."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = iconMap[card.icon]
          return (
            <Card key={card.title} className="border-white/10 bg-white/5">
              <CardHeader>
                <Icon className="h-5 w-5 text-sky-300" />
                <CardTitle className="text-white">{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7 text-slate-300">{card.body}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <TooltipProvider>
        <Card className="border-white/10 bg-slate-950/60">
          <CardHeader>
            <CardTitle className="text-white">Beginner glossary</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {glossary.map((item) => (
              <Tooltip key={item.term}>
                <TooltipTrigger asChild>
                  <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white">
                    {item.term}
                  </button>
                </TooltipTrigger>
                <TooltipContent>{item.definition}</TooltipContent>
              </Tooltip>
            ))}
          </CardContent>
        </Card>
      </TooltipProvider>

      <div className="grid gap-4 lg:grid-cols-3">
        {misconceptions.map((item) => (
          <CalloutBox key={item.title} title={item.title} tone="caution">
            {item.body}
          </CalloutBox>
        ))}
      </div>

      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Badge variant="sky">Knowledge check</Badge>
            <CardTitle className="text-white">Quick confidence builders</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 xl:grid-cols-3">
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              completed={completedExerciseIds.includes(exercise.id)}
              onComplete={onCompleteExercise}
            />
          ))}
        </CardContent>
      </Card>
    </SectionFrame>
  )
}
