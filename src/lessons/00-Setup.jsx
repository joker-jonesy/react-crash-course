/**
 * LESSON 0 — SETTING UP A REACT PROJECT WITH VITE
 * ===============================================
 * Vite ("veet", French for "fast") is a build tool. It gives you:
 *   - a dev server that reloads the page the moment you save (HMR)
 *   - JSX → plain JavaScript conversion, so browsers can run it
 *   - `npm run build` to bundle and optimize everything for production
 *
 * This page is mostly reading. The live demo generates the setup
 * commands for whatever project name / options you pick.
 */
import { useState } from 'react'
import Lesson, { Demo, Exercise } from '../components/Lesson.jsx'

// Every file the React template generates, and what it's for
const templateFiles = [
  ['index.html', 'The ONE html page. React mounts into its <div id="root">. Loads src/main.jsx.'],
  ['src/main.jsx', 'Entry point. createRoot(...).render(<App />) hands the page over to React.'],
  ['src/App.jsx', 'Your top-level component. Start editing here.'],
  ['src/App.css, src/index.css', 'Starter styles. Delete or replace them.'],
  ['src/assets/', 'Images you import in code (import logo from "./assets/react.svg").'],
  ['public/', 'Files copied as-is. /favicon.svg in HTML means public/favicon.svg.'],
  ['vite.config.js', 'Vite settings. The React plugin enables JSX and Fast Refresh.'],
  ['package.json', 'Project name, dependencies, and npm scripts (dev, build, preview, lint).'],
  ['.oxlintrc.json', 'Linter rules (catches mistakes like breaking the Rules of Hooks).'],
  ['node_modules/', 'Installed packages. Never edit it, never commit it (it is in .gitignore).'],
]

const managers = {
  npm: { create: 'npm create vite@latest', install: 'npm install', add: 'npm install', run: 'npm run' },
  pnpm: { create: 'pnpm create vite', install: 'pnpm install', add: 'pnpm add', run: 'pnpm' },
  yarn: { create: 'yarn create vite', install: 'yarn', add: 'yarn add', run: 'yarn' },
}

function CommandBuilder() {
  const [name, setName] = useState('my-react-app')
  const [template, setTemplate] = useState('react')
  const [manager, setManager] = useState('npm')
  const [withRouter, setWithRouter] = useState(true)

  const pm = managers[manager]
  // npm needs an extra "--" to pass flags through to create-vite
  const separator = manager === 'npm' ? ' --' : ''
  const safeName = name.trim().replace(/\s+/g, '-') || 'my-react-app'

  const lines = [
    `${pm.create} ${safeName}${separator} --template ${template}`,
    `cd ${safeName}`,
    pm.install,
    withRouter && `${pm.add} react-router`,
    `${pm.run} dev`,
  ].filter(Boolean) // drop the router line when it's `false`

  return (
    <div className="stack">
      <div className="row">
        <label>Project name <input value={name} onChange={(e) => setName(e.target.value)} /></label>
        <label>
          Template{' '}
          <select value={template} onChange={(e) => setTemplate(e.target.value)}>
            <option value="react">react (JavaScript)</option>
            <option value="react-ts">react-ts (TypeScript)</option>
          </select>
        </label>
        <label>
          Package manager{' '}
          <select value={manager} onChange={(e) => setManager(e.target.value)}>
            {Object.keys(managers).map((m) => <option key={m}>{m}</option>)}
          </select>
        </label>
        <label className="row">
          <input type="checkbox" checked={withRouter} onChange={(e) => setWithRouter(e.target.checked)} />
          Add React Router
        </label>
      </div>
      <pre><code>{lines.join('\n')}</code></pre>
    </div>
  )
}

export default function SetupLesson() {
  return (
    <Lesson slug="setup">
      <p>
        Before writing any React, you need a project. We use <strong>Vite</strong> to create one:
        it sets up the dev server, the JSX compiler, and the production build in one command.
      </p>

      <h3>Step 1: Install Node.js</h3>
      <p>
        Download the <strong>LTS</strong> version from <a href="https://nodejs.org" target="_blank" rel="noreferrer">nodejs.org</a>.
        Vite needs Node 20.19+ or 22.12+. Check what you have:
      </p>
      <pre><code>{`node -v
npm -v`}</code></pre>

      <h3>Step 2: Create the project</h3>
      <pre><code>{`npm create vite@latest my-react-app -- --template react`}</code></pre>
      <p>
        Leave off <code>--template react</code> and Vite asks you questions instead: choose{' '}
        <strong>React</strong>, then <strong>JavaScript</strong>. (Pick <strong>TypeScript</strong>{' '}
        once you're comfortable with React.)
      </p>

      <h3>Step 3: Install and run</h3>
      <pre><code>{`cd my-react-app
npm install     # downloads react, react-dom, vite… into node_modules/
npm run dev     # starts the dev server`}</code></pre>
      <p>
        Open the URL it prints (usually <code>http://localhost:5173</code>). Edit{' '}
        <code>src/App.jsx</code>, save, and the browser updates instantly with no refresh.
        That's <strong>HMR</strong> (Hot Module Replacement). Stop the server with <code>Ctrl + C</code>.
      </p>

      <Demo>
        <h4>Command builder</h4>
        <p className="muted">Pick your options and copy the commands.</p>
        <CommandBuilder />
      </Demo>

      <h3>What you get</h3>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          {templateFiles.map(([file, purpose]) => (
            <tr key={file} style={{ borderTop: '1px solid var(--border)' }}>
              <td style={{ padding: '0.4rem 1rem 0.4rem 0', whiteSpace: 'nowrap' }}><code>{file}</code></td>
              <td style={{ padding: '0.4rem 0' }}>{purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>How the pieces connect</h3>
      <pre><code>{`index.html
  └─ <script type="module" src="/src/main.jsx">
        └─ createRoot(document.getElementById('root')).render(<App />)
              └─ App.jsx  → your components`}</code></pre>

      <h3>Step 4: Clean up the starter template</h3>
      <ol>
        <li>Replace everything in <code>src/App.jsx</code> with:
          <pre><code>{`export default function App() {
  return <h1>Hello React!</h1>
}`}</code></pre>
        </li>
        <li>Delete <code>src/App.css</code> and the images in <code>src/assets/</code> you don't use.</li>
        <li>Empty out <code>src/index.css</code> (or keep a few base styles).</li>
      </ol>

      <h3>Step 5: Add React Router</h3>
      <pre><code>{`npm install react-router`}</code></pre>
      <p>Wrap the app in <code>&lt;BrowserRouter&gt;</code> in <code>src/main.jsx</code>:</p>
      <pre><code>{`import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)`}</code></pre>
      <p>Then define your pages in <code>src/App.jsx</code>. Lesson 12 covers this in depth.</p>
      <pre><code>{`import { Routes, Route, Link } from 'react-router'

export default function App() {
  return (
    <>
      <nav><Link to="/">Home</Link> | <Link to="/about">About</Link></nav>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
      </Routes>
    </>
  )
}`}</code></pre>

      <h3>The npm scripts</h3>
      <ul>
        <li><code>npm run dev</code>: development server with HMR. Use this while coding.</li>
        <li><code>npm run build</code>: optimized production files in <code>dist/</code>.</li>
        <li><code>npm run preview</code>: serve <code>dist/</code> locally to test the build.</li>
        <li><code>npm run lint</code>: check your code for common mistakes.</li>
      </ul>

      <Exercise>
        <ol>
          <li>Create a brand-new project with the commands above and get the counter page running.</li>
          <li>Clean up the template so it only shows "Hello React!".</li>
          <li>Install React Router and add a Home and an About page with links between them.</li>
          <li>Run <code>npm run build</code> and look inside <code>dist/</code>. Where did your JSX go?</li>
        </ol>
      </Exercise>
    </Lesson>
  )
}
