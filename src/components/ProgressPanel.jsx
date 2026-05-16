export function ProgressPanel({ completionRate, completedCount, moduleCount, nextModule }) {
  return (
    <section className="surface p-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-mist p-5">
          <p className="eyebrow">Progress</p>
          <p className="mt-2 font-display text-3xl font-semibold">{completionRate}%</p>
          <p className="mt-2 text-sm text-ink/70">
            {completedCount} of {moduleCount} learning modules marked complete.
          </p>
        </div>
        <div className="rounded-3xl bg-sand p-5">
          <p className="eyebrow">Next Best Step</p>
          <p className="mt-2 font-display text-xl font-semibold">
            {nextModule ? nextModule.shortLabel : 'All modules complete'}
          </p>
          <p className="mt-2 text-sm text-ink/70">
            {nextModule
              ? nextModule.goal
              : 'Use the Bayes lab, schedule, and final quiz to reinforce the full course.'}
          </p>
        </div>
        <div className="rounded-3xl bg-ink p-5 text-white">
          <p className="eyebrow text-white/70">Study Advice</p>
          <p className="mt-2 font-display text-xl font-semibold">Short, repeated sessions win</p>
          <p className="mt-2 text-sm text-white/75">
            Aim for 30 to 45 minutes at a time. Read, write notes, then do the Python lab from
            memory.
          </p>
        </div>
      </div>
    </section>
  )
}
