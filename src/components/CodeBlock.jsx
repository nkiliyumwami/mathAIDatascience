export function CodeBlock({ code }) {
  return (
    <div className="mt-5 rounded-2xl bg-slate-950 p-4 text-white">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="font-bold">Python Lab</h3>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">
          Copy into Jupyter
        </span>
      </div>
      <pre className="overflow-x-auto rounded-xl bg-black/30 p-4 text-sm leading-6 text-slate-100">
        <code>{code}</code>
      </pre>
    </div>
  )
}
