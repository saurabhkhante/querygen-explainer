import { SlideFrame } from '../components/SlideFrame'
import type { SlideDefinition } from '../types/slide'

function Slide02() {
  return (
    <SlideFrame
      kicker="Workshop Stack"
      title="What We Build With"
      subtitle="Grouped by role"
    >
      <div className="stack-groups">
        <section className="stack-group stack-group-core" aria-label="core tools">
          <h3 className="stack-group-title">Orchestration</h3>
          <div className="stack-list">
            <article className="stack-card">
              <span className="tool-icon">⚙️</span>
              <h4>n8n</h4>
            </article>
            <article className="stack-card">
              <span className="tool-icon">⌘</span>
              <h4>Codex</h4>
            </article>
          </div>
        </section>

        <section className="stack-group stack-group-models" aria-label="model providers">
          <h3 className="stack-group-title">Models</h3>
          <div className="stack-list">
            <article className="stack-card">
              <span className="tool-icon">✨</span>
              <h4>Gemini</h4>
            </article>
            <article className="stack-card">
              <span className="tool-icon">⚡</span>
              <h4>Groq</h4>
            </article>
            <article className="stack-card">
              <span className="tool-icon">🤖</span>
              <h4>OpenAI</h4>
            </article>
          </div>
        </section>

        <section className="stack-group stack-group-tools" aria-label="integration tools">
          <h3 className="stack-group-title">Tooling</h3>
          <div className="stack-list">
            <article className="stack-card">
              <span className="tool-icon">🐙</span>
              <h4>GitHub</h4>
            </article>
            <article className="stack-card">
              <span className="tool-icon">🕷️</span>
              <h4>Apify</h4>
            </article>
            <article className="stack-card">
              <span className="tool-icon">🔎</span>
              <h4>Tavily</h4>
            </article>
          </div>
        </section>
      </div>
    </SlideFrame>
  )
}

export const slide02: SlideDefinition = {
  id: '02-outcomes',
  title: 'Outcomes',
  component: Slide02,
  notes: [
    'Anchor expectations around shipping working flows.',
    'Reassure beginners that coding depth is optional for this workshop.',
  ],
  tags: ['start'],
}
