import { SlideFrame, PromptList } from '../components/SlideFrame'
import type { SlideDefinition } from '../types/slide'

function Slide13() {
  return (
    <SlideFrame kicker="Build 2" title="Prompt Loop">
      <PromptList
        items={[
          'Connect tools - create event, read email, send email',
          'Break it - test missing context',
          'Fix it - add grounding + tool rules',
        ]}
      />
    </SlideFrame>
  )
}

export const slide13: SlideDefinition = {
  id: '13-build2-cards',
  title: 'Build 2 Prompt Cards',
  component: Slide13,
  notes: [
    'Use failures as teaching moments, not blockers.',
    'After demo, give attendees 10-15 minutes to replicate and tweak.',
  ],
  tags: ['build-2'],
}
