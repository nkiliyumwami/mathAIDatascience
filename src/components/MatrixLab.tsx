import { useMemo, useState } from 'react'
import { Grid2x2, WandSparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const targetMatrix = [
  [1, 0, 1],
  [0, 1, 1],
]

export function MatrixLab() {
  const [matrix, setMatrix] = useState<number[][]>([
    [0, 0, 0],
    [0, 0, 0],
  ])

  const rowTotals = useMemo(
    () => matrix.map((row) => row.reduce((total, value) => total + value, 0)),
    [matrix],
  )

  const matchesTarget = JSON.stringify(matrix) === JSON.stringify(targetMatrix)

  return (
    <Card className="border-slate-200 bg-slate-50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Grid2x2 className="h-5 w-5 text-cyan-700" />
          <CardTitle className="text-xl">Interactive Matrix Builder</CardTitle>
        </div>
        <p className="text-sm leading-7 text-slate-600">
          Click cells to build a small feature matrix. Think of each row as one family and each column as one feature.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4">
          <p className="text-sm font-semibold text-slate-950">Visual matrix interpretation</p>
          <div className="mt-4 grid gap-3 md:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.25rem] bg-cyan-50 px-4 py-4 text-sm leading-7 text-cyan-950">
              <p className="font-semibold">Rows</p>
              <p className="mt-2">Each row can stand for one family, one case, or one weekly record.</p>
            </div>
            <div className="rounded-[1.25rem] bg-emerald-50 px-4 py-4 text-sm leading-7 text-emerald-950">
              <p className="font-semibold">Columns</p>
              <p className="mt-2">Each column can stand for one feature such as transport barrier, school support, or interpretation need.</p>
            </div>
          </div>
        </div>
        <div className="grid w-max gap-2">
          {matrix.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2">
              {row.map((value, columnIndex) => (
                <button
                  key={`${rowIndex}-${columnIndex}`}
                  type="button"
                  onClick={() => {
                    const next = matrix.map((item) => [...item])
                    next[rowIndex][columnIndex] = value === 1 ? 0 : 1
                    setMatrix(next)
                  }}
                  className="h-14 w-14 rounded-[1rem] border border-slate-200 bg-white text-lg font-bold text-slate-950 transition hover:border-cyan-500"
                >
                  {value}
                </button>
              ))}
              <div className="ml-2 flex items-center rounded-[1rem] bg-cyan-50 px-3 text-sm font-semibold text-cyan-900">
                Row total: {rowTotals[rowIndex]}
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4">
          <div className="flex items-center gap-2">
            <WandSparkles className="h-4 w-4 text-amber-600" />
            <p className="text-sm font-semibold text-slate-950">Target interpretation</p>
          </div>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Target matrix: row 1 = `[1, 0, 1]`, row 2 = `[0, 1, 1]`. This could mean family 1 needs language and school support, while family 2 needs transport and school support.
          </p>
        </div>
        {matchesTarget ? (
          <div className="rounded-[1.5rem] bg-emerald-50 px-4 py-4 text-sm leading-7 text-emerald-950">
            <span className="font-semibold">Matched.</span> You built the target matrix. This is the same beginner logic used when turning service tables into model-ready feature grids.
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
