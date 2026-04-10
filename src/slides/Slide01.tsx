import type { SlideDefinition } from '../types/slide'

function Slide01() {
  return (
    <article className="slide-frame opening-frame">
      <h1 className="slide-title">Build Practical AI Agents</h1>
      <p className="slide-subtitle">n8n Workshop</p>
      <p className="opening-signoff">Saurabh Khante</p>
    </article>
  )
}

export const slide01: SlideDefinition = {
  id: '01-opening',
  title: 'Opening',
  component: Slide01,
  notes: [
    'Set high energy and invite participation early.',
    'Ask attendees name, role, and AI familiarity in one quick round.',
  ],
  tags: ['start'],
}
