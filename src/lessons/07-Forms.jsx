/**
 * LESSON 7 — FORMS (controlled inputs)
 * ====================================
 * A CONTROLLED input gets its value from state and updates state on change:
 *
 *   const [email, setEmail] = useState('')
 *   <input value={email} onChange={e => setEmail(e.target.value)} />
 *
 * React state is now the "single source of truth" — easy to validate,
 * reset, or transform what the user types.
 *
 * Tips:
 *  - Checkboxes use `checked` + e.target.checked (not value).
 *  - One state object + the input's `name` attribute = one handler for many fields.
 *  - Call e.preventDefault() in onSubmit so the page doesn't reload.
 */
import { useState } from 'react'
import Lesson, { Demo, Exercise } from '../components/Lesson.jsx'

const emptyForm = { name: '', email: '', track: 'Frontend', agree: false, message: '' }

export default function FormsLesson() {
  const [form, setForm] = useState(emptyForm)
  const [submitted, setSubmitted] = useState(null)

  // One handler for every field, using each input's `name` attribute
  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  // Validation is just derived data
  const errors = {}
  if (form.name.trim().length < 2) errors.name = 'Name must be at least 2 characters'
  if (!form.email.includes('@')) errors.email = 'Enter a valid email'
  if (!form.agree) errors.agree = 'You must agree first'
  const isValid = Object.keys(errors).length === 0

  function handleSubmit(e) {
    e.preventDefault() // stop the browser from reloading the page
    if (!isValid) return
    setSubmitted(form)
    setForm(emptyForm)
  }

  return (
    <Lesson slug="forms">
      <p>
        In React we usually make inputs <strong>controlled</strong>: state holds the value, and the
        input just displays it.
      </p>

      <pre><code>{`const [name, setName] = useState('')
<input value={name} onChange={(e) => setName(e.target.value)} />`}</code></pre>

      <Demo>
        <form onSubmit={handleSubmit} className="stack" style={{ maxWidth: 420 }}>
          <label className="stack">
            Name
            <input name="name" value={form.name} onChange={handleChange} />
            {form.name && errors.name && <span className="error">{errors.name}</span>}
          </label>

          <label className="stack">
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} />
            {form.email && errors.email && <span className="error">{errors.email}</span>}
          </label>

          <label className="stack">
            Track
            <select name="track" value={form.track} onChange={handleChange}>
              <option>Frontend</option>
              <option>Fullstack</option>
              <option>Data</option>
            </select>
          </label>

          <label className="stack">
            Message ({form.message.length}/100)
            <textarea name="message" rows={3} maxLength={100} value={form.message} onChange={handleChange} />
          </label>

          <label className="row">
            <input name="agree" type="checkbox" checked={form.agree} onChange={handleChange} />
            I agree to learn React 🤝
          </label>

          <div className="row">
            <button type="submit" className="primary" disabled={!isValid}>Submit</button>
            <button type="button" onClick={() => setForm(emptyForm)}>Reset</button>
          </div>
        </form>

        <h4>Live state</h4>
        <pre><code>{JSON.stringify(form, null, 2)}</code></pre>

        {submitted && <p className="success">✅ Thanks {submitted.name}! We'll email {submitted.email}.</p>}
      </Demo>

      <Exercise>
        <ol>
          <li>Make the name input force UPPERCASE (hint: transform the value in <code>handleChange</code>).</li>
          <li>Add a "password" field that must be at least 8 characters.</li>
          <li>Add radio buttons for "experience level" (radios use <code>checked={'{form.level === "beginner"}'}</code>).</li>
        </ol>
      </Exercise>
    </Lesson>
  )
}
