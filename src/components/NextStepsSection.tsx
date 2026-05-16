import { ArrowUpRight, BookMarked, BriefcaseBusiness, ShieldCheck } from 'lucide-react'
import { SectionFrame } from '@/components/SectionFrame'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { RoadmapItem } from '@/types/course'

const icons = [BookMarked, BriefcaseBusiness, ArrowUpRight, ShieldCheck]

export function NextStepsSection({ roadmap }: { roadmap: RoadmapItem[] }) {
  return (
    <SectionFrame
      id="next-steps"
      eyebrow="Next Steps"
      title="Where to go after the primer"
      description="The point of this course is not to finish your AI education. It is to help you begin from a position of confidence instead of intimidation."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {roadmap.map((item, index) => {
          const Icon = icons[index % icons.length]

          return (
            <Card key={item.title} className="border-white/10 bg-white/5">
              <CardHeader>
                <Icon className="h-5 w-5 text-sky-300" />
                <CardTitle className="text-white">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm leading-7 text-slate-300">{item.description}</p>
                <div className="rounded-2xl bg-slate-950/60 p-3 text-sm text-slate-200">
                  <span className="font-semibold text-white">Try this next:</span> {item.action}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </SectionFrame>
  )
}
