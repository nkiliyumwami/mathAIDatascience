export function StudySchedule({ schedule }) {
  return (
    <section className="card p-5 md:p-6">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Study schedule
        </p>
        <h2 className="text-2xl font-black text-slate-950">Focused plan through May 16</h2>
        <p className="mt-1 text-slate-600">
          The main learning load is May 14–15. May 16 is intentionally light review.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {schedule.map((day) => (
          <div
            key={day.day}
            className="rounded-3xl bg-gradient-to-b from-slate-50 to-white p-4 ring-1 ring-slate-200"
          >
            <h3 className="text-lg font-black">{day.day}</h3>
            <p className="mt-1 text-sm font-medium text-slate-500">{day.focus}</p>
            <div className="mt-4 space-y-3">
              {day.blocks.map((block) => (
                <div
                  key={`${day.day}-${block.time}-${block.task}`}
                  className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100"
                >
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">
                    {block.time}
                  </span>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{block.task}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
