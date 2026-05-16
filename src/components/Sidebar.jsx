const staticLinks = [
  { id: 'overview', label: 'Overview' },
  { id: 'bayes', label: 'Bayes Lab' },
  { id: 'schedule', label: 'Study Schedule' },
  { id: 'quiz', label: 'Final Quiz' },
]

export function Sidebar({
  activeSection,
  completionRate,
  completedModules,
  moduleCount,
  modules,
  onSelect,
}) {
  return (
    <aside className="surface top-4 h-fit p-4 lg:sticky lg:w-80">
      <div className="rounded-3xl bg-ink p-5 text-white">
        <p className="eyebrow text-white/70">Navigator</p>
        <h1 className="mt-2 font-display text-2xl font-semibold">AI & Data Science Prep</h1>
        <p className="mt-3 text-sm leading-6 text-white/75">
          Follow the sequence, track your progress, and keep everything in one study space.
        </p>
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/70">
            <span>Progress</span>
            <span>{completionRate}%</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-white/15">
            <div
              className="h-2 rounded-full bg-ember transition-all"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-white/75">
            {Object.values(completedModules).filter(Boolean).length} of {moduleCount} modules
            complete
          </p>
        </div>
      </div>

      <nav className="mt-5 space-y-2">
        {modules.map((module) => (
          <button
            key={module.id}
            type="button"
            onClick={() => onSelect(module.id)}
            className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${
              activeSection === module.id
                ? 'bg-slateblue text-white shadow-lg'
                : 'bg-mist text-ink hover:bg-sand'
            }`}
          >
            <span>
              <span className="block font-semibold">{module.shortLabel}</span>
              <span className="block text-xs opacity-75">{module.duration}</span>
            </span>
            <span
              className={`rounded-full px-2 py-1 text-xs font-semibold ${
                completedModules[module.id]
                  ? 'bg-pine/20 text-pine'
                  : activeSection === module.id
                    ? 'bg-white/15 text-white'
                    : 'bg-white text-slateblue'
              }`}
            >
              {completedModules[module.id] ? 'Done' : 'Open'}
            </span>
          </button>
        ))}
      </nav>

      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {staticLinks.map((link) => (
          <button
            key={link.id}
            type="button"
            onClick={() => {
              onSelect(link.id)
              document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })
            }}
            className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
              activeSection === link.id
                ? 'border-slateblue bg-slateblue text-white'
                : 'border-slateblue/10 bg-white hover:border-slateblue/30 hover:bg-mist'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </aside>
  )
}
