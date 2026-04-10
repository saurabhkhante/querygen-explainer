import type { ReactNode } from 'react'

type SlideFrameProps = {
  kicker?: string
  title: string
  subtitle?: string
  children?: ReactNode
}

export function SlideFrame({ kicker, title, subtitle, children }: SlideFrameProps) {
  return (
    <article className="slide-frame">
      {kicker ? <p className="slide-kicker">{kicker}</p> : null}
      <h1 className="slide-title">{title}</h1>
      {subtitle ? <p className="slide-subtitle">{subtitle}</p> : null}
      {children ? <div className="slide-content">{children}</div> : null}
    </article>
  )
}

export function PromptList({ items }: { items: string[] }) {
  return (
    <ul className="prompt-list">
      {items.map((item, index) => {
        const [, meta = '', main = item] = item.match(/^(.+?)\s-\s(.+)$/) ?? []

        return (
          <li key={`${index}-${item}`} className="prompt-item">
            <span className="prompt-index">{String(index + 1).padStart(2, '0')}</span>
            {meta ? <span className="prompt-meta">{meta}</span> : null}
            <span className="prompt-main">{main}</span>
          </li>
        )
      })}
    </ul>
  )
}

export function ArtifactSlot({
  title,
  description,
  href,
}: {
  title: string
  description: string
  href: string
}) {
  return (
    <a className="artifact-slot" href={href} target="_blank" rel="noreferrer">
      <span>{title}</span>
      <small>{description}</small>
    </a>
  )
}

export function ArtifactEmbed({
  href,
  title,
}: {
  href: string
  title: string
}) {
  return (
    <section className="artifact-embed-wrap" aria-label={title}>
      <iframe className="artifact-embed-frame" src={href} title={title} loading="lazy" />
      <a className="artifact-slot" href={href} target="_blank" rel="noreferrer">
        <span>Open in New Tab</span>
        <small>If embed is blocked, click here.</small>
      </a>
    </section>
  )
}
