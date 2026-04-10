import { SlideFrame } from '../components/SlideFrame'
import type { SlideDefinition } from '../types/slide'

function Slide12() {
  return (
    <SlideFrame
      kicker="Next Build"
      title="Build 2: Calendar + Email Agent"
      subtitle="Demo, then hands-on"
    >
      <div className="build2-shell">
        <article className="build2-main">
          <span>Focus</span>
          <h3>Calendar + Email</h3>
          <p>Create event · Read email · Send email</p>
        </article>
        <aside className="build2-lesson">Lesson: Prompt Loop</aside>
      </div>
    </SlideFrame>
  )
}

export const slide12: SlideDefinition = {
  id: '12-build2-transition',
  title: 'Build 2 Transition',
  component: Slide12,
  notes: [
    'Keep this as a clean marker slide only.',
    'Most explanation happens live in n8n canvas.',
  ],
  tags: ['build-2'],
}
