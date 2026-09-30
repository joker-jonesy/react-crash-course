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
 *
 * Part 2 of this file covers DEPLOYING a routed app to GitHub Pages, and the
 * "404 on refresh" problem every single-page app hits on static hosting.
 */
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import Lesson, { Demo, Exercise } from '../components/Lesson.jsx'
import { lessons } from '../data/lessons.js'
import { students } from '../data/students.js'

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

      <DeployToGitHubPages />

      <Exercise>
        <ol>
          <li>Add a <code>/contact</code> page: create <code>src/pages/Contact.jsx</code>, add a <code>&lt;Route&gt;</code>, and a <code>&lt;NavLink&gt;</code> in the header.</li>
          <li>Add a search box on <code>/students</code> that stores its text in <code>?q=</code> using <code>useSearchParams</code>.</li>
          <li>Create a nested route <code>/students/:studentId/projects</code> that renders inside the student page with an <code>&lt;Outlet /&gt;</code>.</li>
          <li>After submitting the form in Lesson 7, redirect to <code>/students</code> with <code>useNavigate</code>.</li>
          <li>Deploy your own Vite + React Router project to GitHub Pages using the steps above. Then open a deep link directly and refresh it.</li>
        </ol>
      </Exercise>
    </Lesson>
  )
}

/* =====================================================================
 * PART 2 — DEPLOYING TO GITHUB PAGES
 * =====================================================================
 * The routing problem:
 *   Locally, Vite's dev server answers EVERY URL with index.html, so
 *   /students/3 always works. GitHub Pages is a *static file host*: it only
 *   answers with files that exist. There is no file called "students/3",
 *   so visiting that URL directly (or refreshing it) gives a 404, even though
 *   clicking a <Link> to it works fine (that never asks the server anything).
 *
 * The fixes used in this repo:
 *   1. `base` in vite.config.js      -> assets load from /<repo-name>/…
 *   2. `basename` on <BrowserRouter> -> routes ignore the /<repo-name> prefix
 *   3. an HTML file for every route  -> Pages finds a real file (200 OK)
 *      + 404.html                    -> unknown URLs still show our NotFound page
 */

// Every URL this app really has, used by the simulator below.
// (scripts/spa-fallback.js builds the same list to generate the HTML files.)
const knownRoutes = new Set([
  '/',
  '/about',
  '/home',
  '/lessons',
  ...lessons.map((l) => `/lessons/${l.slug}`),
  '/students',
  ...students.map((s) => `/students/${s.id}`),
])

// What GitHub Pages sends back for a URL, depending on how the site was built
function simulate(setup, path) {
  const isHome = path === '/'
  const isRealRoute = knownRoutes.has(path)
  const reactShows = isRealRoute ? 'your page' : 'the NotFound page'

  if (setup === 'none') {
    return isHome
      ? { status: 200, result: 'App loads ✅' }
      : { status: 404, result: "GitHub's own 404 page. Your app never loads ❌" }
  }
  if (setup === 'fallback404') {
    return isHome
      ? { status: 200, result: 'App loads ✅' }
      : { status: 404, result: `404.html is your app, so React Router shows ${reactShows}. It works, but the status code says "missing" ⚠️` }
  }
  // perRoute
  const file = isHome ? 'index.html' : `${path.slice(1)}.html`
  return isHome || isRealRoute
    ? { status: 200, result: `A real file exists (${file}), so the app loads with 200 ✅` }
    : { status: 404, result: 'No file, so 404.html loads the app and React Router shows the NotFound page. A correct 404 ✅' }
}

const setups = [
  ['none', 'No fallback'],
  ['fallback404', 'Copy index.html → 404.html'],
  ['perRoute', 'HTML file per route + 404.html (this repo)'],
]

function PagesSimulator() {
  const [path, setPath] = useState('/students/3')
  const normalized = '/' + path.trim().replace(/^\/+|\/+$/g, '')

  return (
    <div className="stack">
      <div className="row">
        <label>
          Visit <code>https://you.github.io/repo</code>
          <input value={path} onChange={(e) => setPath(e.target.value)} style={{ width: 160 }} />
        </label>
        {['/', '/students/3', '/lessons/jsx', '/nope'].map((p) => (
          <button key={p} onClick={() => setPath(p)}>{p}</button>
        ))}
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ textAlign: 'left' }}>
            <th style={{ padding: '0.4rem 1rem 0.4rem 0' }}>How the site was built</th>
            <th style={{ padding: '0.4rem 1rem 0.4rem 0' }}>Status</th>
            <th>What the visitor sees</th>
          </tr>
        </thead>
        <tbody>
          {setups.map(([key, label]) => {
            const { status, result } = simulate(key, normalized)
            return (
              <tr key={key} style={{ borderTop: '1px solid var(--border)' }}>
                <td style={{ padding: '0.4rem 1rem 0.4rem 0' }}>{label}</td>
                <td style={{ padding: '0.4rem 1rem 0.4rem 0' }}>
                  <strong className={status === 200 ? 'success' : 'error'}>{status}</strong>
                </td>
                <td style={{ padding: '0.4rem 0' }}>{result}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function DeployToGitHubPages() {
  return (
    <>
      <h2 style={{ marginTop: '3rem' }}>Part 2: Deploying to GitHub Pages</h2>

      <h3>The problem: "It works locally, but 404s on GitHub Pages!"</h3>
      <p>
        React Router runs <strong>in the browser</strong>. When you click a <code>&lt;Link&gt;</code>,
        no request goes to the server; React just swaps components. But when you <strong>type a URL,
        refresh, or open a shared link</strong>, the browser asks the server for that path.
      </p>
      <ul>
        <li>
          <strong>Vite's dev server</strong> answers every path with <code>index.html</code>, so it
          always works locally.
        </li>
        <li>
          <strong>GitHub Pages</strong> is a static file host. It only returns files that exist. There
          is no file at <code>/students/3</code>, so you get a 404 before React even loads.
        </li>
      </ul>
      <p>
        There's a second catch: Pages serves your site from <code>https://you.github.io/<strong>repo-name</strong>/</code>,
        not from <code>/</code>. Without telling Vite and React Router about that sub-path, you get a
        blank page (the JS and CSS files 404) and no route matches.
      </p>

      <Demo>
        <h4>What does GitHub Pages return?</h4>
        <p className="muted">
          Try a real route, an unknown one, and the home page. Compare the three ways of building the
          site.
        </p>
        <PagesSimulator />
      </Demo>

      <p>
        The simple, widely used fix is copying <code>index.html</code> to <code>404.html</code>. It
        works: visitors see the right page. But every deep link technically returns a
        <strong> 404 status</strong>, which shows up as a red error in the browser console and tells
        search engines the page doesn't exist. This repo started that way. It now generates one HTML
        file per route, so real pages return 200 and only truly unknown URLs return 404.
      </p>

      <h3>Step-by-step: deploy your Vite + React Router app</h3>

      <h4>1. Put your project on GitHub</h4>
      <pre><code>{`git init
git add .
git commit -m "First commit"
# create an empty repo on github.com, then:
git remote add origin https://github.com/<you>/<repo-name>.git
git push -u origin main`}</code></pre>
      <p className="muted">
        Or with the GitHub CLI: <code>gh repo create &lt;repo-name&gt; --public --source . --push</code>.
        Free accounts need a <strong>public</strong> repo for Pages.
      </p>

      <h4>2. Set the base path in <code>vite.config.js</code></h4>
      <pre><code>{`export default defineConfig(({ command, isPreview }) => ({
  plugins: [react()],
  // must match your repo name, with slashes on both sides
  base: command === 'build' || isPreview ? '/<repo-name>/' : '/',
}))`}</code></pre>
      <p className="muted">
        Now built files load from <code>/&lt;repo-name&gt;/assets/…</code>. <code>npm run dev</code> keeps using <code>/</code>.
      </p>

      <h4>3. Tell React Router about it: <code>basename</code></h4>
      <pre><code>{`// src/main.jsx
<BrowserRouter basename={import.meta.env.BASE_URL}>
  <App />
</BrowserRouter>`}</code></pre>
      <p className="muted">
        Vite fills in <code>import.meta.env.BASE_URL</code> from <code>base</code>. Your{' '}
        <code>&lt;Link to="/about"&gt;</code> automatically becomes <code>/&lt;repo-name&gt;/about</code>.
        Don't hard-code the repo name into your links.
      </p>

      <h4>4. Add the fallback so deep links work</h4>
      <p><strong>Option A: simple.</strong> In the workflow (step 5), after building, add:</p>
      <pre><code>{`- run: cp dist/index.html dist/404.html`}</code></pre>
      <p>
        <strong>Option B: correct status codes (what this repo does).</strong> Add a script that copies{' '}
        <code>index.html</code> to one file per route, and run it after the build:
      </p>
      <pre><code>{`// scripts/spa-fallback.js
import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'

const routes = ['about', 'students', 'students/1', 'students/2' /* … */]

for (const route of routes) {
  const file = join('dist', \`\${route}.html\`)   // dist/students/1.html
  mkdirSync(dirname(file), { recursive: true })
  copyFileSync('dist/index.html', file)
}
copyFileSync('dist/index.html', 'dist/404.html')

// package.json
"build": "vite build && node scripts/spa-fallback.js"`}</code></pre>
      <p className="muted">
        GitHub Pages serves <code>/students/1</code> from <code>students/1.html</code> automatically.
        Remember to add new pages to the list. See <code>scripts/spa-fallback.js</code> for the full
        version, which builds the list from the app's data.
      </p>

      <h4>5. Add a GitHub Actions workflow</h4>
      <p>Create <code>.github/workflows/deploy.yml</code>:</p>
      <pre><code>{`name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      # Option A only: - run: cp dist/index.html dist/404.html
      - uses: actions/upload-pages-artifact@v5
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v5`}</code></pre>

      <h4>6. Turn on Pages</h4>
      <p>
        On GitHub: <strong>Settings → Pages → Build and deployment → Source: GitHub Actions</strong>.
      </p>

      <h4>7. Push and watch it deploy</h4>
      <pre><code>{`git add .
git commit -m "Deploy to GitHub Pages"
git push`}</code></pre>
      <p>
        Open the <strong>Actions</strong> tab to watch the run. When it's green, your site is live at{' '}
        <code>https://&lt;you&gt;.github.io/&lt;repo-name&gt;/</code>. Every push to <code>main</code>{' '}
        redeploys it automatically.
      </p>

      <h4>8. Test it like a visitor</h4>
      <ul>
        <li>Open a deep link like <code>/&lt;repo-name&gt;/about</code> directly in a new tab, then <strong>refresh</strong>.</li>
        <li>Open DevTools → Network and check the page's status is <strong>200</strong>.</li>
        <li>Try a made-up URL: you should see your NotFound page.</li>
        <li>Test before pushing with <code>npm run build && npm run preview</code>, which serves the build at the same sub-path.</li>
      </ul>

      <h3>Troubleshooting</h3>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          {[
            ['Blank white page, console shows 404s for .js/.css files', <>Missing or wrong <code>base</code> in <code>vite.config.js</code>. It must be <code>/&lt;repo-name&gt;/</code>, exactly matching the repo name.</>],
            ['Home page works, but every page shows NotFound', <>Missing <code>basename</code> on <code>&lt;BrowserRouter&gt;</code>.</>],
            ['Clicking links works, refreshing gives GitHub\'s 404 page', <>No fallback. Add <code>404.html</code> (step 4).</>],
            ['Pages load, but console shows a 404 for the page itself', <>You're using Option A. Switch to Option B for real 200s.</>],
            ['Workflow fails at "deploy"', <>Pages source isn't set to <strong>GitHub Actions</strong> (step 6).</>],
            ['Images in public/ are missing', <>Use <code>{'{import.meta.env.BASE_URL + "logo.png"}'}</code> instead of <code>"/logo.png"</code> in JSX.</>],
          ].map(([problem, fix]) => (
            <tr key={problem} style={{ borderTop: '1px solid var(--border)' }}>
              <td style={{ padding: '0.4rem 1rem 0.4rem 0', verticalAlign: 'top' }}><strong>{problem}</strong></td>
              <td style={{ padding: '0.4rem 0' }}>{fix}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="muted">
        Alternative: <code>HashRouter</code> puts the route after a <code>#</code>{' '}
        (<code>/repo/#/about</code>). The server never sees it, so no fallback is needed, but the URLs
        are uglier. Prefer <code>BrowserRouter</code> with the steps above.
      </p>
    </>
  )
}
