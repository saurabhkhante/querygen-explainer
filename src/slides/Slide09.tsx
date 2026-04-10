import { SlideFrame } from '../components/SlideFrame'
import type { SlideDefinition } from '../types/slide'

function Slide09() {
  return (
    <SlideFrame title="Build 0" subtitle="Foundation agent setup">
      <div className="build0-grid">
        <article className="build0-card build0-memory">
          <span>01</span>
          <h3>Memory</h3>
          <p>Context that persists</p>
        </article>
        <article className="build0-card build0-nodes">
          <span>02</span>
          <h3>Nodes</h3>
          <p>Workflow logic + routing</p>
        </article>
        <article className="build0-card build0-tools">
          <span>03</span>
          <h3>Tools</h3>
          <p>External actions + APIs</p>
        </article>
      </div>
    </SlideFrame>
  )
}

export const slide09: SlideDefinition = {
  id: '09-build0',
  title: 'Build 0',
  component: Slide09,
  notes: [
    'Demo once, then let attendees replicate while you walk around.',
    'Confirm success with one quick attendee screen share if possible.',
  ],
  tags: ['build-1'],
}
