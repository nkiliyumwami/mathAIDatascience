import type { ReactNode } from 'react'
import { AlertTriangle, Info, ShieldAlert, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const toneMap = {
  info: {
    icon: Info,
    shell: 'bg-sky-500/10 border-sky-400/30',
    title: 'text-sky-200',
    body: 'text-sky-100/80',
  },
  caution: {
    icon: AlertTriangle,
    shell: 'bg-amber-500/10 border-amber-400/30',
    title: 'text-amber-100',
    body: 'text-amber-100/80',
  },
  ethics: {
    icon: ShieldAlert,
    shell: 'bg-rose-500/10 border-rose-400/30',
    title: 'text-rose-100',
    body: 'text-rose-100/80',
  },
  encouragement: {
    icon: Sparkles,
    shell: 'bg-emerald-500/10 border-emerald-400/30',
    title: 'text-emerald-100',
    body: 'text-emerald-100/80',
  },
} as const

export function CalloutBox({
  title,
  children,
  tone = 'info',
}: {
  title: string
  children: ReactNode
  tone?: keyof typeof toneMap
}) {
  const theme = toneMap[tone]
  const Icon = theme.icon

  return (
    <div className={cn('rounded-3xl border p-4', theme.shell)}>
      <div className="flex items-start gap-3">
        <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', theme.title)} />
        <div>
          <h4 className={cn('font-semibold', theme.title)}>{title}</h4>
          <div className={cn('mt-1 text-sm leading-6', theme.body)}>{children}</div>
        </div>
      </div>
    </div>
  )
}
