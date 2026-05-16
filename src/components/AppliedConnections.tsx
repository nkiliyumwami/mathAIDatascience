import { useState } from 'react'
import { BrainCircuit, ChartColumnIncreasing, FolderKanban, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionFrame } from '@/components/SectionFrame'
import { ExerciseCard } from '@/components/ExerciseCard'
import { CalloutBox } from '@/components/CalloutBox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Exercise } from '@/types/course'

interface AppliedConnectionsProps {
  exercises: Exercise[]
  completedExerciseIds: string[]
  onCompleteExercise: (id: string) => void
}

const conceptCards = [
  {
    id: 'probability',
    title: 'Probability',
    icon: BrainCircuit,
    summary: 'Supports predictions, confidence scores, and “how likely?” questions.',
    applications: [
      'Forecasting how many families may need school support next month',
      'Estimating missed-appointment risk under changing conditions',
      'Understanding why a classification model never speaks in certainties',
    ],
  },
  {
    id: 'statistics',
    title: 'Descriptive statistics',
    icon: ChartColumnIncreasing,
    summary: 'Helps you understand the data before you trust any model trained on it.',
    applications: [
      'Checking average wait time and subgroup differences',
      'Spotting outliers in housing support requests',
      'Validating whether your dashboard story actually matches the underlying data',
    ],
  },
  {
    id: 'matrices',
    title: 'Matrices',
    icon: FolderKanban,
    summary: 'Represent cases, services, and demand patterns numerically so models can compute.',
    applications: [
      'Family-by-service matching',
      'County-by-language demand planning',
      'Structured feature tables for machine learning',
    ],
  },
]

export function AppliedConnections({
  exercises,
  completedExerciseIds,
  onCompleteExercise,
}: AppliedConnectionsProps) {
  const [activeConcept, setActiveConcept] = useState(conceptCards[0].id)
  const selected = conceptCards.find((card) => card.id === activeConcept) ?? conceptCards[0]
  const Icon = selected.icon

  return (
    <SectionFrame
      id="ai-connections"
      eyebrow="Applied AI Connections"
      title="From math idea to AI use case"
      description="This section connects the concepts directly to real AI workflows: forecasting, classification, matching, dashboards, and resource planning."
    >
      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white">Concept-to-application map</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {conceptCards.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => setActiveConcept(card.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  card.id === activeConcept
                    ? 'border-sky-400 bg-sky-500/15'
                    : 'border-white/10 bg-slate-950/60 hover:border-white/20'
                }`}
              >
                <div className="font-semibold text-white">{card.title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{card.summary}</p>
              </button>
            ))}
          </CardContent>
        </Card>

        <motion.div
          key={selected.id}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center gap-3">
            <Icon className="h-6 w-6 text-sky-300" />
            <h3 className="text-2xl font-bold text-white">{selected.title} in practice</h3>
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-300">{selected.summary}</p>
          <div className="mt-6 space-y-3">
            {selected.applications.map((item) => (
              <div key={item} className="rounded-2xl bg-white/5 p-4 text-sm leading-6 text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        <Card className="border-white/10 bg-white/5 xl:col-span-3">
          <CardHeader>
            <CardTitle className="text-white">A simple human-centered AI flow</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-4">
            {[
              ['Real service question', 'What support pattern are we trying to understand?'],
              ['Math summary', 'Use statistics and probability to inspect the current process.'],
              ['Structured data', 'Represent cases and features numerically, often in matrix form.'],
              ['Human review', 'Check fairness, privacy, context, and whether the result should be used at all.'],
            ].map(([title, body]) => (
              <div key={title} className="rounded-3xl bg-slate-950/60 p-4">
                <p className="font-semibold text-white">{title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <CalloutBox title="Safety note" tone="ethics">
          <div className="space-y-2">
            <p>AI in human-centered fields must be reviewed for fairness, bias, and privacy.</p>
            <p>Good systems support judgment. They should not erase professional discretion.</p>
          </div>
        </CalloutBox>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            completed={completedExerciseIds.includes(exercise.id)}
            onComplete={onCompleteExercise}
          />
        ))}
      </div>
    </SectionFrame>
  )
}
