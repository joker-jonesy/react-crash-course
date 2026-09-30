/**
 * LESSON 10 — CONTEXT (useContext)
 * ================================
 * Passing props through many layers that don't use them = "prop drilling".
 * Context lets a parent make a value available to EVERY component below it.
 *
 * Real example in this project: src/context/ThemeContext.js + ThemeProvider.jsx
 *   - <ThemeProvider> wraps the whole app in main.jsx
 *   - <ThemeToggle> in the header calls useTheme() to read/change it
 *   - this lesson reads the same theme below
 *
 * Good uses: theme, logged-in user, language, a shopping cart.
 * Don't reach for it for everything — props are simpler and more explicit.
 */
import { createContext, useContext, useState } from 'react'
import Lesson, { Demo, Exercise } from '../components/Lesson.jsx'
import { useTheme } from '../context/ThemeContext.js'

// ---- A small local example: user context ----
const UserContext = createContext(null)

function Page() {
  // Page doesn't care about the user — it doesn't have to pass it along!
  return (
    <div className="card">
      <p className="muted">&lt;Page&gt; (no props)</p>
      <Sidebar />
    </div>
  )
}

function Sidebar() {
  return (
    <div className="card">
      <p className="muted">&lt;Sidebar&gt; (no props)</p>
      <UserAvatar />
    </div>
  )
}

function UserAvatar() {
  // Deep in the tree — reads directly from context
  const { user, setUser } = useContext(UserContext)
  return (
    <div className="card row">
      <span>&lt;UserAvatar&gt; says: <strong>{user}</strong></span>
      <button onClick={() => setUser(user === 'Ada' ? 'Grace' : 'Ada')}>Switch user</button>
    </div>
  )
}

export default function ContextLesson() {
  const [user, setUser] = useState('Ada')
  const { theme, toggleTheme } = useTheme()

  return (
    <Lesson slug="context">
      <p>
        Context lets you "teleport" data to any component below a provider, without passing props
        through every level.
      </p>

      <pre><code>{`const UserContext = createContext(null)            // 1. create

<UserContext value={{ user, setUser }}>            // 2. provide
  <Page />
</UserContext>

const { user } = useContext(UserContext)          // 3. consume (anywhere below)`}</code></pre>

      <Demo>
        <h4>Skipping the middle components</h4>
        <UserContext value={{ user, setUser }}>
          <Page />
        </UserContext>

        <h4>App-wide theme (src/context/ThemeContext.js + ThemeProvider.jsx)</h4>
        <div className="row">
          <span>Current theme: <code>{theme}</code></span>
          <button onClick={toggleTheme}>Toggle theme</button>
          <span className="muted">— the header button uses the same context!</span>
        </div>
      </Demo>

      <Exercise>
        <ol>
          <li>Rewrite the Page/Sidebar/UserAvatar example using props only. Count how many props you had to add.</li>
          <li>Create a <code>LanguageContext</code> with <code>'en'</code>/<code>'es'</code> and translate a greeting.</li>
          <li>Move the cart from Lesson 9 into a <code>CartContext</code>.</li>
        </ol>
      </Exercise>
    </Lesson>
  )
}
