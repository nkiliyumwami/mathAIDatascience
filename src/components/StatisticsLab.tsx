import { useMemo, useState } from 'react'
import { BarChart3, Calculator } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const defaultValues = [8, 9, 9, 10, 11, 12, 35]

export function StatisticsLab() {
  const [values, setValues] = useState<number[]>(defaultValues)

  const metrics = useMemo(() => {
    const sorted = [...values].sort((a, b) => a - b)
    const sum = sorted.reduce((total, value) => total + value, 0)
    const mean = sum / sorted.length
    const mid = Math.floor(sorted.length / 2)
    const median =
      sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid]
    const range = sorted[sorted.length - 1] - sorted[0]
    return { mean, median, range, sorted }
  }, [values])

  return (
    <Card className="border-slate-200 bg-slate-50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-cyan-700" />
          <CardTitle className="text-xl">Interactive Statistics Lab</CardTitle>
        </div>
        <p className="text-sm leading-7 text-slate-600">
          Edit the dataset and watch the mean, median, and range respond immediately. This is useful for seeing how one outlier changes the story.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-3 md:grid-cols-4 xl:grid-cols-7">
          {values.map((value, index) => (
            <label key={index} className="rounded-[1.25rem] border border-slate-200 bg-white px-3 py-3">
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Value {index + 1}
              </span>
              <input
                type="number"
                value={value}
                onChange={(event) => {
                  const next = [...values]
                  next[index] = Number(event.target.value)
                  setValues(next)
                }}
                className="mt-2 w-full bg-transparent text-lg font-semibold text-slate-950 outline-none"
              />
            </label>
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <Metric label="Mean" value={metrics.mean.toFixed(2)} />
          <Metric label="Median" value={String(metrics.median)} />
          <Metric label="Range" value={String(metrics.range)} />
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-emerald-600" />
            <p className="text-sm font-semibold text-slate-950">Interpretation prompt</p>
          </div>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            If you raise one value far above the others, the mean usually changes more than the median. That is the beginner intuition behind why median is often safer when outliers are present.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-slate-200 bg-white px-4 py-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
    </div>
  )
}
