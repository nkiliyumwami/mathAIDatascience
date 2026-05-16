import { useMemo, useState } from 'react'

function Slider({ label, max = 100, min = 0, setter, step = 1, value }) {
  return (
    <label className="block rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="font-medium text-slate-800">{label}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
          {value}%
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => setter(Number(event.target.value))}
        className="w-full accent-slate-900"
      />
    </label>
  )
}

export function BayesCalculator() {
  const [prevalence, setPrevalence] = useState(1)
  const [sensitivity, setSensitivity] = useState(95)
  const [specificity, setSpecificity] = useState(95)

  const result = useMemo(() => {
    const prev = prevalence / 100
    const sens = sensitivity / 100
    const spec = specificity / 100
    const pPositive = sens * prev + (1 - spec) * (1 - prev)

    if (pPositive <= 0) {
      return 0
    }

    return (sens * prev) / pPositive
  }, [prevalence, sensitivity, specificity])

  const truePositives = Math.round(10000 * (prevalence / 100) * (sensitivity / 100))
  const falsePositives = Math.round(10000 * (1 - prevalence / 100) * (1 - specificity / 100))
  const totalPositives = truePositives + falsePositives

  return (
    <section className="card bg-slate-50 p-5">
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Interactive calculator
        </p>
        <h2 className="text-2xl font-bold text-slate-950">Bayes&apos; Rule: positive test result</h2>
        <p className="mt-1 text-slate-600">
          Move the sliders and watch how prevalence and specificity change the answer.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <Slider
            label="Prevalence"
            value={prevalence}
            setter={setPrevalence}
            min={1}
            max={50}
          />
          <Slider
            label="Sensitivity"
            value={sensitivity}
            setter={setSensitivity}
            min={50}
            max={100}
          />
          <Slider
            label="Specificity"
            value={specificity}
            setter={setSpecificity}
            min={50}
            max={100}
          />
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-medium text-slate-500">P(Disease | Positive)</p>
          <div className="mt-2 text-5xl font-black tracking-tight text-slate-950">
            {(result * 100).toFixed(1)}%
          </div>
          <div className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-3">
              <div className="font-bold text-slate-950">{truePositives}</div>
              true positives / 10,000
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <div className="font-bold text-slate-950">{falsePositives}</div>
              false positives / 10,000
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <div className="font-bold text-slate-950">{totalPositives}</div>
              total positives
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-600">
            Plain English: among everyone who tested positive, about{' '}
            {(result * 100).toFixed(1)}% truly have the disease under these assumptions.
          </p>
        </div>
      </div>
    </section>
  )
}
