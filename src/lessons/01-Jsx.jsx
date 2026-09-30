/**
 * LESSON 1 — JSX
 * ==============
 * JSX looks like HTML but it's JavaScript. Vite (via Babel/oxc) turns
 *     <h1 className="big">Hi</h1>
 * into
 *     React.createElement('h1', { className: 'big' }, 'Hi')
 *
 * Rules to remember:
 *  1. Return ONE root element (wrap siblings in <div> or a Fragment <>...</>).
 *  2. Close every tag:  <img />, <br />, <input />
 *  3. `class` -> `className`, `for` -> `htmlFor`, attributes are camelCase (onClick, tabIndex).
 *  4. Use { curly braces } to drop ANY JavaScript expression into the markup.
 *  5. `style` takes an object: style={{ color: 'red', fontSize: 20 }}
 */
import Lesson, { Demo, Exercise } from '../components/Lesson.jsx'

// Regular JavaScript, living next to our markup
const course = 'React Crash Course'
const student = { first: 'Ada', last: 'Lovelace' }
const today = new Date().toLocaleDateString()
const isMorning = new Date().getHours() < 12

function formatName(person) {
  return `${person.first} ${person.last}`
}

export default function JsxLesson() {
  return (
    <Lesson slug="jsx">
      <p>
        <strong>JSX</strong> lets you write HTML-like markup inside JavaScript. A React
        component is just a function that <em>returns</em> JSX.
      </p>

      <pre><code>{`function Greeting() {
  const name = 'Ada'
  return <h2 className="title">Hello, {name}!</h2>
}`}</code></pre>

      <Demo>
        {/* Expressions go in {curly braces} */}
        <h2>Welcome to the {course}!</h2>
        <p>Student: {formatName(student)}</p>
        <p>Today is {today}. 2 + 2 = {2 + 2}</p>
        <p>Good {isMorning ? 'morning' : 'afternoon'}! ☕</p>

        {/* Inline styles use a JS object — note the double braces */}
        <p style={{ color: 'white', background: '#087ea4', padding: 8, borderRadius: 6 }}>
          Styled with style=&#123;&#123; ... &#125;&#125;
        </p>

        {/* className instead of class; self-closing tags */}
        <label htmlFor="demo-input" className="muted">A self-closing input: </label>
        <input id="demo-input" placeholder="type here" />
      </Demo>

      <h3>Fragments</h3>
      <p>
        A component must return a single element. If you don't want an extra{' '}
        <code>&lt;div&gt;</code>, use a Fragment: <code>&lt;&gt;...&lt;/&gt;</code>.
      </p>
      <pre><code>{`return (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
)`}</code></pre>

      <Exercise>
        <ol>
          <li>Change <code>student</code> at the top of this file to your own name.</li>
          <li>Add a line showing how many letters are in the course name (<code>course.length</code>).</li>
          <li>Try writing <code>class=</code> instead of <code>className=</code> — check the browser console.</li>
        </ol>
      </Exercise>
    </Lesson>
  )
}
