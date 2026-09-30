/**
 * LESSON 12 — ROUTING with React Router
 * =====================================
 * A React app is a "Single Page Application": the browser loads ONE html file,
 * and React swaps components based on the URL — no full page reloads.
 *
 * Setup in this project:
 *   1. npm install react-router
 *   2. src/main.jsx  -> wrap <App /> in <BrowserRouter>
 *   3. src/App.jsx   -> declare <Routes> and <Route path="…" element={…} />
 *
 * Toolbox:
 *   <Link to="/about">             navigate without reloading
 *   <NavLink to="/about">          Link + "active" class when the URL matches
 *   <Outlet />                     where nested child routes render (see layouts/)
 *   <Navigate to="/" />            redirect while rendering
 *   useParams()                    read :dynamic segments   (/students/:studentId)
 *   useNavigate()                  navigate from code       (after a form submit)
 *   useSearchParams()              read/write ?query=strings
 *   useLocation()                  info about the current URL
 */
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import Lesson, { Demo, Exercise } from '../components/Lesson.jsx'

export default function RoutingLesson() {
  const location = useLocation()
  const navigate = useNavigate()
  const [id, setId] = useState('1')

  function goToStudent(e) {
    e.preventDefault()
    navigate(`/students/${id}`) // programmatic navigation
  }

  return (
    <Lesson slug="routing">
      <p>
        React Router maps <strong>URLs to components</strong>. Open{' '}
        <code>src/App.jsx</code> to see this project's entire route map.
      </p>

      <h3>1. Define routes</h3>
      <pre><code>{`// src/main.jsx
<BrowserRouter>
  <App />
</BrowserRouter>

// src/App.jsx
<Routes>
  <Route element={<RootLayout />}>             {/* layout: header + <Outlet /> */}
    <Route index element={<Home />} />         {/* "/" */}
    <Route path="about" element={<About />} /> {/* "/about" */}
    <Route path="students/:studentId" element={<StudentDetail />} />
    <Route path="*" element={<NotFound />} />  {/* 404 */}
  </Route>
</Routes>`}</code></pre>

      <h3>2. Link between pages</h3>
      <pre><code>{`<Link to="/about">About</Link>        // ✅ client-side, no reload
<a href="/about">About</a>            // ❌ reloads the whole app, loses state`}</code></pre>

      <h3>3. Read URL parameters</h3>
      <pre><code>{`// URL: /students/3
const { studentId } = useParams()   // "3" (a string!)`}</code></pre>

      <h3>4. Navigate from code</h3>
      <pre><code>{`const navigate = useNavigate()
navigate('/students/3')
navigate(-1)   // back`}</code></pre>

      <Demo>
        <p>Current location: <code>{location.pathname}</code></p>

        <h4>Links</h4>
        <ul>
          <li><Link to="/students">/students</Link> — list page with <code>?track=</code> filter</li>
          <li><Link to="/students/2">/students/2</Link> — dynamic <code>:studentId</code> param</li>
          <li><Link to="/students?track=Frontend">/students?track=Frontend</Link> — search params</li>
          <li><Link to="/home">/home</Link> — a <code>&lt;Navigate&gt;</code> redirect to /</li>
          <li><Link to="/does-not-exist">/does-not-exist</Link> — the 404 catch-all</li>
        </ul>

        <h4>useNavigate</h4>
        <form onSubmit={goToStudent} className="row">
          <label>Student id <input type="number" min="1" value={id} onChange={(e) => setId(e.target.value)} style={{ width: 80 }} /></label>
          <button className="primary">Go</button>
        </form>

        <h4>Nested routes</h4>
        <p>
          The sidebar on the left lives in <code>src/layouts/LessonsLayout.jsx</code>. Each lesson renders
          inside its <code>&lt;Outlet /&gt;</code>, which is why the sidebar stays put as you change lessons.
        </p>
      </Demo>

      <h3>Deploying tip</h3>
      <p className="muted">
        Because routing happens in the browser, your host must serve <code>index.html</code> for every
        path (a "SPA fallback"). Vite's dev server already does this for you.
      </p>

      <Exercise>
        <ol>
          <li>Add a <code>/contact</code> page: create <code>src/pages/Contact.jsx</code>, add a <code>&lt;Route&gt;</code>, and a <code>&lt;NavLink&gt;</code> in the header.</li>
          <li>Add a search box on <code>/students</code> that stores its text in <code>?q=</code> using <code>useSearchParams</code>.</li>
          <li>Create a nested route <code>/students/:studentId/projects</code> that renders inside the student page with an <code>&lt;Outlet /&gt;</code>.</li>
          <li>After submitting the form in Lesson 7, redirect to <code>/students</code> with <code>useNavigate</code>.</li>
        </ol>
      </Exercise>
    </Lesson>
  )
}
