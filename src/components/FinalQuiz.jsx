import { useState } from 'react'

export function FinalQuiz({ quizItems }) {
  const [revealed, setRevealed] = useState({})

  const toggleAnswer = (index) => {
    setRevealed((current) => ({
      ...current,
      [index]: !current[index],
    }))
  }

  return (
    <section id="quiz" className="surface scroll-mt-6 p-6 md:p-8">
      <p className="eyebrow">Final Practice Quiz</p>
      <h2 className="section-title mt-2">Check whether the core ideas now feel connected</h2>
      <div className="mt-6 space-y-4">
        {quizItems.map((item, index) => (
          <div key={item.question} className="rounded-3xl bg-mist p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slateblue/75">
                  Question {index + 1}
                </p>
                <p className="mt-2 text-base font-semibold text-ink">{item.question}</p>
              </div>
              <button
                type="button"
                onClick={() => toggleAnswer(index)}
                className="rounded-full border border-slateblue/20 bg-white px-4 py-2 text-sm font-semibold text-slateblue"
              >
                {revealed[index] ? 'Hide answer' : 'Reveal answer'}
              </button>
            </div>
            {revealed[index] && (
              <p className="mt-4 rounded-2xl bg-white p-4 text-sm leading-7 text-ink/80">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
