import { useState } from 'react'
import { CheckCircle2, ShieldAlert } from 'lucide-react'
import { SectionFrame } from '@/components/SectionFrame'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { ScenarioCase } from '@/types/course'

export function UseCasesSection({ useCases }: { useCases: ScenarioCase[] }) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})

  return (
    <SectionFrame
      id="use-cases"
      eyebrow="Refugee Resettlement Use Cases"
      title="Practical, humane, fictional scenarios"
      description="These case studies are fictional, but they are designed to feel realistic for staff working in Massachusetts and other US-based refugee resettlement or social-service settings."
    >
      <div className="grid gap-4 xl:grid-cols-2">
        {useCases.map((scenario) => {
          const chosen = answers[scenario.id]
          const isCorrect = chosen === scenario.answer

          return (
            <Card key={scenario.id} className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-white">{scenario.title}</CardTitle>
                <p className="text-sm leading-7 text-slate-300">{scenario.story}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  {scenario.dataPoints.map((point) => (
                    <div key={point.label} className="rounded-2xl bg-slate-950/60 p-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{point.label}</p>
                      <p className="mt-2 text-lg font-bold text-white">{point.value}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="font-semibold text-white">{scenario.learnerQuestion}</p>
                  <div className="mt-3 space-y-2">
                    {scenario.options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setAnswers((current) => ({ ...current, [scenario.id]: option }))}
                        className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
                          chosen === option
                            ? 'border-sky-400 bg-sky-500/15 text-white'
                            : 'border-white/10 bg-slate-950/60 text-slate-200 hover:border-white/20'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <Button variant="secondary" onClick={() => setRevealed((current) => ({ ...current, [scenario.id]: true }))}>
                  Reveal explanation
                </Button>

                {revealed[scenario.id] ? (
                  <div className={`rounded-2xl border p-4 text-sm leading-6 ${
                    isCorrect ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-100' : 'border-amber-400/30 bg-amber-500/10 text-amber-100'
                  }`}>
                    <div className="flex items-center gap-2 font-semibold">
                      <CheckCircle2 className="h-4 w-4" />
                      {isCorrect ? 'Strong interpretation' : 'Review the reasoning'}
                    </div>
                    <p className="mt-2">{scenario.explanation}</p>
                  </div>
                ) : null}

                <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 p-4 text-sm leading-6 text-rose-100">
                  <div className="flex items-center gap-2 font-semibold">
                    <ShieldAlert className="h-4 w-4" />
                    Ethics and fairness note
                  </div>
                  <p className="mt-2">{scenario.ethics}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </SectionFrame>
  )
}
