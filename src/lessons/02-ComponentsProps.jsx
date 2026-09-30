/**
 * LESSON 2 — COMPONENTS & PROPS
 * =============================
 * A component is a function that returns JSX. Its name MUST start with a
 * Capital letter (<Card />), otherwise React thinks it's an HTML tag (<card>).
 *
 * PROPS are the inputs to a component — like arguments to a function.
 *   <ProfileCard name="Ada" age={36} />   ->   ProfileCard({ name: 'Ada', age: 36 })
 *
 * - Strings can use quotes; everything else (numbers, booleans, objects, functions) uses {}.
 * - Props are READ-ONLY. A component must never change its own props.
 * - `children` is a special prop: whatever you put BETWEEN the opening and closing tags.
 */
import Lesson, { Demo, Exercise } from '../components/Lesson.jsx'

// A simple component with destructured props and a default value
function ProfileCard({ name, role, emoji = '🙂', isOnline }) {
  return (
    <div className="card">
      <div style={{ fontSize: 32 }}>{emoji}</div>
      <strong>{name}</strong>
      <div className="muted">{role}</div>
      <small>{isOnline ? '🟢 Online' : '⚪ Offline'}</small>
    </div>
  )
}

// A component that uses `children` — a reusable "box" for any content
function Panel({ title, children }) {
  return (
    <div className="card" style={{ marginTop: '1rem' }}>
      <h4 style={{ marginTop: 0 }}>{title}</h4>
      {children}
    </div>
  )
}

// Components can be composed: built out of other components
function Badge({ label }) {
  return (
    <span style={{ background: 'var(--accent)', color: '#fff', padding: '2px 8px', borderRadius: 99, marginRight: 6 }}>
      {label}
    </span>
  )
}

export default function ComponentsPropsLesson() {
  return (
    <Lesson slug="components-props">
      <p>
        Components let you split the UI into independent, reusable pieces. <strong>Props</strong> are
        how a parent passes data down to a child.
      </p>

      <pre><code>{`function ProfileCard({ name, role, emoji = '🙂' }) {
  return <div>{emoji} {name} — {role}</div>
}

<ProfileCard name="Ada" role="Engineer" emoji="👩‍💻" />`}</code></pre>

      <Demo>
        {/* Same component, different props = different output */}
        <div className="grid">
          <ProfileCard name="Ada Lovelace" role="Engineer" emoji="👩‍💻" isOnline />
          <ProfileCard name="Alan Turing" role="Mathematician" emoji="🧮" isOnline={false} />
          <ProfileCard name="Guest" role="Visitor" />
        </div>

        <Panel title="I'm a Panel — my content comes from `children`">
          <p>Anything between &lt;Panel&gt; and &lt;/Panel&gt; shows up here.</p>
          <Badge label="React" />
          <Badge label="Vite" />
          <Badge label="Router" />
        </Panel>
      </Demo>

      <h3>Data flows one way ⬇️</h3>
      <p>
        Props flow from parent to child. A child can't change its parent's data directly — it can
        only call a function the parent passes down (you'll see that in Lessons 4 and 9).
      </p>

      <Exercise>
        <ol>
          <li>Add a <code>skills</code> prop (an array) to <code>ProfileCard</code> and render it with <code>skills.join(', ')</code>.</li>
          <li>Create your own <code>&lt;Button variant="danger"&gt;Delete&lt;/Button&gt;</code> component using <code>children</code>.</li>
          <li>Move <code>ProfileCard</code> into its own file in <code>src/components/</code> and import it.</li>
        </ol>
      </Exercise>
    </Lesson>
  )
}
