import { SlideFrame } from '../components/SlideFrame'
import type { SlideDefinition } from '../types/slide'

function Slide08() {
  return (
    <SlideFrame kicker="Anatomy" title="Agent Anatomy">
      <div className="anatomy-board">
        <div className="anatomy-principles" aria-label="principles">
          <span>Workflow First</span>
          <span>Wireframe Before Build</span>
          <span>Context Is Everything</span>
        </div>

        <div className="anatomy-track" aria-label="agent anatomy flow">
          <div className="anatomy-node anatomy-input">
            <small>Trigger</small>
            <strong>Input</strong>
          </div>

          <span className="anatomy-link" aria-hidden="true" />

          <div className="anatomy-core">
            <h3>AI Agent</h3>
            <div className="anatomy-core-inner">
              <span>System Prompt</span>
              <span>Tools</span>
              <span>Memory</span>
            </div>
          </div>

          <span className="anatomy-link" aria-hidden="true" />

          <div className="anatomy-node anatomy-output">
            <small>Result</small>
            <strong>Output</strong>
          </div>
        </div>

        <p className="anatomy-loop">Loop: Observe -&gt; Decide -&gt; Act</p>
      </div>
    </SlideFrame>
  )
}

export const slide08: SlideDefinition = {
  id: '08-agent-anatomy',
  title: 'Agent Anatomy',
  component: Slide08,
  notes: [
    'Use this as your whiteboard equivalent before opening n8n canvas.',
    'Point out where prompting and tool schemas influence behavior.',
  ],
  tags: ['theory'],
}
