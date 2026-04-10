import { SlideFrame, PromptList } from '../components/SlideFrame'
import type { SlideDefinition } from '../types/slide'

function Slide15() {
  return (
    <SlideFrame kicker="Wrap-up" title="Resources + Next Steps">
      <PromptList
        items={[
          'Share links + setup sheet',
          'Pick your next project',
          'Ship and share your build',
        ]}
      />
    </SlideFrame>
  )
}

export const slide15: SlideDefinition = {
  id: '15-close',
  title: 'Close',
  component: Slide15,
  notes: [
    'End with momentum and one clear action for each attendee.',
    'Point to follow-up channel/resources before Q&A.',
  ],
  tags: ['close'],
}
