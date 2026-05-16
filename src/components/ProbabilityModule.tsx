import { useMemo, useState } from 'react'
import { Activity, ArrowRightLeft, CircleAlert, Dices, SlidersHorizontal } from 'lucide-react'
import { CalloutBox } from '@/components/CalloutBox'
import { ExerciseCard } from '@/components/ExerciseCard'
import { SectionFrame } from '@/components/SectionFrame'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Exercise } from '@/types/course'

interface ProbabilityModuleProps {
  exercises: Exercise[]
  completedExerciseIds: string[]
  onCompleteExercise: (id: string) => void
}

export function ProbabilityModule({
  exercises,
  completedExerciseIds,
  onCompleteExercise,
}: ProbabilityModuleProps) {
  const [supportProbability, setSupportProbability] = useState(0.62)
  const [trialCount, setTrialCount] = useState(40)
  const [simulated, setSimulated] = useState<{ needsSupport: number; noSupport: number }>({
    needsSupport: 0,
    noSupport: 0,
  })
  const [baselineMiss, setBaselineMiss] = useState(0.18)
  const [reminderCoverage, setReminderCoverage] = useState(0.7)
  const [transportBarrier, setTransportBarrier] = useState(0.35)

  const conditionalMissChance = useMemo(() => {
    const reminderEffect = baselineMiss * (1 - reminderCoverage * 0.35)
    const transportPenalty = transportBarrier * 0.22
    return Math.min(0.95, Math.max(0.01, reminderEffect + transportPenalty))
  }, [baselineMiss, reminderCoverage, transportBarrier])

  const runSimulation = () => {
    let needsSupport = 0
    for (let index = 0; index < trialCount; index += 1) {
      if (Math.random() < supportProbability) {
        needsSupport += 1
      }
    }

    setSimulated({
      needsSupport,
      noSupport: trialCount - needsSupport,
    })
  }

  return (
    <SectionFrame
      id="probability"
      eyebrow="Probability"
      title="Use uncertainty without letting it intimidate you"
      description="Probability helps teams ask better questions about uncertainty: how likely a family is to need school enrollment support, how likely a referral is to succeed, or how conditions change the chance of a missed appointment."
    >
      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Dices className="h-5 w-5 text-sky-300" />
              <CardTitle className="text-white">Probability simulator</CardTitle>
            </div>
            <p className="text-sm leading-6 text-slate-300">
              Simulate how many fictional families might need school enrollment support in one intake wave.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <SliderRow
              label="Chance a family needs school enrollment support"
              value={supportProbability}
              onChange={setSupportProbability}
            />
            <SliderRow
              label="Number of families to simulate"
              value={trialCount}
              onChange={(value) => setTrialCount(Math.round(value))}
              min={10}
              max={100}
              step={5}
              formatter={(value) => `${Math.round(value)} families`}
            />
            <Button onClick={runSimulation}>Run simulation</Button>
            <div className="grid gap-3 md:grid-cols-2">
              <MetricCard label="Needs support" value={String(simulated.needsSupport)} />
              <MetricCard label="No support needed" value={String(simulated.noSupport)} />
            </div>
            <p className="text-sm leading-6 text-slate-300">
              The results change each run, but over many runs they tend to settle near the underlying probability.
            </p>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-emerald-300" />
              <CardTitle className="text-white">Scenario explorer</CardTitle>
            </div>
            <p className="text-sm leading-6 text-slate-300">
              Explore how reminders and transportation barriers change the probability of a missed appointment.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <SliderRow label="Baseline missed-appointment rate" value={baselineMiss} onChange={setBaselineMiss} />
            <SliderRow label="Reminder coverage" value={reminderCoverage} onChange={setReminderCoverage} />
            <SliderRow label="Transportation barrier rate" value={transportBarrier} onChange={setTransportBarrier} />
            <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-4">
              <p className="text-sm font-semibold text-emerald-100">Estimated missed-appointment chance under these conditions</p>
              <p className="mt-2 text-4xl font-black text-white">
                {(conditionalMissChance * 100).toFixed(1)}%
              </p>
              <p className="mt-2 text-sm leading-6 text-emerald-100/80">
                This is not a real model. It is a guided intuition builder that shows how probabilities change when the conditions change.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <CalloutBox title="Common mistake: confusing a prediction with certainty" tone="caution">
          A 70% predicted chance is not a promise. It is a strong signal that still leaves room for surprises and exceptions.
        </CalloutBox>
        <CalloutBox title="Common mistake: ignoring the condition" tone="caution">
          Conditional probability depends on context. “Given that the reminder was not sent” is a different question from “overall”.
        </CalloutBox>
        <CalloutBox title="Ethics reminder" tone="ethics">
          Probabilities can support triage and planning, but they should not become automatic decisions about who is “worthy” of help.
        </CalloutBox>
      </div>

      <Card className="border-white/10 bg-slate-950/60">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5 text-white" />
            <CardTitle className="text-white">Guided exercises</CardTitle>
          </div>
          <p className="text-sm leading-6 text-slate-300">
            Sort events, compare independence versus dependence, and practice conditional reasoning with immediate feedback.
          </p>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-2">
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

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-sky-300" />
              <CardTitle className="text-white">Where this shows up in AI</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-slate-300">
            <p>Probability powers forecasts, classification scores, fraud alerts, and service-demand estimates.</p>
            <p>In refugee resettlement or social-service settings, it can help teams estimate likely caseload pressure, missed-appointment risk, or interpretation demand.</p>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CircleAlert className="h-5 w-5 text-amber-300" />
              <CardTitle className="text-white">What probabilities cannot do by themselves</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-slate-300">
            <p>Probabilities do not explain causes on their own. A high risk score does not tell you whether the issue is language access, transportation, policy friction, or missing data.</p>
            <p>That is why human review, local context, and ethics checks stay central.</p>
          </CardContent>
        </Card>
      </div>
    </SectionFrame>
  )
}

function SliderRow({
  label,
  value,
  onChange,
  scale = 1,
  min = 0.01,
  max = 1,
  step = 0.01,
  formatter,
}: {
  label: string
  value: number
  onChange: (value: number) => void
  scale?: number
  min?: number
  max?: number
  step?: number
  formatter?: (value: number) => string
}) {
  return (
    <label className="block rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-white">{label}</span>
        <Badge variant="slate">
          {formatter ? formatter(value) : `${Math.round(value * scale * 100) / 100}%`}
        </Badge>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-sky-400"
      />
    </label>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-950/70 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
    </div>
  )
}
