import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import './App.css'
import { slides } from './slides'

const TAG_COLORS: Record<string, string> = {
  start: '#f15a29',
  theory: '#f6ae2d',
  'build-1': '#009fb7',
  'build-2': '#2ec4b6',
  'build-3': '#86ba90',
  close: '#3a86ff',
}

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [overviewOpen, setOverviewOpen] = useState(false)

  const activeSlide = slides[activeIndex]
  const ActiveComponent = activeSlide.component

  const sectionColor = useMemo(() => {
    const firstTag = activeSlide.tags?.[0]
    return firstTag ? TAG_COLORS[firstTag] ?? '#f15a29' : '#f15a29'
  }, [activeSlide])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault()
        setActiveIndex((current) => Math.min(current + 1, slides.length - 1))
      }

      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault()
        setActiveIndex((current) => Math.max(current - 1, 0))
      }

      if (event.key.toLowerCase() === 'o') {
        event.preventDefault()
        setOverviewOpen((current) => !current)
      }

      if (event.key === 'Home') {
        event.preventDefault()
        setActiveIndex(0)
      }

      if (event.key === 'End') {
        event.preventDefault()
        setActiveIndex(slides.length - 1)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <main className="deck-root" style={{ '--section-color': sectionColor } as CSSProperties}>
      <header className="deck-header">
        <div className="header-left">
          <strong>n8n AI Agent Workshop</strong>
          <span>{activeSlide.title}</span>
        </div>
        <div className="header-right">
          <button type="button" onClick={() => setOverviewOpen((v) => !v)}>
            Overview (O)
          </button>
          <span>
            {activeIndex + 1} / {slides.length}
          </span>
        </div>
      </header>

      {overviewOpen ? (
        <section className="overview-grid" aria-label="Slides overview">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.id}
              className={`overview-card ${index === activeIndex ? 'active' : ''}`}
              onClick={() => {
                setActiveIndex(index)
                setOverviewOpen(false)
              }}
            >
              <span className="overview-number">{index + 1}</span>
              <strong>{slide.title}</strong>
              <small>{slide.tags?.join(' / ') || 'section'}</small>
            </button>
          ))}
        </section>
      ) : (
        <section className="slide-stage">
          <ActiveComponent />
        </section>
      )}

      <footer className="deck-footer">
        <span>Keys: ← →, O, Home, End</span>
      </footer>
    </main>
  )
}

export default App
