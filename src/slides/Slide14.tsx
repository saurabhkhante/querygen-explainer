import { SlideFrame } from '../components/SlideFrame'
import type { SlideDefinition } from '../types/slide'

function Slide14() {
  return (
    <SlideFrame kicker="Build 3" title="Build 3" subtitle="Channel automation">
      <div className="build3-shell">
        <article className="build3-main">
          <span>Main Flow</span>
          <h3>WhatsApp</h3>
        </article>
        <aside className="build3-lesson">Lesson: Codex</aside>
      </div>
    </SlideFrame>
  )
}

export const slide14: SlideDefinition = {
  id: '14-build3-whatsapp',
  title: 'Build 3',
  component: Slide14,
  notes: [
    'Position this as channel-first automation with clean handoffs.',
    'Use Codex as the lesson callout for prompting and flow refinement.',
  ],
  tags: ['build-3'],
}
