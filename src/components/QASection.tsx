import { SectionFrame } from '@/components/SectionFrame'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { FAQItem } from '@/types/course'

export function QASection({ items }: { items: FAQItem[] }) {
  return (
    <SectionFrame
      id="qa"
      eyebrow="Q&A / Misconceptions"
      title="Questions beginners often carry quietly"
      description="These are normal concerns. If you recognize yourself in them, that means you are exactly the kind of learner this course was built for."
    >
      <div className="rounded-3xl border border-white/10 bg-white/5 px-6">
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index}`} className="border-b border-white/10">
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionFrame>
  )
}
