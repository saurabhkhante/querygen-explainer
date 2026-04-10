import { SlideFrame } from '../components/SlideFrame'
import type { SlideDefinition } from '../types/slide'

function Slide11() {
  return (
    <SlideFrame
      kicker="LLM Settings"
      title="LLM Parameters"
      subtitle="Practical defaults"
    >
      <div className="slide11-action" aria-label="LLM parameter reference">
        <a
          className="llm-open-button"
          href="https://claude.ai/public/artifacts/b04188ff-fad0-4648-9035-87d7c25b342f"
          target="_blank"
          rel="noreferrer"
        >
          Open Cloud Artifact
        </a>
      </div>
    </SlideFrame>
  )
}

export const slide11: SlideDefinition = {
  id: '11-llm-params-artifact',
  title: 'LLM Parameters',
  component: Slide11,
  notes: [
    'Reuse artifact as requested instead of adding dense parameter text.',
    'Recommend practical defaults for beginners and move on.',
  ],
  tags: ['build-1'],
}
