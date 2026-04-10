import { SlideFrame } from '../components/SlideFrame'
import type { SlideDefinition } from '../types/slide'

function Slide16() {
  return (
    <SlideFrame kicker="Build 4" title="Build 4" subtitle="Knowledge-grounded answers">
      <div className="build4-shell">
        <article className="build4-main">
          <span>Main Flow</span>
          <h3>RAG</h3>
          <p>Retrieval Augmented Generation</p>
        </article>
      </div>
    </SlideFrame>
  )
}

export const slide16: SlideDefinition = {
  id: '16-build4-rag',
  title: 'Build 4',
  component: Slide16,
  notes: [
    'Introduce RAG as retrieval plus generation with grounding.',
    'Keep this as a transition slide before implementation details.',
  ],
  tags: ['build-3'],
}
