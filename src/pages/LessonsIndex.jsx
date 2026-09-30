import { Link } from 'react-router'
import { lessons } from '../data/lessons.js'

// Rendered at exactly /lessons (the "index" route of the lessons layout)
export default function LessonsIndex() {
  return (
    <>
      <h1>Lessons</h1>
      <p>Work through them in order — each one builds on the last.</p>
      <ol>
        {lessons.map((lesson) => (
          <li key={lesson.slug}>
            <Link to={lesson.slug}>{lesson.title}</Link>{' '}
            <span className="file-path">{lesson.file}</span>
          </li>
        ))}
      </ol>
    </>
  )
}
