import { useMemo, useState } from 'react'
import { Sigma } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function percentToDecimal(value: number) {
  return value / 100
}

export function BayesCalculator() {
  const [prevalence, setPrevalence] = useState(12)
  const [sensitivity, setSensitivity] = useState(88)
  const [specificity, setSpecificity] = useState(84)

  const values = useMemo(() => {
    const pCondition = percentToDecimal(prevalence)
    const pPositiveGivenCondition = percentToDecimal(sensitivity)
    const pNegativeGivenNoCondition = percentToDecimal(specificity)
    const pPositiveGivenNoCondition = 1 - pNegativeGivenNoCondition

    const numerator = pPositiveGivenCondition * pCondition
    const denominator = numerator + pPositiveGivenNoCondition * (1 - pCondition)
    const posterior = denominator === 0 ? 0 : numerator / denominator

    return {
      posterior,
      truePositiveRate: numerator,
      falsePositiveRate: pPositiveGivenNoCondition * (1 - pCondition),
    }
  }, [prevalence, sensitivity, specificity])

  return (
    <Card className="border-white/10 bg-white/88 shadow-[0_18px_60px_rgba(15,23,42,0.12)]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sigma className="h-5 w-5 text-cyan-700" />
          <CardTitle>Interactive Bayes Rule Calculator</CardTitle>
        </div>
        <p className="text-sm leading-7 text-slate-600">
          Adjust the base rate and the test quality to see how a positive signal changes your belief.
        </p>
      </CardHeader>
      <CardContent className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="space-y-4">
          <SliderField
            label="Base rate / prevalence"
            help="How common is the condition before the test?"
            value={prevalence}
            onChange={setPrevalence}
          />
          <SliderField
            label="Sensitivity"
            help="If the condition is really present, how often does the test say positive?"
            value={sensitivity}
            onChange={setSensitivity}
          />
          <SliderField
            label="Specificity"
            help="If the condition is not present, how often does the test say negative?"
            value={specificity}
            onChange={setSpecificity}
          />
        </div>

        <div className="space-y-4 rounded-[1.75rem] bg-slate-950 px-5 py-5 text-slate-100">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">Posterior</p>
            <p className="mt-2 text-5xl font-black">{(values.posterior * 100).toFixed(1)}%</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              After a positive result, this is the estimated chance the condition is truly present.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <Metric label="True positive contribution" value={`${(values.truePositiveRate * 100).toFixed(1)}%`} />
            <Metric label="False positive contribution" value={`${(values.falsePositiveRate * 100).toFixed(1)}%`} />
          </div>
          <div className="rounded-[1.25rem] bg-white/5 px-4 py-4 text-sm leading-7 text-slate-300">
            Rare events can still produce a surprisingly low posterior even when sensitivity and specificity look strong. That is the core beginner lesson behind Bayes Rule.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SliderField({
  label,
  help,
  value,
  onChange,
}: {
  label: string
  help: string
  value: number
  onChange: (value: number) => void
}) {
  return (
    <label className="block rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-950">{label}</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">{help}</p>
        </div>
        <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-bold text-cyan-800">{value}%</span>
      </div>
      <input
        type="range"
        min={1}
        max={99}
        step={1}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-4 w-full accent-cyan-600"
      />
    </label>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  )
}
