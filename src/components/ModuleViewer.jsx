import { useState } from 'react'
import { CodeBlock } from './CodeBlock'

export function ModuleViewer({ isCompleted, module, onToggleComplete }) {
  const [revealedChecks, setRevealedChecks] = useState({})

  const toggleCheck = (key) => {
    setRevealedChecks((previous) => ({
      ...previous,
      [key]: !previous[key],
    }))
  }

  return (
    <section className="card p-5 md:p-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Module {module.id} • {module.theme}
          </p>
          <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-950">
            {module.title}
          </h2>
          <p className="mt-1 text-sm text-slate-500">Estimated time: {module.time}</p>
        </div>
        <button
          type="button"
          onClick={onToggleComplete}
          className={`rounded-2xl px-4 py-3 text-sm font-bold transition ${
            isCompleted
              ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
              : 'bg-slate-950 text-white hover:bg-slate-800'
          }`}
        >
          {isCompleted ? 'Marked complete' : 'Mark complete'}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <h3 className="font-bold text-slate-950">The Story</h3>
          <p className="mt-2 leading-7 text-slate-700">{module.story}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <h3 className="font-bold text-slate-950">The Idea</h3>
          <p className="mt-2 leading-7 text-slate-700">{module.idea}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4 md:col-span-2">
          <h3 className="font-bold text-slate-950">Concrete Example</h3>
          <p className="mt-2 leading-7 text-slate-700">{module.example}</p>
        </div>
      </div>

      <CodeBlock code={module.lab} />

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
          <h3 className="font-bold">Check Yourself</h3>
          <div className="mt-3 space-y-3">
            {module.checks.map((item, index) => {
              const key = `${module.id}-${index}`

              return (
                <div key={key} className="rounded-xl bg-slate-50 p-3">
                  <p className="font-medium text-slate-800">
                    {index + 1}. {item.q}
                  </p>
                  <button
                    type="button"
                    onClick={() => toggleCheck(key)}
                    className="mt-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white"
                  >
                    {revealedChecks[key] ? 'Hide answer' : 'Show answer'}
                  </button>
                  {revealedChecks[key] && (
                    <p className="mt-2 text-sm text-slate-700">{item.a}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-200">
          <h3 className="font-bold text-amber-950">Mini-Project</h3>
          <p className="mt-2 leading-7 text-amber-900">{module.project}</p>
          <p className="mt-4 rounded-xl bg-white/70 p-3 text-sm text-amber-900">
            Best practice: after finishing, explain your answer in plain English before moving to
            the next module.
          </p>
        </div>
      </div>
    </section>
  )
}
