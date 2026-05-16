import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide',
  {
    variants: {
      variant: {
        slate: 'bg-slate-100 text-slate-700',
        sky: 'bg-sky-100 text-sky-800',
        emerald: 'bg-emerald-100 text-emerald-800',
        amber: 'bg-amber-100 text-amber-800',
        rose: 'bg-rose-100 text-rose-800',
        dark: 'bg-slate-950 text-white',
      },
    },
    defaultVariants: {
      variant: 'slate',
    },
  },
)

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}
