import { SlideFrame } from '../components/SlideFrame'
import type { SlideDefinition } from '../types/slide'

function Slide07() {
  return (
    <SlideFrame title="Why Teams Pick n8n" subtitle="Fast to build, ready to run">
      <div className="why-grid">
        <article className="why-chip why-prod">
          <span>01</span>
          <h3>Production Ready</h3>
        </article>
        <article className="why-chip why-versatile">
          <span>02</span>
          <h3>Versatile</h3>
        </article>
        <article className="why-chip why-community">
          <span>03</span>
          <h3>Strong Community</h3>
        </article>
        <article className="why-chip why-nodes">
          <span>04</span>
          <h3>Community Nodes</h3>
        </article>
        <article className="why-chip why-selfhost">
          <span>05</span>
          <h3>Self-Host</h3>
        </article>
      </div>
    </SlideFrame>
  )
}

export const slide07: SlideDefinition = {
  id: '07-why-n8n',
  title: 'Why n8n',
  component: Slide07,
  notes: ['Keep this very brief, then move into build mode immediately.'],
  tags: ['theory'],
}
