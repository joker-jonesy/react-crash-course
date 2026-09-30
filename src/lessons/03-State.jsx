/**
 * LESSON 3 — STATE with useState
 * ==============================
 * Props come from outside. STATE is data a component owns and can change.
 *
 *   const [count, setCount] = useState(0)
 *          ^value  ^setter            ^initial value
 *
 * When you call the setter, React RE-RENDERS the component with the new value.
 * That's the core loop of React:  state changes -> component re-runs -> UI updates.
 *
 * Rules of Hooks:
 *  - Only call hooks at the TOP LEVEL of a component (not in loops/ifs).
 *  - Only call hooks from React components or custom hooks.
 *
 * Gotchas:
 *  - Never mutate state directly (count++ or arr.push()). Always call the setter
 *    with a NEW value/array/object.
 *  - If the next value depends on the previous one, use the updater form:
 *    setCount(prev => prev + 1)
 */
import { useState } from 'react'
import Lesson, { Demo, Exercise } from '../components/Lesson.jsx'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="row">
      <button onClick={() => setCount(count - 1)}>−</button>
      <strong style={{ minWidth: 40, textAlign: 'center', fontSize: 24 }}>{count}</strong>
      <button onClick={() => setCount(count + 1)}>+</button>
      {/* Updater function: safe when doing several updates in a row */}
      <button onClick={() => { setCount((c) => c + 1); setCount((c) => c + 1) }}>+2</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}

function ObjectState() {
  const [user, setUser] = useState({ name: 'Ada', likes: 0 })

  function like() {
    // ❌ user.likes++  (mutation — React won't notice)
    // ✅ make a NEW object, copying the old fields with the spread operator
    setUser({ ...user, likes: user.likes + 1 })
  }

  return (
    <div className="row">
      <span>{user.name} has {user.likes} likes</span>
      <button onClick={like}>👍 Like</button>
    </div>
  )
}

function ArrayState() {
  const [items, setItems] = useState(['🍎'])
  const fruits = ['🍌', '🍇', '🍓', '🍍', '🥝']

  function addFruit() {
    const random = fruits[Math.floor(Math.random() * fruits.length)]
    // ❌ items.push(random)
    // ✅ new array
    setItems([...items, random])
  }

  return (
    <div className="row">
      <button onClick={addFruit}>Add fruit</button>
      <button onClick={() => setItems([])}>Clear</button>
      <span style={{ fontSize: 24 }}>{items.join(' ')}</span>
    </div>
  )
}

export default function StateLesson() {
  return (
    <Lesson slug="state">
      <p>
        <strong>State</strong> is a component's memory. When state changes, React re-renders the
        component so the screen matches the data.
      </p>

      <pre><code>{`const [count, setCount] = useState(0)
<button onClick={() => setCount(count + 1)}>{count}</button>`}</code></pre>

      <Demo>
        <h4>Counter</h4>
        <Counter />
        <h4>Two independent counters</h4>
        <p className="muted">Each instance of a component has its own state.</p>
        <div className="stack"><Counter /><Counter /></div>
        <h4>Object state</h4>
        <ObjectState />
        <h4>Array state</h4>
        <ArrayState />
      </Demo>

      <h3>Why not a regular variable?</h3>
      <p>
        A normal <code>let count = 0</code> is reset every time the function runs, and changing it
        doesn't tell React to re-render. <code>useState</code> solves both problems.
      </p>

      <Exercise>
        <ol>
          <li>Stop the counter from going below 0.</li>
          <li>Add a "step" input so the counter increases by any number.</li>
          <li>In <code>ArrayState</code>, add a button that removes the last fruit (hint: <code>items.slice(0, -1)</code>).</li>
        </ol>
      </Exercise>
    </Lesson>
  )
}
