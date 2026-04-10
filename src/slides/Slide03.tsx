import { SlideFrame } from '../components/SlideFrame'
import type { SlideDefinition } from '../types/slide'

function Slide03() {
  return (
    <SlideFrame kicker="Agenda" title="Session Roadmap" subtitle="Setup to shipped agents">
      <div className="agenda-grid">
        <article className="agenda-card agenda-start">
          <small>00:00-00:20</small>
          <h3>Start Strong</h3>
          <p>Intro + setup</p>
        </article>
        <article className="agenda-card agenda-core">
          <small>00:20-00:45</small>
          <h3>Core Concepts</h3>
          <p>Agent basics in n8n</p>
        </article>
        <article className="agenda-card agenda-build">
          <small>00:45-02:20</small>
          <h3>Build Sprint</h3>
          <p>3 hands-on agents</p>
        </article>
        <article className="agenda-card agenda-wrap">
          <small>02:20-03:00</small>
          <h3>Wrap + Q&A</h3>
          <p>Next steps + resources</p>
        </article>
      </div>
    </SlideFrame>
  )
}

export const slide03: SlideDefinition = {
  id: '03-agenda',
  title: 'Agenda',
  component: Slide03,
  notes: [
    'Mention this is live-demo first, then attendee practice loops.',
    'Call out that pacing includes deliberate pause moments.',
  ],
  tags: ['start'],
}
