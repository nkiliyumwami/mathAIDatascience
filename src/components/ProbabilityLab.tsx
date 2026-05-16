import { useMemo, useState } from 'react'
import { Percent, ShieldAlert } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ProbabilityLab() {
  const [withReminderTotal, setWithReminderTotal] = useState(30)
  const [withReminderMissed, setWithReminderMissed] = useState(6)
  const [withoutReminderTotal, setWithoutReminderTotal] = useState(10)
  const [withoutReminderMissed, setWithoutReminderMissed] = useState(5)
  const [rareEventRate, setRareEventRate] = useState(5)
  const [falsePositiveRate, setFalsePositiveRate] = useState(20)

  const values = useMemo(() => {
    const reminderRate = withReminderTotal === 0 ? 0 : withReminderMissed / withReminderTotal
    const noReminderRate = withoutReminderTotal === 0 ? 0 : withoutReminderMissed / withoutReminderTotal
    const trueCases = rareEventRate
    const nonCases = 100 - rareEventRate
    const falseAlerts = (falsePositiveRate / 100) * nonCases

    return {
      reminderRate,
      noReminderRate,
      falseAlerts,
      trueCases,
    }
  }, [
    falsePositiveRate,
    rareEventRate,
    withReminderMissed,
    withReminderTotal,
    withoutReminderMissed,
    withoutReminderTotal,
  ])

  return (
    <Card className="border-slate-200 bg-slate-50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Percent className="h-5 w-5 text-cyan-700" />
          <CardTitle className="text-xl">Interactive Probability Lab</CardTitle>
        </div>
        <p className="text-sm leading-7 text-slate-600">
          Edit the counts to compare conditional probabilities, then use the rare-event sliders to see why false positives matter.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4">
          <p className="text-sm font-semibold text-slate-950">Visual Bayes intuition</p>
          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
            <VisualBox title="Base rate" body="How common is the event before any alert?" tone="bg-cyan-50 text-cyan-950" />
            <Arrow />
            <VisualBox title="Signal quality" body="How often is the alert right or wrong?" tone="bg-amber-50 text-amber-950" />
            <Arrow />
            <VisualBox title="Updated belief" body="How much should a positive alert change your belief?" tone="bg-emerald-50 text-emerald-950" />
          </div>
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          <div className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4">
            <p className="text-sm font-semibold text-slate-950">Conditional probability table</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <NumberField label="Reminder sent: total" value={withReminderTotal} onChange={setWithReminderTotal} />
              <NumberField label="Reminder sent: missed" value={withReminderMissed} onChange={setWithReminderMissed} />
              <NumberField label="No reminder: total" value={withoutReminderTotal} onChange={setWithoutReminderTotal} />
              <NumberField label="No reminder: missed" value={withoutReminderMissed} onChange={setWithoutReminderMissed} />
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <Metric label="P(missed | reminder)" value={`${(values.reminderRate * 100).toFixed(1)}%`} />
              <Metric label="P(missed | no reminder)" value={`${(values.noReminderRate * 100).toFixed(1)}%`} />
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4">
            <p className="text-sm font-semibold text-slate-950">Rare-event intuition</p>
            <div className="mt-4 space-y-4">
              <SliderField
                label="Rare event base rate"
                value={rareEventRate}
                onChange={setRareEventRate}
              />
              <SliderField
                label="False positive rate"
                value={falsePositiveRate}
                onChange={setFalsePositiveRate}
              />
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <Metric label="True cases per 100" value={String(values.trueCases)} />
              <Metric label="False alerts per 100" value={values.falseAlerts.toFixed(1)} />
            </div>
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-amber-600" />
            <p className="text-sm font-semibold text-slate-950">Interpretation prompt</p>
          </div>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            If the event is rare, even a modest false positive rate can create many false alerts. That is why a positive signal must be interpreted together with the base rate, not by itself.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (value: number) => void
}) {
  return (
    <label className="rounded-[1rem] border border-slate-200 bg-slate-50 px-3 py-3">
      <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</span>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(event) => onChange(Math.max(0, Number(event.target.value)))}
        className="mt-2 w-full bg-transparent text-lg font-semibold text-slate-950 outline-none"
      />
    </label>
  )
}

function SliderField({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (value: number) => void
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-slate-950">{label}</span>
        <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-800">{value}%</span>
      </div>
      <input
        type="range"
        min={1}
        max={99}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-cyan-600"
      />
    </label>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
    </div>
  )
}

function VisualBox({ title, body, tone }: { title: string; body: string; tone: string }) {
  return (
    <div className={`rounded-[1.25rem] px-4 py-4 ${tone}`}>
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-2 text-sm leading-6">{body}</p>
    </div>
  )
}

function Arrow() {
  return <div className="text-center text-xl font-black text-slate-400">→</div>
}
