import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '@/lib/utils'

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <TooltipPrimitive.Provider delayDuration={120}>{children}</TooltipPrimitive.Provider>
}

export const Tooltip = TooltipPrimitive.Root
export const TooltipTrigger = TooltipPrimitive.Trigger

export function TooltipContent({
  className,
  ...props
}: TooltipPrimitive.TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={8}
        className={cn(
          'z-50 max-w-xs rounded-2xl bg-slate-950 px-3 py-2 text-xs leading-5 text-white shadow-xl',
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  )
}
