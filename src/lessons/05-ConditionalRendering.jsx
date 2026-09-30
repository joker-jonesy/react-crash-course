/**
 * LESSON 5 — CONDITIONAL RENDERING
 * ================================
 * JSX is JavaScript, so we use normal JS to decide what to show:
 *
 *   1. if / early return      -> if (!user) return <Login />
 *   2. ternary  ? :           -> {isLoggedIn ? <Dashboard /> : <Login />}
 *   3. logical AND  &&        -> {hasError && <p>Oops</p>}
 *   4. return null            -> render nothing
 *
 * ⚠️ && gotcha: {count && <p>…</p>} renders "0" when count is 0.
 *    Use {count > 0 && <p>…</p>} instead.
 */
import { useState } from 'react'
import Lesson, { Demo, Exercise } from '../components/Lesson.jsx'

// 1. Early return
function Greeting({ user }) {
  if (!user) {
    return <p>👋 Please log in.</p>
  }
  return <p>Welcome back, <strong>{user}</strong>!</p>
}

// 4. Returning null hides the component entirely
function Warning({ show }) {
  if (!show) return null
  return <p className="error">⚠️ This is a warning!</p>
}

// A lookup object is often cleaner than a long if/else chain
const statusIcons = { loading: '⏳ Loading…', success: '✅ Done!', error: '❌ Failed' }

export default function ConditionalLesson() {
  const [user, setUser] = useState(null)
  const [showWarning, setShowWarning] = useState(false)
  const [notifications, setNotifications] = useState(0)
  const [status, setStatus] = useState('loading')

  return (
    <Lesson slug="conditional-rendering">
      <p>Show different UI depending on state — using plain JavaScript conditions.</p>

      <pre><code>{`{isLoggedIn ? <Dashboard /> : <Login />}
{notifications > 0 && <Badge count={notifications} />}`}</code></pre>

      <Demo>
        <h4>if / early return</h4>
        <Greeting user={user} />
        {/* 2. Ternary: choose between two things */}
        {user ? (
          <button onClick={() => setUser(null)}>Log out</button>
        ) : (
          <button className="primary" onClick={() => setUser('Ada')}>Log in as Ada</button>
        )}

        <h4>&amp;&amp; (show or nothing)</h4>
        <div className="row">
          <button onClick={() => setNotifications((n) => n + 1)}>New notification</button>
          <button onClick={() => setNotifications(0)}>Clear</button>
          {/* 3. Only renders when the left side is true */}
          {notifications > 0 && <span>🔔 You have {notifications} notification{notifications > 1 && 's'}</span>}
        </div>

        <h4>return null</h4>
        <label className="row">
          <input type="checkbox" checked={showWarning} onChange={(e) => setShowWarning(e.target.checked)} />
          Show warning
        </label>
        <Warning show={showWarning} />

        <h4>Lookup object</h4>
        <div className="row">
          {Object.keys(statusIcons).map((s) => (
            <button key={s} onClick={() => setStatus(s)}>{s}</button>
          ))}
          <span>{statusIcons[status]}</span>
        </div>
      </Demo>

      <Exercise>
        <ol>
          <li>Change <code>{'notifications > 0 &&'}</code> to <code>{'notifications &&'}</code>. Clear the notifications. What appears?</li>
          <li>Add a "premium" checkbox and show a ⭐ next to the user's name only when checked.</li>
          <li>Add an <code>"idle"</code> status to the lookup object.</li>
        </ol>
      </Exercise>
    </Lesson>
  )
}
