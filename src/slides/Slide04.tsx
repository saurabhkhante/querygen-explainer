import { SlideFrame } from '../components/SlideFrame'
import type { SlideDefinition } from '../types/slide'

function Slide04() {
  return (
    <SlideFrame kicker="Setup" title="Ready to Build" subtitle="Required first, optional next">
      <div className="setup-grid">
        <section className="setup-panel setup-required">
          <h3>Required</h3>
          <ul>
            <li>n8n account</li>
            <li>Supabase project + DB</li>
            <li>Google account connected</li>
            <li>One LLM key: Groq, Gemini, or OpenAI</li>
          </ul>
        </section>
        <section className="setup-panel setup-optional">
          <h3>Optional</h3>
          <ul>
            <li>GitHub</li>
            <li>Apify</li>
            <li>Tavily</li>
          </ul>
        </section>
      </div>
    </SlideFrame>
  )
}

export const slide04: SlideDefinition = {
  id: '04-setup',
  title: 'Setup Checklist',
  component: Slide04,
  notes: [
    'Keep this brief and start building quickly.',
    'If some attendees are behind, park them with a buddy while you proceed.',
  ],
  tags: ['start'],
}
