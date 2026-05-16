import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Accordion = AccordionPrimitive.Root

export const AccordionItem = AccordionPrimitive.Item

export function AccordionTrigger({
  children,
  className,
  ...props
}: AccordionPrimitive.AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          'flex flex-1 items-center justify-between py-4 text-left font-semibold text-slate-900 transition hover:text-sky-700 [&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export function AccordionContent({
  children,
  className,
  ...props
}: AccordionPrimitive.AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      className={cn('overflow-hidden text-sm text-slate-700', className)}
      {...props}
    >
      <div className="pb-4">{children}</div>
    </AccordionPrimitive.Content>
  )
}
