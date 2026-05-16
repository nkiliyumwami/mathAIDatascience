import { useState } from 'react'

export function ModuleSection({ index, isActive, isComplete, module, onActivate, onToggleComplete }) {
  const [visibleAnswers, setVisibleAnswers] = useState({})

  const toggleAnswer = (questionIndex) => {
    setVisibleAnswers((current) => ({
      ...current,
      [questionIndex]: !current[questionIndex],
    }))
  }

  return (
    <section
      id={module.id}
      className={`surface scroll-mt-6 p-6 transition md:p-8 ${
        isActive ? 'ring-2 ring-slateblue/30' : ''
      }`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <p className="eyebrow">
            {module.duration} · Module {index + 1}
          </p>
          <div>
            <h2 className="section-title">{module.title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-ink/75 md:text-base">
              {module.goal}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onActivate}
            className="rounded-full border border-slateblue/20 px-4 py-2 text-sm font-semibold text-slateblue hover:bg-mist"
          >
            Focus module
          </button>
          <button
            type="button"
            onClick={onToggleComplete}
            className={`rounded-full px-4 py-2 text-sm font-semibold text-white transition ${
              isComplete ? 'bg-pine hover:bg-[#165549]' : 'bg-slateblue hover:bg-[#274867]'
            }`}
          >
            {isComplete ? 'Mark incomplete' : 'Mark complete'}
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <ArticleCard title="The Story" content={module.story} tone="mist" />
        <ArticleCard title="The Idea" content={module.idea} tone="sand" />
        <ArticleCard title="Concrete Example" content={module.example} tone="white" />
        <div className="rounded-3xl border border-slateblue/10 bg-ink p-5 text-white">
          <h3 className="font-display text-xl font-semibold">Python Lab</h3>
          <ul className="mt-3 space-y-3 text-sm leading-6 text-white/80">
            {module.pythonLab.map((step) => (
              <li key={step} className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-ember" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl bg-mist p-5">
          <h3 className="font-display text-xl font-semibold text-ink">Check Yourself</h3>
          <div className="mt-4 space-y-3">
            {module.questions.map((question, questionIndex) => (
              <div key={question.prompt} className="rounded-2xl bg-white p-4">
                <p className="text-sm font-semibold text-ink">{question.prompt}</p>
                <button
                  type="button"
                  onClick={() => toggleAnswer(questionIndex)}
                  className="mt-3 rounded-full border border-slateblue/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slateblue"
                >
                  {visibleAnswers[questionIndex] ? 'Hide answer' : 'Show answer'}
                </button>
                {visibleAnswers[questionIndex] && (
                  <p className="mt-3 rounded-2xl bg-sand p-3 text-sm leading-6 text-ink/80">
                    {question.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-ember to-[#ff9d6f] p-5 text-white">
          <p className="eyebrow text-white/75">Mini-Project</p>
          <h3 className="mt-2 font-display text-2xl font-semibold">Make the idea tangible</h3>
          <p className="mt-4 text-sm leading-7 text-white/85">{module.miniProject}</p>
        </div>
      </div>
    </section>
  )
}

function ArticleCard({ title, content, tone }) {
  const toneClassNames = {
    mist: 'bg-mist',
    sand: 'bg-sand',
    white: 'bg-white',
  }

  return (
    <article className={`rounded-3xl p-5 ${toneClassNames[tone]}`}>
      <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-ink/80">{content}</p>
    </article>
  )
}
