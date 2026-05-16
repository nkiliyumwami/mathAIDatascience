import { useMemo, useState } from 'react'
import { BarChart3, Calculator, Filter, TableProperties } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { SectionFrame } from '@/components/SectionFrame'
import { ExerciseCard } from '@/components/ExerciseCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalloutBox } from '@/components/CalloutBox'
import type { Exercise } from '@/types/course'

interface StatisticsModuleProps {
  datasets: Record<string, number[]>
  chartData: { month: string; arrivals: number; appointmentsMissed: number; interpretationHours: number }[]
  exercises: Exercise[]
  completedExerciseIds: string[]
  onCompleteExercise: (id: string) => void
}

const datasetLabels: Record<string, string> = {
  schoolEnrollmentDays: 'Days to school enrollment',
  employmentAppointmentDays: 'Days to first employment appointment',
  rentAssistanceRequests: 'Rent assistance request amounts',
  familySizes: 'Family size distribution',
}

export function StatisticsModule({
  datasets,
  chartData,
  exercises,
  completedExerciseIds,
  onCompleteExercise,
}: StatisticsModuleProps) {
  const [datasetKey, setDatasetKey] = useState<keyof typeof datasets>('schoolEnrollmentDays')
  const [values, setValues] = useState<number[]>(datasets.schoolEnrollmentDays)
  const [excludeLargest, setExcludeLargest] = useState(false)

  const preparedValues = useMemo(() => {
    if (!excludeLargest) {
      return values
    }
    const largest = Math.max(...values)
    let removed = false
    return values.filter((value) => {
      if (!removed && value === largest) {
        removed = true
        return false
      }
      return true
    })
  }, [excludeLargest, values])

  const metrics = useMemo(() => {
    const sorted = [...preparedValues].sort((a, b) => a - b)
    const mean = sorted.reduce((sum, value) => sum + value, 0) / sorted.length
    const median =
      sorted.length % 2 === 0
        ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
        : sorted[Math.floor(sorted.length / 2)]
    const frequency = new Map<number, number>()
    sorted.forEach((value) => {
      frequency.set(value, (frequency.get(value) ?? 0) + 1)
    })
    const highestCount = Math.max(...frequency.values())
    const modes = [...frequency.entries()]
      .filter(([, count]) => count === highestCount)
      .map(([value]) => value)
    const min = sorted[0]
    const max = sorted[sorted.length - 1]

    return {
      mean,
      median,
      mode: highestCount === 1 ? 'No repeated mode' : modes.join(', '),
      min,
      max,
      range: max - min,
      proportionAboveMedian:
        (sorted.filter((value) => value > median).length / sorted.length) * 100,
    }
  }, [preparedValues])

  const histogramData = useMemo(
    () => preparedValues.map((value, index) => ({ label: `Case ${index + 1}`, value })),
    [preparedValues],
  )

  const handleDatasetChange = (key: keyof typeof datasets) => {
    setDatasetKey(key)
    setValues(datasets[key])
    setExcludeLargest(false)
  }

  return (
    <SectionFrame
      id="statistics"
      eyebrow="Descriptive Statistics"
      title="Summaries that turn messy service data into readable stories"
      description="Descriptive statistics tell you what is happening in the data you already have. They are often the first and most important step before anyone should talk about prediction."
    >
      <Tabs value={datasetKey} onValueChange={(value) => handleDatasetChange(value as keyof typeof datasets)}>
        <TabsList>
          {Object.entries(datasetLabels).map(([key, label]) => (
            <TabsTrigger key={key} value={key}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.keys(datasetLabels).map((key) => (
          <TabsContent key={key} value={key} className="mt-6 space-y-6">
            <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
              <Card className="border-white/10 bg-white/5">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <TableProperties className="h-5 w-5 text-sky-300" />
                    <CardTitle className="text-white">Editable dataset</CardTitle>
                  </div>
                  <p className="text-sm leading-6 text-slate-300">
                    Adjust the fictional values and watch the summaries update instantly.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    {values.map((value, index) => (
                      <label key={`${key}-${index}`} className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                        <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-400">
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
                          className="w-full bg-transparent text-lg font-semibold text-white outline-none"
                        />
                      </label>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setExcludeLargest((current) => !current)}
                    className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/5"
                  >
                    <Filter className="h-4 w-4" />
                    {excludeLargest ? 'Include the largest value again' : 'Exclude the largest value as an outlier'}
                  </button>
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-white/5">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-emerald-300" />
                    <CardTitle className="text-white">Live calculations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-3 md:grid-cols-2">
                  <MetricCard label="Mean" value={metrics.mean.toFixed(2)} />
                  <MetricCard label="Median" value={String(metrics.median)} />
                  <MetricCard label="Mode" value={metrics.mode} />
                  <MetricCard label="Range" value={String(metrics.range)} />
                  <MetricCard label="Minimum" value={String(metrics.min)} />
                  <MetricCard label="Maximum" value={String(metrics.max)} />
                  <MetricCard
                    label="Percent above median"
                    value={`${metrics.proportionAboveMedian.toFixed(0)}%`}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
              <Card className="border-white/10 bg-white/5">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-white" />
                    <CardTitle className="text-white">Interactive chart</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={histogramData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="label" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#38bdf8" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <CalloutBox title="When to prefer median" tone="encouragement">
                  Median is especially helpful when one case is unusually extreme, like a very large rent assistance request or a major documentation delay.
                </CalloutBox>
                <CalloutBox title="Ethics reminder" tone="ethics">
                  An average can hide subgroup differences. In community work, it is often important to check whether different language groups, counties, or family types experience the system differently.
                </CalloutBox>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Card className="border-white/10 bg-slate-950/60">
        <CardHeader>
          <CardTitle className="text-white">Chart reading practice</CardTitle>
          <p className="text-sm leading-6 text-slate-300">
            Use the fictional monthly arrivals data below as a planning example for Massachusetts service teams.
          </p>
        </CardHeader>
        <CardContent className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
          <div className="h-72 rounded-3xl bg-slate-950/60 p-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="arrivals" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid gap-4">
            {exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                completed={completedExerciseIds.includes(exercise.id)}
                onComplete={onCompleteExercise}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </SectionFrame>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  )
}
