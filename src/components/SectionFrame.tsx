import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SectionFrameProps {
  id: string
  eyebrow: string
  title: string
  description: string
  children: ReactNode
  badge?: string
}

export function SectionFrame({
  id,
  eyebrow,
  title,
  description,
  children,
  badge,
}: SectionFrameProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      className="scroll-mt-24"
    >
      <Card className="border-white/10 bg-slate-900/70">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="sky">{eyebrow}</Badge>
            {badge ? <Badge variant="dark">{badge}</Badge> : null}
          </div>
          <CardTitle className="text-3xl text-white md:text-4xl">{title}</CardTitle>
          <p className="max-w-3xl text-sm leading-7 text-slate-300 md:text-base">{description}</p>
        </CardHeader>
        <CardContent className="space-y-6">{children}</CardContent>
      </Card>
    </motion.section>
  )
}
