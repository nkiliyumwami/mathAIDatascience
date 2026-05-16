import { Flag, Layers3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { CapstoneSection } from '@/data/courseModules'

export function CapstoneProject({ project }: { project: CapstoneSection }) {
  return (
    <Card className="border-white/10 bg-white/88 shadow-[0_18px_60px_rgba(15,23,42,0.12)]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Flag className="h-5 w-5 text-cyan-700" />
          <CardTitle>{project.title}</CardTitle>
        </div>
        <p className="text-sm leading-7 text-slate-600">{project.scenario}</p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-5 xl:grid-cols-2">
          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4">
            <div className="flex items-center gap-2">
              <Layers3 className="h-4 w-4 text-cyan-700" />
              <p className="text-sm font-semibold text-slate-950">Suggested dataset columns</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.datasetColumns.map((column) => (
                <span key={column} className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-700">
                  {column}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4">
            <p className="text-sm font-semibold text-slate-950">How the modules connect</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">
              {project.moduleConnections.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-sm font-semibold text-slate-950">Capstone tasks</p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-600">
            {project.tasks.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ol>
        </div>

        <div className="rounded-[1.5rem] bg-emerald-50 px-4 py-4 text-sm leading-7 text-emerald-950">
          <span className="font-semibold">Deliverable:</span> {project.deliverable}
        </div>
      </CardContent>
    </Card>
  )
}
