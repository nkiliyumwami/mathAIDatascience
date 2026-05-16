import { ArrowRight, CheckCircle2, Compass, HeartHandshake, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { LearnerProfile } from '@/types/course'
import { SectionFrame } from './SectionFrame'
import { Progress } from '@/components/ui/progress'

interface WelcomeSectionProps {
  learnerProfiles: LearnerProfile[]
  selectedProfile: string
  onProfileSelect: (profileId: string) => void
  onStartLearning: () => void
  progressValue: number
}

export function WelcomeSection({
  learnerProfiles,
  selectedProfile,
  onProfileSelect,
  onStartLearning,
  progressValue,
}: WelcomeSectionProps) {
  const currentProfile = learnerProfiles.find((profile) => profile.id === selectedProfile)

  return (
    <SectionFrame
      id="welcome"
      eyebrow="Welcome / Onboarding"
      badge="Start here"
      title="AI Primer: The Must-Know Mathematics & Statistics Behind AI"
      description="This course is designed for complete beginners, especially adults working in human-centered settings. We will build intuition first, formulas second, and connect the math to practical planning and service questions."
    >
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Intuition before symbolism',
                icon: Sparkles,
                body: 'You will see the big idea in plain English before any formula is asked to do work.',
              },
              {
                title: 'Human-centered examples',
                icon: HeartHandshake,
                body: 'The cases draw from fictional refugee resettlement and social-service planning scenarios.',
              },
              {
                title: 'Real interactivity',
                icon: Compass,
                body: 'You will simulate, sort, edit data, read charts, build matrices, and answer guided practice questions.',
              },
            ].map((item) => (
              <Card key={item.title} className="border-white/10 bg-white/5">
                <CardContent className="p-5">
                  <item.icon className="h-5 w-5 text-sky-300" />
                  <h3 className="mt-3 font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-white/10 bg-slate-950/60">
            <CardHeader>
              <CardTitle className="text-white">What describes you best?</CardTitle>
              <p className="text-sm leading-6 text-slate-300">
                This does not change the content, but it changes the tone of the encouragement and helps the course feel less generic.
              </p>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              {learnerProfiles.map((profile) => (
                <button
                  key={profile.id}
                  type="button"
                  onClick={() => onProfileSelect(profile.id)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    profile.id === selectedProfile
                      ? 'border-sky-400 bg-sky-500/15'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-white">{profile.title}</span>
                    {profile.id === selectedProfile ? (
                      <CheckCircle2 className="h-4 w-4 text-sky-300" />
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{profile.description}</p>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel p-6"
        >
          <Badge variant="dark">Course roadmap</Badge>
          <h3 className="mt-4 text-2xl font-bold text-white">A gentle path through the math</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            {currentProfile
              ? `Built with ${currentProfile.title.toLowerCase()}s in mind: practical examples, low jargon, and realistic service planning use cases.`
              : 'Choose a profile to personalize the feel of the course.'}
          </p>
          <div className="mt-6 space-y-3">
            {[
              'Probability to reason about uncertainty',
              'Descriptive statistics to summarize service patterns',
              'Matrices to represent people, services, and demand numerically',
              'Applied AI use cases with fairness, bias, and privacy reminders',
            ].map((step) => (
              <div key={step} className="flex items-start gap-3 rounded-2xl bg-white/5 p-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                <p className="text-sm leading-6 text-slate-200">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
              <span>Overall course progress</span>
              <span>{progressValue}%</span>
            </div>
            <Progress value={progressValue} />
          </div>
          <Button size="lg" className="mt-6 w-full" onClick={onStartLearning}>
            Start learning
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </SectionFrame>
  )
}
