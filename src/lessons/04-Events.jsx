/**
 * LESSON 4 — HANDLING EVENTS
 * ==========================
 * Events are camelCase props that take a FUNCTION:
 *   <button onClick={handleClick}>        ✅ pass the function
 *   <button onClick={handleClick()}>      ❌ calls it immediately during render!
 *   <button onClick={() => remove(id)}>   ✅ arrow function when you need arguments
 *
 * The handler receives an event object `e`:
 *   e.target        -> the element that fired the event
 *   e.target.value  -> current value of an input
 *   e.preventDefault() -> stop default browser behavior (e.g. form submit reload)
 *
 * Passing handlers as props is how a CHILD talks to its PARENT.
 */
import { useState } from 'react'
import Lesson, { Demo, Exercise } from '../components/Lesson.jsx'

// Child receives a function prop and calls it — the parent decides what happens
function ColorButton({ color, onPick }) {
  return (
    <button onClick={() => onPick(color)} style={{ borderColor: color }}>
      {color}
    </button>
  )
}

export default function EventsLesson() {
  const [message, setMessage] = useState('Nothing yet…')
  const [color, setColor] = useState('gray')
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [lastKey, setLastKey] = useState('')

  function handleClick() {
    setMessage(`Clicked at ${new Date().toLocaleTimeString()}`)
  }

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    setPosition({ x: Math.round(e.clientX - rect.left), y: Math.round(e.clientY - rect.top) })
  }

  return (
    <Lesson slug="events">
      <p>React events work like DOM events, but are written in camelCase and receive a function.</p>

      <pre><code>{`function handleClick(e) { console.log('clicked!', e) }
<button onClick={handleClick}>Click me</button>`}</code></pre>

      <Demo>
        <h4>onClick</h4>
        <div className="row">
          <button onClick={handleClick}>Click me</button>
          <button onDoubleClick={() => setMessage('Double clicked! 🎉')}>Double-click me</button>
          <span>{message}</span>
        </div>

        <h4>onChange / onKeyDown</h4>
        <input
          placeholder="Type something…"
          onChange={(e) => setMessage(`You typed: ${e.target.value}`)}
          onKeyDown={(e) => setLastKey(e.key)}
        />
        <span className="muted"> Last key: <code>{lastKey || '—'}</code></span>

        <h4>onMouseMove</h4>
        <div
          onMouseMove={handleMouseMove}
          style={{ height: 100, background: 'var(--surface)', borderRadius: 8, display: 'grid', placeItems: 'center' }}
        >
          x: {position.x}, y: {position.y}
        </div>

        <h4>Child → Parent via a function prop</h4>
        <div className="row">
          {['tomato', 'seagreen', 'royalblue'].map((c) => (
            <ColorButton key={c} color={c} onPick={setColor} />
          ))}
          <span style={{ color, fontWeight: 700 }}>Selected: {color}</span>
        </div>
      </Demo>

      <Exercise>
        <ol>
          <li>Change <code>onClick={'{handleClick}'}</code> to <code>onClick={'{handleClick()}'}</code>. What happens and why?</li>
          <li>Add an <code>onMouseEnter</code>/<code>onMouseLeave</code> pair that shows "hovering" text.</li>
          <li>Add a 4th color button that picks a random color.</li>
        </ol>
      </Exercise>
    </Lesson>
  )
}
