/**
 * ROUTING DEMO — list page (/students)
 * Shows: <Link> to a dynamic URL, and useSearchParams for ?query=strings.
 */
import { Link, useSearchParams } from 'react-router'
import { students } from '../../data/students.js'

export default function StudentsList() {
  // Like useState, but the value lives in the URL: /students?track=Frontend
  // That means filters survive a refresh and can be shared as a link!
  const [searchParams, setSearchParams] = useSearchParams()
  const track = searchParams.get('track') ?? 'All'

  const visible = track === 'All' ? students : students.filter((s) => s.track === track)

  function handleChange(e) {
    const value = e.target.value
    if (value === 'All') setSearchParams({})
    else setSearchParams({ track: value })
  }

  return (
    <>
      <h1>Students</h1>
      <p className="muted">
        Source: <span className="file-path">src/pages/students/StudentsList.jsx</span>. Change the
        filter and watch the URL.
      </p>

      <label className="row">
        Track:
        <select value={track} onChange={handleChange}>
          <option>All</option>
          <option>Frontend</option>
          <option>Fullstack</option>
          <option>Data</option>
        </select>
      </label>

      <div className="grid" style={{ marginTop: '1rem' }}>
        {visible.map((student) => (
          <div key={student.id} className="card">
            <strong>{student.name}</strong>
            <div className="muted">{student.track}</div>
            {/* Build the URL from data -> matches students/:studentId */}
            <Link to={`/students/${student.id}`}>View profile →</Link>
          </div>
        ))}
      </div>

      <p style={{ marginTop: '2rem' }}>
        Try a bad URL: <Link to="/students/999">/students/999</Link> or <Link to="/nope">/nope</Link>
      </p>
    </>
  )
}
