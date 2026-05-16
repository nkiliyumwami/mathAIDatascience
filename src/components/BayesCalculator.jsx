import { useMemo, useState } from 'react'

export function BayesCalculator() {
  const [prevalence, setPrevalence] = useState(10)
  const [sensitivity, setSensitivity] = useState(92)
  const [specificity, setSpecificity] = useState(88)

  const results = useMemo(() => {
    const prev = prevalence / 100
    const sens = sensitivity / 100
    const spec = specificity / 100
    const falsePositiveRate = 1 - spec
    const positivePredictiveValue = (sens * prev) / (sens * prev + falsePositiveRate * (1 - prev))
    const negativePredictiveValue = (spec * (1 - prev)) / (spec * (1 - prev) + (1 - sens) * prev)

    return {
      positivePredictiveValue: Number.isFinite(positivePredictiveValue)
        ? positivePredictiveValue * 100
        : 0,
      negativePredictiveValue: Number.isFinite(negativePredictiveValue)
        ? negativePredictiveValue * 100
        : 0,
      outOfHundred: {
        truePositives: sens * prev * 100,
        falsePositives: falsePositiveRate * (1 - prev) * 100,
        trueNegatives: spec * (1 - prev) * 100,
        falseNegatives: (1 - sens) * prev * 100,
      },
    }
  }, [prevalence, sensitivity, specificity])

  return (
    <section id="bayes" className="surface scroll-mt-6 p-6 md:p-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <div>
          <p className="eyebrow">Interactive Bayes Rule Calculator</p>
          <h2 className="section-title mt-2">See why context changes the meaning of a test</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/80 md:text-base">
            High sensitivity and specificity do not automatically mean a positive result is highly
            trustworthy. The prevalence of the condition matters. Move the sliders and watch the
            posterior probability change.
          </p>

          <div className="mt-6 space-y-5">
            <SliderControl
              label="Prevalence"
              value={prevalence}
              onChange={setPrevalence}
              hint="How common is the condition before testing?"
            />
            <SliderControl
              label="Sensitivity"
              value={sensitivity}
              onChange={setSensitivity}
              hint="Among true cases, how often does the test return positive?"
            />
            <SliderControl
              label="Specificity"
              value={specificity}
              onChange={setSpecificity}
              hint="Among non-cases, how often does the test return negative?"
            />
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl bg-ink p-5 text-white">
            <p className="eyebrow text-white/70">Posterior Meaning</p>
            <p className="mt-3 font-display text-4xl font-semibold">
              {results.positivePredictiveValue.toFixed(1)}%
            </p>
            <p className="mt-2 text-sm leading-6 text-white/75">
              Probability a person truly has the condition after a positive result.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <MetricCard
              label="Negative predictive value"
              value={`${results.negativePredictiveValue.toFixed(1)}%`}
              tone="bg-mist"
            />
            <MetricCard
              label="False positives per 100"
              value={results.outOfHundred.falsePositives.toFixed(1)}
              tone="bg-sand"
            />
          </div>

          <div className="rounded-3xl border border-slateblue/10 bg-white p-5">
            <h3 className="font-display text-xl font-semibold">Out of 100 people</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                ['True positives', results.outOfHundred.truePositives],
                ['False positives', results.outOfHundred.falsePositives],
                ['True negatives', results.outOfHundred.trueNegatives],
                ['False negatives', results.outOfHundred.falseNegatives],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-mist p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slateblue/75">{label}</p>
                  <p className="mt-2 font-display text-2xl font-semibold">{value.toFixed(1)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SliderControl({ label, value, onChange, hint }) {
  return (
    <label className="block rounded-3xl bg-mist p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="font-display text-lg font-semibold">{label}</span>
          <p className="mt-1 text-sm text-ink/70">{hint}</p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slateblue">
          {value}%
        </span>
      </div>
      <input
        type="range"
        min="1"
        max="99"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slateblue/20 accent-ember"
      />
    </label>
  )
}

function MetricCard({ label, value, tone }) {
  return (
    <div className={`rounded-3xl p-5 ${tone}`}>
      <p className="text-xs uppercase tracking-[0.18em] text-slateblue/75">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-ink">{value}</p>
    </div>
  )
}
