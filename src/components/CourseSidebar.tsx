import { Moon, NotebookPen, Sun, Trophy } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { sectionOrder, sectionTitles } from '@/data/courseData'
import { cn } from '@/lib/utils'

interface CourseSidebarProps {
  activeSection: string
  completedExercises: number
  notes: string
  onNotesChange: (value: string) => void
  onSectionSelect: (sectionId: string) => void
  progressValue: number
  sectionCompletion: Record<string, boolean>
  theme: 'light' | 'dark'
  toggleTheme: () => void
  totalExercises: number
}

export function CourseSidebar({
  activeSection,
  completedExercises,
  notes,
  onNotesChange,
  onSectionSelect,
  progressValue,
  sectionCompletion,
  theme,
  toggleTheme,
  totalExercises,
}: CourseSidebarProps) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:overflow-y-auto">
      <Card className="border-white/10 bg-slate-950/80">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <Badge variant="emerald">Progress Tracker</Badge>
            <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
          <CardTitle className="text-white">Course navigation</CardTitle>
          <p className="text-sm leading-6 text-slate-300">
            Move section by section or jump directly to the practice area you need.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>{completedExercises} of {totalExercises} exercises complete</span>
              <span>{progressValue}%</span>
            </div>
            <Progress value={progressValue} />
          </div>
          <nav className="space-y-2" aria-label="Course sections">
            {sectionOrder.map((sectionId, index) => (
              <button
                key={sectionId}
                type="button"
                onClick={() => onSectionSelect(sectionId)}
                className={cn(
                  'flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition',
                  activeSection === sectionId
                    ? 'bg-sky-500 text-slate-950'
                    : 'bg-white/5 text-slate-200 hover:bg-white/10',
                )}
              >
                <span className="max-w-[80%]">
                  <span className="block text-xs uppercase tracking-[0.2em] opacity-70">
                    Step {index + 1}
                  </span>
                  <span className="mt-1 block text-sm font-semibold">{sectionTitles[sectionId]}</span>
                </span>
                {sectionCompletion[sectionId] ? (
                  <Trophy className="h-4 w-4 shrink-0" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-current/40" />
                )}
              </button>
            ))}
          </nav>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-slate-900/70">
        <CardHeader>
          <div className="flex items-center gap-2 text-white">
            <NotebookPen className="h-4 w-4" />
            <CardTitle className="text-lg text-white">Learner notebook</CardTitle>
          </div>
          <p className="text-sm leading-6 text-slate-300">
            Write your own plain-English version of the math as you go.
          </p>
        </CardHeader>
        <CardContent>
          <textarea
            value={notes}
            onChange={(event) => onNotesChange(event.target.value)}
            className="min-h-48 w-full rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm leading-6 text-slate-100 outline-none ring-0 transition placeholder:text-slate-500 focus:border-sky-500"
            placeholder="Example: Median feels safer than mean when one rent request is unusually large..."
          />
        </CardContent>
      </Card>
    </aside>
  )
}
