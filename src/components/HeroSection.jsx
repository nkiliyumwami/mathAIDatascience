export function HeroSection({ completedCount, moduleCount, onJumpToModules }) {
  return (
    <section className="surface overflow-hidden p-6 md:p-8">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <p className="eyebrow">Beginner-Friendly Launchpad</p>
          <h2 className="font-display text-4xl font-semibold leading-tight text-ink md:text-5xl">
            Learn the ideas behind AI before the jargon gets in the way.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-ink/80">
            This app turns a dense prep path into a guided study experience. You will build intuition
            for numbers, probability, Python, features, model evaluation, and responsible AI using
            plain language and concrete tasks.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onJumpToModules}
              className="rounded-full bg-ember px-5 py-3 font-semibold text-white transition hover:scale-[1.01] hover:bg-[#f36c49]"
            >
              Start Module 1
            </button>
            <a
              href="#schedule"
              className="rounded-full border border-slateblue/20 px-5 py-3 font-semibold text-slateblue transition hover:bg-mist"
            >
              View 6-Week Schedule
            </a>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {[
            ['Skill focus', 'Math, probability, Python, ML intuition'],
            ['Learning mode', 'Stories, labs, questions, and mini-projects'],
            ['Your status', `${completedCount}/${moduleCount} modules completed so far`],
          ].map(([label, value]) => (
            <div key={label} className="rounded-3xl bg-gradient-to-br from-mist to-white p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slateblue/75">{label}</p>
              <p className="mt-3 font-display text-xl font-semibold leading-7">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
