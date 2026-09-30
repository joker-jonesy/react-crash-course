/**
 * A reusable wrapper every lesson uses.
 * Shows how a component can receive regular props (slug) AND `children`.
 */
import { Link } from 'react-router'
import { lessons } from '../data/lessons.js'

export default function Lesson({ slug, children }) {
  const index = lessons.findIndex((l) => l.slug === slug)
  const lesson = lessons[index]
  const prev = lessons[index - 1]
  const next = lessons[index + 1]

  return (
    <section>
      <p className="lesson-meta">Lesson {index + 1} of {lessons.length}</p>
      <h1>{lesson.title}</h1>
      <p className="file-path">📄 Source: {lesson.file}</p>

      {children}

      <nav className="lesson-pager">
        {prev ? <Link to={`/lessons/${prev.slug}`}>← {prev.title}</Link> : <span />}
        {next ? <Link to={`/lessons/${next.slug}`}>{next.title} →</Link> : <Link to="/students">Try the routing demo →</Link>}
      </nav>
    </section>
  )
}

// Small helper components used inside lessons
export function Demo({ children }) {
  return <div className="demo">{children}</div>
}

export function Exercise({ children }) {
  return (
    <div className="exercise">
      <strong>🧠 Try it yourself</strong>
      {children}
    </div>
  )
}
