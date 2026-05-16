import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

export const Tabs = TabsPrimitive.Root

export function TabsList({
  className,
  ...props
}: TabsPrimitive.TabsListProps) {
  return (
    <TabsPrimitive.List
      className={cn('inline-flex flex-wrap gap-2 rounded-2xl bg-slate-100 p-2', className)}
      {...props}
    />
  )
}

export function TabsTrigger({
  className,
  ...props
}: TabsPrimitive.TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

export const TabsContent = TabsPrimitive.Content
