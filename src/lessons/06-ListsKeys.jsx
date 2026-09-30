/**
 * LESSON 6 — LISTS & KEYS
 * =======================
 * Turn an array of data into an array of elements with .map():
 *
 *   {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
 *
 * KEYS: every item in a list needs a `key` prop that is
 *   - unique among its siblings
 *   - STABLE (the same item keeps the same key between renders)
 * React uses keys to know which items were added/removed/moved.
 *
 * ⚠️ Avoid using the array index as a key if items can be reordered,
 *    inserted, or deleted — it causes subtle bugs (see the demo below).
 *
 * Use .filter() to hide items and .sort() (on a COPY) to order them.
 */
import { useState } from 'react'
import Lesson, { Demo, Exercise } from '../components/Lesson.jsx'

const initialTodos = [
  { id: 1, text: 'Install Vite', done: true },
  { id: 2, text: 'Learn JSX', done: true },
  { id: 3, text: 'Understand state', done: false },
  { id: 4, text: 'Build a router', done: false },
]

// Each row has an <input> with its OWN internal state — this is what exposes bad keys
function Row({ label }) {
  return (
    <li className="row">
      <span style={{ width: 70 }}>{label}</span>
      <input placeholder="type a note, then shuffle" />
    </li>
  )
}

export default function ListsLesson() {
  const [todos, setTodos] = useState(initialTodos)
  const [hideDone, setHideDone] = useState(false)
  const [letters, setLetters] = useState(['A', 'B', 'C'])

  function toggle(id) {
    // map() returns a NEW array; we replace just the one that changed
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function remove(id) {
    setTodos(todos.filter((t) => t.id !== id))
  }

  // Derived data: calculate it during render instead of storing it in state
  const visibleTodos = hideDone ? todos.filter((t) => !t.done) : todos
  const remaining = todos.filter((t) => !t.done).length

  return (
    <Lesson slug="lists-keys">
      <p>Render collections with <code>.map()</code>, and give each item a stable <code>key</code>.</p>

      <pre><code>{`<ul>
  {todos.map(todo => (
    <li key={todo.id}>{todo.text}</li>
  ))}
</ul>`}</code></pre>

      <Demo>
        <h4>Todo list ({remaining} left)</h4>
        <label className="row">
          <input type="checkbox" checked={hideDone} onChange={(e) => setHideDone(e.target.checked)} />
          Hide completed
        </label>
        <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
          {visibleTodos.map((todo) => (
            <li key={todo.id} className="row">
              <input type="checkbox" checked={todo.done} onChange={() => toggle(todo.id)} />
              <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.text}</span>
              <button onClick={() => remove(todo.id)}>✕</button>
            </li>
          ))}
        </ul>
        {visibleTodos.length === 0 && <p className="muted">Nothing to show 🎉</p>}
        <button onClick={() => setTodos(initialTodos)}>Reset</button>

        <h4>Why keys matter</h4>
        <p className="muted">Type something in each box, then click "Reverse".</p>
        <button onClick={() => setLetters([...letters].reverse())}>Reverse</button>
        <div className="grid">
          <div>
            <strong>key=&#123;index&#125; ❌</strong>
            <ul>{letters.map((l, index) => <Row key={index} label={l} />)}</ul>
          </div>
          <div>
            <strong>key=&#123;letter&#125; ✅</strong>
            <ul>{letters.map((l) => <Row key={l} label={l} />)}</ul>
          </div>
        </div>
      </Demo>

      <Exercise>
        <ol>
          <li>Remove the <code>key</code> from the todo <code>&lt;li&gt;</code> and look at the console warning.</li>
          <li>Add a "Sort A→Z" button. Hint: <code>[...todos].sort((a, b) =&gt; a.text.localeCompare(b.text))</code>.</li>
          <li>Show a "Clear completed" button only when at least one todo is done.</li>
        </ol>
      </Exercise>
    </Lesson>
  )
}
