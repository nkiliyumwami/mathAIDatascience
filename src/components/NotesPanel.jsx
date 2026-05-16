export function NotesPanel({ activeModule, notes, setNotes }) {
  return (
    <aside className="rounded-[2rem] bg-ink p-5 text-white">
      <p className="eyebrow text-white/70">Notes Box</p>
      <h3 className="mt-2 font-display text-2xl font-semibold">Keep your own explanations</h3>
      <p className="mt-3 text-sm leading-6 text-white/75">
        {activeModule
          ? `Current focus: ${activeModule.shortLabel}. Write what you now understand and what still feels fuzzy.`
          : 'Write your own summaries, examples, and questions. These notes are saved in localStorage.'}
      </p>
      <textarea
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        className="mt-4 min-h-56 w-full rounded-3xl border border-white/10 bg-white/10 p-4 text-sm leading-6 text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none"
        placeholder="Example: Bayes rule feels clearer when I imagine a rare disease test. Low prevalence makes false positives matter more than I expected."
      />
      <p className="mt-3 text-xs uppercase tracking-[0.18em] text-white/45">
        Saved automatically in this browser
      </p>
    </aside>
  )
}
