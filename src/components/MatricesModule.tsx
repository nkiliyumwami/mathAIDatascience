import { useMemo, useState } from 'react'
import { Grid2x2, Rows3, Table, WandSparkles } from 'lucide-react'
import { SectionFrame } from '@/components/SectionFrame'
import { ExerciseCard } from '@/components/ExerciseCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalloutBox } from '@/components/CalloutBox'
import type { Exercise, MatrixRecord } from '@/types/course'

interface MatricesModuleProps {
  records: MatrixRecord[]
  countyDemandData: { county: string; housing: number; transport: number; school: number }[]
  exercises: Exercise[]
  completedExerciseIds: string[]
  onCompleteExercise: (id: string) => void
}

const targetMatrix = [
  [1, 0, 1],
  [0, 1, 1],
]

export function MatricesModule({
  records,
  countyDemandData,
  exercises,
  completedExerciseIds,
  onCompleteExercise,
}: MatricesModuleProps) {
  const [hoverRow, setHoverRow] = useState<number | null>(null)
  const [hoverCol, setHoverCol] = useState<number | null>(null)
  const [builder, setBuilder] = useState<number[][]>([
    [0, 0, 0],
    [0, 0, 0],
  ])

  const rowTotals = useMemo(
    () =>
      records.map((record) =>
        record.languageNeeds + record.transportNeeds + record.schoolSupport + record.housingUrgency,
      ),
    [records],
  )

  const columnTotals = useMemo(() => {
    const columns = ['languageNeeds', 'transportNeeds', 'schoolSupport', 'housingUrgency'] as const
    return columns.map((column) => records.reduce((sum, record) => sum + record[column], 0))
  }, [records])

  const builderMatches = JSON.stringify(builder) === JSON.stringify(targetMatrix)

  return (
    <SectionFrame
      id="matrices"
      eyebrow="Matrices"
      title="Turn service tables into structured numeric representations"
      description="Matrices matter because AI systems need organized numeric inputs. If a spreadsheet already makes sense to you, you already have the right intuition to start learning matrices."
    >
      <Tabs defaultValue="hover-grid">
        <TabsList>
          <TabsTrigger value="hover-grid">Hover grid</TabsTrigger>
          <TabsTrigger value="conversion">Spreadsheet to matrix</TabsTrigger>
          <TabsTrigger value="builder">Matrix builder</TabsTrigger>
        </TabsList>
        <TabsContent value="hover-grid" className="mt-6">
          <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Grid2x2 className="h-5 w-5 text-sky-300" />
                  <CardTitle className="text-white">Row and column hover</CardTitle>
                </div>
                <p className="text-sm leading-6 text-slate-300">
                  Hover cells to see how one family record and one feature intersect inside a matrix.
                </p>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-2 text-sm">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left text-slate-400">Family</th>
                      {['Language', 'Transport', 'School', 'Housing urgency'].map((heading, columnIndex) => (
                        <th
                          key={heading}
                          className={`rounded-2xl px-3 py-2 text-left ${
                            hoverCol === columnIndex ? 'bg-sky-500/20 text-white' : 'bg-slate-950/70 text-slate-300'
                          }`}
                        >
                          {heading}
                        </th>
                      ))}
                      <th className="px-3 py-2 text-left text-slate-400">Row total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record, rowIndex) => (
                      <tr key={record.familyId}>
                        <td className="rounded-2xl bg-slate-950/60 px-3 py-2 text-white">
                          {record.familyId}
                        </td>
                        {[
                          record.languageNeeds,
                          record.transportNeeds,
                          record.schoolSupport,
                          record.housingUrgency,
                        ].map((value, columnIndex) => (
                          <td
                            key={`${record.familyId}-${columnIndex}`}
                            onMouseEnter={() => {
                              setHoverRow(rowIndex)
                              setHoverCol(columnIndex)
                            }}
                            onMouseLeave={() => {
                              setHoverRow(null)
                              setHoverCol(null)
                            }}
                            className={`rounded-2xl px-3 py-2 text-center font-semibold ${
                              hoverRow === rowIndex || hoverCol === columnIndex
                                ? 'bg-emerald-500/20 text-white'
                                : 'bg-white/5 text-slate-200'
                            }`}
                          >
                            {value}
                          </td>
                        ))}
                        <td className="rounded-2xl bg-slate-950/60 px-3 py-2 font-semibold text-white">
                          {rowTotals[rowIndex]}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="px-3 py-2 text-slate-400">Column totals</td>
                      {columnTotals.map((total) => (
                        <td key={total} className="rounded-2xl bg-slate-950/60 px-3 py-2 text-center font-semibold text-white">
                          {total}
                        </td>
                      ))}
                      <td className="px-3 py-2 text-slate-400">Useful for quick scans</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
            <div className="space-y-4">
              <CalloutBox title="What rows and columns mean" tone="encouragement">
                Rows usually represent individual families or cases. Columns represent features or service needs measured across many families.
              </CalloutBox>
              <CalloutBox title="Why AI cares" tone="info">
                Once a service table is numeric, models can compare patterns across many records at once.
              </CalloutBox>
              <CalloutBox title="Ethics reminder" tone="ethics">
                A matrix can make people look like clean numeric rows. That is useful for computation, but staff should never forget the lived complexity behind each record.
              </CalloutBox>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="conversion" className="mt-6">
          <div className="grid gap-4 xl:grid-cols-2">
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Table className="h-5 w-5 text-sky-300" />
                  <CardTitle className="text-white">Human-readable records</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {countyDemandData.map((row) => (
                  <div key={row.county} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-200">
                    <div className="font-semibold text-white">{row.county} County</div>
                    <div className="mt-2 grid gap-2 md:grid-cols-3">
                      <span>Housing requests: {row.housing}</span>
                      <span>Transport requests: {row.transport}</span>
                      <span>School support: {row.school}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Rows3 className="h-5 w-5 text-emerald-300" />
                  <CardTitle className="text-white">Numeric matrix view</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                  <pre className="overflow-x-auto text-sm leading-7 text-slate-200">{`[
  [34, 18, 29],
  [24, 14, 21],
  [18, 12, 16],
  [14, 10, 11]
]`}</pre>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Same information, now in matrix form. This is the bridge from operational tables to machine computation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="builder" className="mt-6">
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <WandSparkles className="h-5 w-5 text-amber-300" />
                <CardTitle className="text-white">Matrix builder exercise</CardTitle>
              </div>
              <p className="text-sm leading-6 text-slate-300">
                Click each cell to cycle between 0 and 1 until your matrix matches the target service pattern.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-max gap-2">
                {builder.map((row, rowIndex) => (
                  <div key={`row-${rowIndex}`} className="flex gap-2">
                    {row.map((value, columnIndex) => (
                      <button
                        key={`${rowIndex}-${columnIndex}`}
                        type="button"
                        onClick={() => {
                          const next = builder.map((innerRow) => [...innerRow])
                          next[rowIndex][columnIndex] = value === 1 ? 0 : 1
                          setBuilder(next)
                        }}
                        className="h-14 w-14 rounded-2xl border border-white/10 bg-slate-950/70 text-lg font-bold text-white"
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm leading-6 text-slate-300">
                <p className="font-semibold text-white">Target pattern</p>
                <p>Row 1 should be [1, 0, 1]. Row 2 should be [0, 1, 1].</p>
              </div>
              {builderMatches ? (
                <CalloutBox title="Builder complete" tone="encouragement">
                  You matched the target matrix. Small structured arrays like this are the foundation for much larger ML-ready datasets.
                </CalloutBox>
              ) : null}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-white/10 bg-slate-950/60">
        <CardHeader>
          <CardTitle className="text-white">Matrix exercises</CardTitle>
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
    </SectionFrame>
  )
}
