import { SlideFrame } from '../components/SlideFrame'
import type { SlideDefinition } from '../types/slide'

function Slide06() {
  return (
    <SlideFrame title="Agent vs Workflow" subtitle="Use the live board">
      <div className="slide06-action" aria-label="Miro diagram link">
        <a
          className="miro-open-button"
          href="https://miro.com/app/board/uXjVJ81OElA=/?moveToWidget=3458764666424491695&cot=14"
          target="_blank"
          rel="noreferrer"
        >
          Open Miro Diagram
        </a>
      </div>
    </SlideFrame>
  )
}

export const slide06: SlideDefinition = {
  id: '06-agent-vs-workflow',
  title: 'Agent vs Workflow',
  component: Slide06,
  notes: [
    'Teach: start with workflow, then add agentic behavior where needed.',
    'Ask the room: where do you need reliability vs flexibility?',
  ],
  tags: ['theory'],
}
