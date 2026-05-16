interface CodeBlockProps {
  code: string
}

export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <pre className="overflow-x-auto rounded-[1.5rem] border border-slate-800 bg-slate-950 px-4 py-4 text-sm leading-6 text-sky-100">
      <code>{code}</code>
    </pre>
  )
}
