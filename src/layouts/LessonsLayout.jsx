/**
 * LESSONS LAYOUT (a nested layout)
 * Renders a sidebar for every /lessons/* page, and the lesson itself in <Outlet />.
 * The URL decides which lesson appears — the sidebar never re-mounts.
 */
import { NavLink, Outlet } from 'react-router'
import { lessons } from '../data/lessons.js'

export default function LessonsLayout() {
  return (
    <div className="lessons-shell">
      <aside className="lesson-sidebar">
        <ol>
          {lessons.map((lesson, i) => (
            <li key={lesson.slug}>
              {/* Relative link: "jsx" inside /lessons becomes /lessons/jsx */}
              <NavLink to={lesson.slug}>
                {i + 1}. {lesson.title}
              </NavLink>
            </li>
          ))}
        </ol>
      </aside>

      <article>
        <Outlet />
      </article>
    </div>
  )
}
