import { CalendarRange, CheckCircle2, Circle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ScheduleDay } from '@/data/courseModules'

interface StudyScheduleProps {
  schedule: ScheduleDay[]
  completedTaskIds: string[]
  onToggleTask: (taskId: string) => void
}

export function StudySchedule({ schedule, completedTaskIds, onToggleTask }: StudyScheduleProps) {
  return (
    <div className="space-y-5">
      {schedule.map((entry) => (
        <Card key={entry.id} className="border-white/10 bg-white/85">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CalendarRange className="h-5 w-5 text-cyan-700" />
              <CardTitle>{entry.week}: {entry.title}</CardTitle>
            </div>
            <p className="text-sm leading-7 text-slate-600">{entry.focus}</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {entry.tasks.map((task, index) => {
              const taskId = `${entry.id}-${index}`
              const done = completedTaskIds.includes(taskId)
              return (
                <div
                  key={taskId}
                  className="flex flex-col gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 md:flex-row md:items-center md:justify-between"
                >
                  <p className="text-sm leading-6 text-slate-700">{task}</p>
                  <Button variant={done ? 'accent' : 'outline'} size="sm" onClick={() => onToggleTask(taskId)}>
                    {done ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <Circle className="mr-2 h-4 w-4" />}
                    {done ? 'Done' : 'Mark done'}
                  </Button>
                </div>
              )
            })}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
