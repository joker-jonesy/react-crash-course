/**
 * LESSON 8 — SIDE EFFECTS with useEffect
 * ======================================
 * Rendering should be "pure": just calculate JSX from props & state.
 * Anything that reaches OUTSIDE React is a side effect:
 *   fetching data, timers, subscriptions, document.title, localStorage…
 *
 *   useEffect(() => {
 *     // runs AFTER the component renders
 *     return () => { … }   // optional CLEANUP: runs before the next effect / on unmount
 *   }, [dependencies])
 *
 * The dependency array controls WHEN it runs:
 *   no array      -> after every render
 *   []            -> once, after the first render (on "mount")
 *   [a, b]        -> after the first render, and whenever a or b change
 *
 * Note: in development, StrictMode runs effects twice on mount to help you
 * catch missing cleanups. That's expected!
 */
import { useEffect, useState } from 'react'
import Lesson, { Demo, Exercise } from '../components/Lesson.jsx'

// Effect WITH cleanup: a timer that must be stopped when the component unmounts
function Stopwatch() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    // Cleanup — without this, intervals would stack up forever!
    return () => clearInterval(id)
  }, [running]) // re-run whenever `running` changes

  return (
    <div className="row">
      <strong style={{ fontSize: 24, minWidth: 60 }}>{seconds}s</strong>
      <button onClick={() => setRunning(!running)}>{running ? 'Pause' : 'Start'}</button>
      <button onClick={() => setSeconds(0)}>Reset</button>
    </div>
  )
}

// Effect that syncs React state -> the browser tab title
function TitleUpdater() {
  const [clicks, setClicks] = useState(0)

  useEffect(() => {
    const original = document.title
    document.title = `Clicked ${clicks} times`
    return () => { document.title = original } // restore when leaving the page
  }, [clicks])

  return <button onClick={() => setClicks(clicks + 1)}>Update tab title ({clicks})</button>
}

// Effect that FETCHES data from an API
function UserFetcher() {
  const [userId, setUserId] = useState(1)
  // Store what came back AND which id it belongs to
  const [result, setResult] = useState(null) // { id, user } or { id, error }

  useEffect(() => {
    let ignore = false // prevents a slow old request from overwriting a newer one

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((user) => { if (!ignore) setResult({ id: userId, user }) })
      .catch((err) => { if (!ignore) setResult({ id: userId, error: err.message }) })

    return () => { ignore = true }
  }, [userId])

  // "Loading" is DERIVED: we're loading if the result isn't for the current id yet
  const loading = result?.id !== userId

  return (
    <div className="stack">
      <div className="row">
        <button onClick={() => setUserId((id) => Math.max(1, id - 1))}>← Prev</button>
        <span>User #{userId}</span>
        <button onClick={() => setUserId((id) => Math.min(10, id + 1))}>Next →</button>
      </div>
      {loading && <p>⏳ Loading…</p>}
      {!loading && result.error && <p className="error">Error: {result.error}</p>}
      {!loading && result.user && (
        <div className="card">
          <strong>{result.user.name}</strong>
          <div className="muted">{result.user.email}</div>
          <div>{result.user.company?.name}</div>
        </div>
      )}
    </div>
  )
}

export default function EffectsLesson() {
  const [showStopwatch, setShowStopwatch] = useState(true)

  return (
    <Lesson slug="effects">
      <p>
        <code>useEffect</code> lets a component <strong>synchronize with something outside
        React</strong> — timers, the network, the browser APIs.
      </p>

      <pre><code>{`useEffect(() => {
  const id = setInterval(tick, 1000)
  return () => clearInterval(id)   // cleanup
}, [])                             // dependency array`}</code></pre>

      <Demo>
        <h4>Timer with cleanup</h4>
        <label className="row">
          <input type="checkbox" checked={showStopwatch} onChange={(e) => setShowStopwatch(e.target.checked)} />
          Mount stopwatch (unchecking runs the cleanup)
        </label>
        {showStopwatch && <Stopwatch />}

        <h4>Syncing with document.title</h4>
        <TitleUpdater />

        <h4>Fetching data</h4>
        <UserFetcher />
      </Demo>

      <h3>You might not need an effect</h3>
      <p>
        If you can calculate something from existing props/state, just compute it during render
        (like <code>remaining</code> in Lesson 6). Effects are for talking to the outside world.
      </p>

      <Exercise>
        <ol>
          <li>Remove the <code>return () =&gt; clearInterval(id)</code> line. Start/pause a few times — what happens?</li>
          <li>Add <code>console.log('effect ran')</code> inside each effect and watch when they run.</li>
          <li>Fetch from <code>https://jsonplaceholder.typicode.com/posts?userId=1</code> and list the post titles.</li>
        </ol>
      </Exercise>
    </Lesson>
  )
}
