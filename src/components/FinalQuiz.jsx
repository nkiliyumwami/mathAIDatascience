import { useState } from 'react'

export function FinalQuiz({ quizItems }) {
  const [revealedQuiz, setRevealedQuiz] = useState({})

  const toggleQuiz = (index) => {
    setRevealedQuiz((previous) => ({
      ...previous,
      [index]: !previous[index],
    }))
  }

  return (
    <section className="card p-5 md:p-6">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Final practice
        </p>
        <h2 className="text-2xl font-black text-slate-950">7-question quiz</h2>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {quizItems.map((item, index) => (
          <div key={`${index}-${item.q}`} className="rounded-2xl bg-slate-50 p-4">
            <p className="font-semibold text-slate-800">
              {index + 1}. {item.q}
            </p>
            <button
              type="button"
              onClick={() => toggleQuiz(index)}
              className="mt-3 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white"
            >
              {revealedQuiz[index] ? 'Hide answer' : 'Show answer'}
            </button>
            {revealedQuiz[index] && (
              <p className="mt-2 text-sm leading-6 text-slate-700">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
