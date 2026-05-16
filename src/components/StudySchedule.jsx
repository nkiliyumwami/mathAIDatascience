export function StudySchedule({ items }) {
  return (
    <section id="schedule" className="surface scroll-mt-6 p-6 md:p-8">
      <p className="eyebrow">Study Schedule</p>
      <h2 className="section-title mt-2">A six-week rhythm you can actually sustain</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/80 md:text-base">
        The goal is steady momentum, not marathon sessions. Each week has one focus area and one
        checkpoint so you know what “good progress” looks like.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <article key={item.week} className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-xl font-semibold">{item.week}</h3>
              <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slateblue">
                Focus
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold text-ink">{item.focus}</p>
            <p className="mt-3 text-sm leading-6 text-ink/75">{item.checkpoint}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
