function itemClassName(isActive) {
  return [
    'w-full rounded-2xl p-3 text-left transition hover:bg-slate-100',
    isActive ? 'bg-slate-950 text-white hover:bg-slate-900' : 'bg-slate-50 text-slate-800',
  ].join(' ')
}

export function Sidebar({
  activeModule,
  completed,
  modules,
  notes,
  onNotesChange,
  onSelectModule,
}) {
  return (
    <aside className="space-y-4">
      <div className="card p-4">
        <h2 className="mb-3 text-lg font-bold">Course modules</h2>
        <div className="space-y-2">
          {modules.map((module) => (
            <button
              key={module.id}
              type="button"
              onClick={() => onSelectModule(module.id)}
              className={itemClassName(activeModule === module.id)}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold">Module {module.id}</span>
                <span
                  className={`text-xs ${
                    activeModule === module.id ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {module.time}
                </span>
              </div>
              <div className="mt-1 text-sm opacity-90">{module.title}</div>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span
                  className={`h-2 w-2 rounded-full ${
                    completed[module.id] ? 'bg-emerald-400' : 'bg-slate-300'
                  }`}
                />
                {completed[module.id] ? 'Completed' : module.theme}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="card p-4">
        <h2 className="text-lg font-bold">My study notes</h2>
        <p className="mt-1 text-sm text-slate-600">
          Use this space for formulas, confusing ideas, and examples from work.
        </p>
        <textarea
          value={notes}
          onChange={(event) => onNotesChange(event.target.value)}
          placeholder="Example: Prevalence means how common something is before the test..."
          className="mt-3 min-h-40 w-full rounded-2xl border border-slate-200 p-3 text-sm outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>
    </aside>
  )
}
