import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/lib/utils'

export function Progress({
  className,
  value,
}: {
  className?: string
  value: number
}) {
  return (
    <ProgressPrimitive.Root
      className={cn('relative h-3 w-full overflow-hidden rounded-full bg-slate-200', className)}
      value={value}
    >
      <ProgressPrimitive.Indicator
        className="h-full rounded-full bg-gradient-to-r from-sky-500 via-emerald-500 to-indigo-500 transition-all"
        style={{ width: `${value}%` }}
      />
    </ProgressPrimitive.Root>
  )
}
