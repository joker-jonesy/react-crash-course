import { Link } from 'react-router'
import { lessons } from '../data/lessons.js'

export default function Home() {
  return (
    <>
      <h1>React Crash Course ⚛️</h1>
      <p>
        A hands-on reference for learning how React works. Every lesson is a real
        component you can open in <code>src/lessons/</code>, read, and edit — the page
        updates instantly thanks to Vite's hot module replacement.
      </p>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>How to use this project</h3>
        <ol>
          <li>Run <code>npm run dev</code> and open the URL Vite prints.</li>
          <li>Open a lesson in the browser <em>and</em> its source file in your editor side by side.</li>
          <li>Read the comments, play with the live demo, then do the exercises.</li>
        </ol>
        <Link to="/lessons/setup"><button className="primary">Start with Lesson 0: Setup →</button></Link>
      </div>

      <h2>What's inside</h2>
      <div className="grid">
        {lessons.map((lesson, i) => (
          <Link key={lesson.slug} to={`/lessons/${lesson.slug}`} className="card" style={{ textDecoration: 'none' }}>
            <span className="muted">Lesson {i}</span>
            <div><strong>{lesson.title}</strong></div>
          </Link>
        ))}
      </div>
    </>
  )
}
