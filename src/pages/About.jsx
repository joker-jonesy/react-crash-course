export default function About() {
  return (
    <>
      <h1>About this project</h1>
      <p>Built with:</p>
      <ul>
        <li><strong>Vite</strong> — the dev server & build tool (<code>npm create vite@latest</code>)</li>
        <li><strong>React</strong> — the UI library</li>
        <li><strong>React Router</strong> — maps URLs to components</li>
      </ul>
      <p className="muted">
        This page is at <code>src/pages/About.jsx</code> and is wired up in{' '}
        <code>src/App.jsx</code> with <code>{'<Route path="about" element={<About />} />'}</code>.
      </p>
    </>
  )
}
