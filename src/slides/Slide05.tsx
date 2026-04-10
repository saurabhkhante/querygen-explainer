import { SlideFrame } from '../components/SlideFrame'
import type { SlideDefinition } from '../types/slide'

function Slide05() {
  return (
    <SlideFrame
      kicker="Concept Primer"
      title="Understand the Data Flow"
      subtitle="API -> Webhook -> JSON"
    >
      <div className="slide05-action" aria-label="Concept primer link">
        <a
          className="primer-open-button"
          href="https://claude.ai/public/artifacts/250852eb-0d39-4a5d-9391-f5b67396ff1d"
          target="_blank"
          rel="noreferrer"
        >
          Open Cloud Artifact
        </a>
      </div>
    </SlideFrame>
  )
}

export const slide05: SlideDefinition = {
  id: '05-basics-artifact',
  title: 'Basics Artifact',
  component: Slide05,
  notes: [
    'Do not over-teach definitions; stay visual and practical.',
    'Connect this flow directly to what n8n nodes do.',
  ],
  tags: ['theory'],
}
