import { SlideFrame } from '../components/SlideFrame'
import type { SlideDefinition } from '../types/slide'

function Slide10() {
  return (
    <SlideFrame title="Build 1" subtitle="Google services agent">
      <div className="build1-shell">
        <article className="build1-main">
          <span>Focus</span>
          <h3>Google Services</h3>
          <p>Google Calendar · Gmail · Google Drive</p>
        </article>
        <aside className="build1-lesson">Lesson: Reactive Prompting</aside>
      </div>
    </SlideFrame>
  )
}

export const slide10: SlideDefinition = {
  id: '10-build1',
  title: 'Build 1',
  component: Slide10,
  notes: [
    'Keep DB peek short; point is confidence, not schema lecture.',
    'Mention where memory can break and how to reset quickly.',
  ],
  tags: ['build-1'],
}
