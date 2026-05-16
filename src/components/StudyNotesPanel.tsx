import { FileText, Printer, StickyNote } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLocalStorage } from '@/hooks/useLocalStorage'

interface StudyNotesPanelProps {
  recommendation: {
    title: string
    reason: string
    moduleId: string
  } | null
  onJumpToModule: (moduleId: string) => void
}

export function StudyNotesPanel({ recommendation, onJumpToModule }: StudyNotesPanelProps) {
  const [notes, setNotes] = useLocalStorage('ai-prep-study-notes', '')

  return (
    <Card className="border-white/10 bg-white/88 shadow-[0_18px_60px_rgba(15,23,42,0.12)] print:shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <StickyNote className="h-5 w-5 text-cyan-700" />
          <CardTitle>Study Notes</CardTitle>
        </div>
        <p className="text-sm leading-7 text-slate-600">
          Keep your own definitions, formulas, and field-specific examples here. This section is print-friendly for offline review.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendation ? (
          <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-4 py-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-amber-700" />
              <p className="text-sm font-semibold text-amber-950">Recommended next lesson</p>
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-950">{recommendation.title}</p>
            <p className="mt-2 text-sm leading-7 text-slate-700">{recommendation.reason}</p>
            <button
              type="button"
              onClick={() => onJumpToModule(recommendation.moduleId)}
              className="mt-3 rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-500 print:hidden"
            >
              Open recommended module
            </button>
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm leading-7 text-emerald-950">
            <span className="font-semibold">No obvious weak spot.</span> Based on saved checks, your next useful step is the capstone or a final review pass.
          </div>
        )}

        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Write your study notes here..."
          className="min-h-64 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-800 outline-none transition focus:border-cyan-500"
        />

        <div className="flex justify-end print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
          >
            <Printer className="mr-2 h-4 w-4" />
            Print study notes
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
