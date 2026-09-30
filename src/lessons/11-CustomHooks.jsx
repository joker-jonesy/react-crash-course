/**
 * LESSON 11 — CUSTOM HOOKS
 * ========================
 * A custom hook is a function that:
 *   - has a name starting with "use"
 *   - calls other hooks (useState, useEffect, …)
 *
 * It lets you reuse STATEFUL LOGIC (not UI) across components.
 * Each component that calls the hook gets its OWN copy of the state.
 *
 * Real example in this project: src/hooks/useLocalStorage.js
 */
import { useEffect, useState } from 'react'
import Lesson, { Demo, Exercise } from '../components/Lesson.jsx'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

// A tiny hook: boolean on/off
function useToggle(initial = false) {
  const [on, setOn] = useState(initial)
  const toggle = () => setOn((v) => !v)
  return [on, toggle]
}

// A hook wrapping a browser API + effect + cleanup
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return width
}

// A hook for a counter with extra rules
function useCounter(initial = 0, { min = -Infinity, max = Infinity } = {}) {
  const [count, setCount] = useState(initial)
  return {
    count,
    increment: () => setCount((c) => Math.min(max, c + 1)),
    decrement: () => setCount((c) => Math.max(min, c - 1)),
    reset: () => setCount(initial),
  }
}

export default function CustomHooksLesson() {
  const [showDetails, toggleDetails] = useToggle()
  const width = useWindowWidth()
  const stars = useCounter(3, { min: 0, max: 5 })
  const [note, setNote] = useLocalStorage('lesson-11-note', '')

  return (
    <Lesson slug="custom-hooks">
      <p>
        When two components share the same stateful logic, extract it into a
        <strong> custom hook</strong>.
      </p>

      <pre><code>{`function useToggle(initial = false) {
  const [on, setOn] = useState(initial)
  return [on, () => setOn(v => !v)]
}

const [isOpen, toggleOpen] = useToggle()`}</code></pre>

      <Demo>
        <h4>useToggle</h4>
        <button onClick={toggleDetails}>{showDetails ? 'Hide' : 'Show'} details</button>
        {showDetails && <p>🎉 Custom hooks are just functions!</p>}

        <h4>useWindowWidth</h4>
        <p>Resize the window: <strong>{width}px</strong> {width < 760 ? '📱' : '🖥️'}</p>

        <h4>useCounter (min 0, max 5)</h4>
        <div className="row">
          <button onClick={stars.decrement}>−</button>
          <span style={{ fontSize: 22 }}>{'★'.repeat(stars.count)}{'☆'.repeat(5 - stars.count)}</span>
          <button onClick={stars.increment}>+</button>
          <button onClick={stars.reset}>Reset</button>
        </div>

        <h4>useLocalStorage (src/hooks/useLocalStorage.js)</h4>
        <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Type, then refresh the page" style={{ width: '100%' }} />
      </Demo>

      <Exercise>
        <ol>
          <li>Write <code>useDocumentTitle(title)</code> that sets <code>document.title</code>.</li>
          <li>Write <code>useFetch(url)</code> returning <code>{'{ data, loading, error }'}</code> — reuse the logic from Lesson 8.</li>
          <li>Move <code>useToggle</code> into <code>src/hooks/useToggle.js</code> and import it.</li>
        </ol>
      </Exercise>
    </Lesson>
  )
}
