# ⚛️ React Crash Course

A hands-on reference project for learning how **React** works, built with **Vite** and **React Router**.

Every lesson is a real, heavily commented React component. Run the app, open a lesson in the browser, open its source file in your editor, and edit the code. Vite reloads the page as soon as you save.

---

## 🚀 Getting started

**Prerequisites:** [Node.js](https://nodejs.org) 20.19+ (LTS recommended) and a code editor (VS Code, WebStorm, …).

```bash
git clone https://github.com/joker-jonesy/react-crash-course.git
cd react-crash-course
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

| Command           | What it does                                       |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload               |
| `npm run build`   | Create an optimized production build in `dist/`   |
| `npm run preview` | Serve the production build locally                 |
| `npm run lint`    | Check the code for common mistakes (oxlint)        |

---

## 🛠 Setting up a React project with Vite (from scratch)

> **What is Vite?** A build tool and dev server. While you code, it serves your files to the browser, turns JSX into plain JavaScript, and updates the page the moment you save (HMR, Hot Module Replacement). `npm run build` bundles and optimizes everything for production.
>
> This section is also **Lesson 0** in the app ([`src/lessons/00-Setup.jsx`](src/lessons/00-Setup.jsx)), with a command builder for different project names and package managers.

### 1. Install Node.js

Get the **LTS** version from [nodejs.org](https://nodejs.org). Vite needs Node 20.19+ or 22.12+.

```bash
node -v
```

### 2. Create the project

```bash
npm create vite@latest my-react-app -- --template react
```

Without `--template react`, Vite asks you questions instead: choose **React**, then **JavaScript**. (The extra `--` passes the flag through npm to Vite.)

### 3. Install dependencies and start the dev server

```bash
cd my-react-app
npm install
npm run dev
```

Open http://localhost:5173, edit `src/App.jsx`, and save. The page updates instantly. Stop the server with `Ctrl + C`.

### 4. Know what you got

| File / folder     | Purpose                                                                  |
| ----------------- | ------------------------------------------------------------------------ |
| `index.html`      | The only HTML page. React mounts into `<div id="root">`.                  |
| `src/main.jsx`    | Entry point: `createRoot(...).render(<App />)`.                          |
| `src/App.jsx`     | Your top-level component. Start editing here.                            |
| `src/*.css`       | Starter styles, safe to delete or replace.                               |
| `src/assets/`     | Images you `import` in code.                                             |
| `public/`         | Files served as-is (e.g. `/favicon.svg`).                                |
| `vite.config.js`  | Vite settings. The React plugin enables JSX and Fast Refresh.            |
| `package.json`    | Dependencies and scripts (`dev`, `build`, `preview`, `lint`).            |
| `node_modules/`   | Installed packages. Never edit or commit it.                              |

```
index.html → <script src="/src/main.jsx"> → createRoot(#root).render(<App />) → your components
```

### 5. Clean up the template

Replace `src/App.jsx` with:

```jsx
export default function App() {
  return <h1>Hello React!</h1>
}
```

Then delete `src/App.css` and any images in `src/assets/` you don't need.

### 6. Add React Router

```bash
npm install react-router
```

Wrap the app in `<BrowserRouter>` in `src/main.jsx`:

```jsx
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

Define pages in `src/App.jsx`:

```jsx
import { Routes, Route, Link } from 'react-router'

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
}
```

That's the whole setup this repo started from. See [`src/main.jsx`](src/main.jsx) and [`src/App.jsx`](src/App.jsx) for the full version, and Lesson 12 for routing in depth.

---

## 📚 Lessons

Start with **Lesson 0** if you've never set up a React project, then work through the rest in order. Each file has an explanation at the top, a live demo, and exercises at the bottom.

| #  | Topic                        | File                                                                 | Key ideas                                                  |
| -- | ---------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------- |
| 0  | Setting Up with Vite         | [`00-Setup.jsx`](src/lessons/00-Setup.jsx)                           | `npm create vite`, project files, npm scripts, adding React Router |
| 1  | JSX                          | [`01-Jsx.jsx`](src/lessons/01-Jsx.jsx)                               | `{expressions}`, `className`, fragments, inline styles     |
| 2  | Components & Props           | [`02-ComponentsProps.jsx`](src/lessons/02-ComponentsProps.jsx)       | Reusable components, props, default values, `children`     |
| 3  | State                        | [`03-State.jsx`](src/lessons/03-State.jsx)                           | `useState`, re-rendering, updating objects and arrays without mutating them |
| 4  | Events                       | [`04-Events.jsx`](src/lessons/04-Events.jsx)                         | `onClick`, `onChange`, event object, child → parent        |
| 5  | Conditional Rendering        | [`05-ConditionalRendering.jsx`](src/lessons/05-ConditionalRendering.jsx) | `if`, ternary, `&&`, `return null`                     |
| 6  | Lists & Keys                 | [`06-ListsKeys.jsx`](src/lessons/06-ListsKeys.jsx)                   | `.map()`, `key`, `.filter()`, derived data                 |
| 7  | Forms                        | [`07-Forms.jsx`](src/lessons/07-Forms.jsx)                           | Controlled inputs, validation, `onSubmit`                  |
| 8  | Side Effects                 | [`08-Effects.jsx`](src/lessons/08-Effects.jsx)                       | `useEffect`, dependency array, cleanup, fetching data      |
| 9  | Lifting State Up             | [`09-LiftingState.jsx`](src/lessons/09-LiftingState.jsx)             | Sharing state between siblings                             |
| 10 | Context                      | [`10-Context.jsx`](src/lessons/10-Context.jsx)                       | `createContext`, `useContext`, avoiding prop drilling      |
| 11 | Custom Hooks                 | [`11-CustomHooks.jsx`](src/lessons/11-CustomHooks.jsx)               | Reusing stateful logic, `useLocalStorage`                  |
| 12 | Routing                      | [`12-Routing.jsx`](src/lessons/12-Routing.jsx)                       | `Routes`, `Link`, `NavLink`, `useParams`, `useNavigate`, deploying to GitHub Pages |

---

## 🗂 Project structure

```
react-crash-course/
├── index.html               ← the ONE html page; React mounts into <div id="root">
├── vite.config.js           ← Vite config (uses the React plugin)
├── package.json             ← dependencies & npm scripts
└── src/
    ├── main.jsx             ← entry point: createRoot + <BrowserRouter> + providers
    ├── App.jsx              ← the route map (every URL → component)
    ├── index.css            ← global styles
    ├── layouts/
    │   ├── RootLayout.jsx   ← header + nav + <Outlet /> (wraps every page)
    │   └── LessonsLayout.jsx← sidebar + <Outlet /> (nested layout for /lessons/*)
    ├── pages/               ← one component per URL
    │   ├── Home.jsx, About.jsx, NotFound.jsx, LessonsIndex.jsx
    │   └── students/        ← routing demo: list + :studentId detail page
    ├── lessons/             ← 📚 the lessons (00-Setup … 12-Routing)
    ├── components/          ← reusable UI pieces (Lesson wrapper, ThemeToggle)
    ├── context/             ← ThemeContext (app-wide dark/light mode)
    ├── hooks/               ← custom hooks (useLocalStorage)
    └── data/                ← plain JS data (lessons list, fake students)
```

---

## 🧭 Routing map

Defined in [`src/App.jsx`](src/App.jsx):

| URL                     | Component       | Demonstrates                               |
| ----------------------- | --------------- | ------------------------------------------ |
| `/`                     | `Home`          | Index route                                |
| `/about`                | `About`         | Basic route                                |
| `/lessons`              | `LessonsIndex`  | Nested index route inside `LessonsLayout`  |
| `/lessons/:lesson`      | a lesson        | Nested routes + shared layout (`<Outlet />`) |
| `/students`             | `StudentsList`  | `useSearchParams` (`?track=Frontend`)      |
| `/students/:studentId`  | `StudentDetail` | `useParams`, `useNavigate`                 |
| `/home`                 | —               | `<Navigate>` redirect to `/`               |
| `*`                     | `NotFound`      | Catch-all 404                              |

---

## 🧠 How React works (the 60-second version)

1. **Components are functions** that return JSX describing what the UI should look like.
2. **Props** go *into* a component from its parent (read-only).
3. **State** is data a component *owns*. Change it with the setter from `useState`.
4. When state changes, React **re-runs the component** and updates only the parts of the page that changed.
5. **Data flows down** (via props); **events flow up** (via callback functions passed as props).
6. **Effects** (`useEffect`) sync your component with things outside React: timers, network, browser APIs.
7. **React Router** reads the URL and decides which component to render. No full page reloads.

```
   user clicks ──► event handler ──► setState(newValue)
        ▲                                   │
        │                                   ▼
   browser DOM ◄── React updates DOM ◄── component re-renders
```

---

## ✅ Common beginner mistakes

| ❌ Mistake                                   | ✅ Fix                                              |
| -------------------------------------------- | --------------------------------------------------- |
| `onClick={handleClick()}`                    | `onClick={handleClick}` or `onClick={() => handleClick(id)}` |
| `items.push(x); setItems(items)`             | `setItems([...items, x])`                           |
| `user.name = 'Bo'; setUser(user)`            | `setUser({ ...user, name: 'Bo' })`                  |
| Missing `key` in a list                      | `items.map(i => <li key={i.id}>…</li>)`             |
| `{count && <p>…</p>}` shows `0`              | `{count > 0 && <p>…</p>}`                            |
| `<a href="/about">` inside the app           | `<Link to="/about">`                                |
| `class="…"`                                  | `className="…"`                                      |
| Component named `myButton`                   | Components must start with a capital: `MyButton`    |
| `useEffect` with no cleanup for timers/listeners | Return a cleanup function                       |

---

## 🎯 Final project ideas

Once you've finished the lessons, build one of these from scratch with `npm create vite@latest`:

- **Recipe book**: list page, `/recipes/:id` detail page, favorites stored with `useLocalStorage`.
- **Movie search**: fetch from a public API, keep the search term in `?q=`, show loading/error states.
- **Kanban board**: columns and cards, lifted state, a `BoardContext`, and a route for each board.

---

## 🌐 Deploying to GitHub Pages

> 📖 **Lesson 12, Part 2** ([`src/lessons/12-Routing.jsx`](src/lessons/12-Routing.jsx)) explains *why* routed apps 404 on GitHub Pages, with an interactive simulator, step-by-step deploy instructions for your own project, and a troubleshooting table.

This repo deploys itself: every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the app and publishes it to GitHub Pages.

Three things make a React Router app work on GitHub Pages (a good lesson in itself!):

1. **`base` in [`vite.config.js`](vite.config.js)**: Pages serves the site from `/<repo-name>/`, not `/`, so the built asset URLs need that prefix.
2. **`basename` on `<BrowserRouter>`** in [`src/main.jsx`](src/main.jsx): tells React Router to ignore that prefix when matching routes.
3. **One HTML file per route** ([`scripts/spa-fallback.js`](scripts/spa-fallback.js), run by `npm run build`): Pages only serves real files, so `/students/3` would be a 404. The script copies `index.html` to `students/3.html`, `lessons/jsx.html`, and so on. Pages serves those with a normal 200 status, the app loads, and React Router takes over. It also writes `404.html`, so unknown URLs still show the app's NotFound page with a correct 404 status. **Added a page? Add its path to the list in that script.**

**Using your own copy:** fork or copy the repo, change `/react-crash-course/` in `vite.config.js` to your repo's name, then under **Settings → Pages → Source** choose **GitHub Actions**.

Run `npm run build && npm run preview` to test the production build locally at the same sub-path.

---

## 🔗 Further reading

- [react.dev/learn](https://react.dev/learn): the official React tutorial
- [reactrouter.com](https://reactrouter.com): React Router docs
- [vite.dev](https://vite.dev): Vite docs
- [React DevTools](https://react.dev/learn/react-developer-tools): browser extension for inspecting components and state
