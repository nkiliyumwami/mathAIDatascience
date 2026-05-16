import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Binary, Bot, Workflow } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function PythonMlLab() {
  const [rows, setRows] = useState([
    { familySize: 5, transportBarrier: 1, missedFollowup: 1 },
    { familySize: 2, transportBarrier: 0, missedFollowup: 0 },
    { familySize: 6, transportBarrier: 1, missedFollowup: 1 },
  ])

  const derived = useMemo(() => {
    const features = rows.map((row) => [row.familySize, row.transportBarrier])
    const target = rows.map((row) => row.missedFollowup)
    const predictedRisk = rows.map((row) => {
      const score = row.familySize * 0.08 + row.transportBarrier * 0.35
      return Math.min(0.95, score)
    })
    return { features, target, predictedRisk }
  }, [rows])

  return (
    <Card className="border-slate-200 bg-slate-50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Workflow className="h-5 w-5 text-cyan-700" />
          <CardTitle className="text-xl">Interactive Python + ML Lab</CardTitle>
        </div>
        <p className="text-sm leading-7 text-slate-600">
          Edit a tiny dataset, watch it split into features and target, and see how a simple scoring idea turns inputs into predicted risk.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4">
          <p className="text-sm font-semibold text-slate-950">Visual feature-target flow</p>
          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
            <FlowBox title="Raw records" body="Family rows with real-world details" tone="bg-cyan-50 text-cyan-950" />
            <FlowArrow />
            <FlowBox title="Feature matrix" body="Numeric inputs the model can read" tone="bg-amber-50 text-amber-950" />
            <FlowArrow />
            <FlowBox title="Prediction" body="A support signal, not a final decision" tone="bg-emerald-50 text-emerald-950" />
          </div>
        </div>
        <div className="grid gap-4">
          {rows.map((row, index) => (
            <div key={index} className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4">
              <p className="text-sm font-semibold text-slate-950">Family row {index + 1}</p>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                <NumberField
                  label="Family size"
                  value={row.familySize}
                  onChange={(value) => updateRow(setRows, rows, index, 'familySize', value)}
                />
                <NumberField
                  label="Transport barrier"
                  value={row.transportBarrier}
                  onChange={(value) => updateRow(setRows, rows, index, 'transportBarrier', value > 0 ? 1 : 0)}
                />
                <NumberField
                  label="Missed follow-up"
                  value={row.missedFollowup}
                  onChange={(value) => updateRow(setRows, rows, index, 'missedFollowup', value > 0 ? 1 : 0)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          <Panel
            icon={<Binary className="h-4 w-4 text-cyan-700" />}
            title="Feature matrix"
            body={JSON.stringify(derived.features)}
          />
          <Panel
            icon={<Bot className="h-4 w-4 text-emerald-600" />}
            title="Target"
            body={JSON.stringify(derived.target)}
          />
          <Panel
            icon={<Workflow className="h-4 w-4 text-amber-600" />}
            title="Predicted risk"
            body={derived.predictedRisk.map((value) => `${(value * 100).toFixed(0)}%`).join(', ')}
          />
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4">
          <p className="text-sm font-semibold text-slate-950">Interpretation prompt</p>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            The feature matrix is what the model sees as input. The target is the past outcome you want to learn from. A predicted risk is only a signal for support planning, not a final decision.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function updateRow(
  setRows: React.Dispatch<React.SetStateAction<Array<{ familySize: number; transportBarrier: number; missedFollowup: number }>>>,
  rows: Array<{ familySize: number; transportBarrier: number; missedFollowup: number }>,
  index: number,
  key: 'familySize' | 'transportBarrier' | 'missedFollowup',
  value: number,
) {
  const next = rows.map((row) => ({ ...row }))
  next[index][key] = value
  setRows(next)
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

function Panel({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-sm font-semibold text-slate-950">{title}</p>
      </div>
      <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-sm leading-7 text-slate-600">{body}</pre>
    </div>
  )
}

function FlowBox({ title, body, tone }: { title: string; body: string; tone: string }) {
  return (
    <div className={`rounded-[1.25rem] px-4 py-4 ${tone}`}>
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-2 text-sm leading-6">{body}</p>
    </div>
  )
}

function FlowArrow() {
  return <div className="text-center text-xl font-black text-slate-400">→</div>
}
