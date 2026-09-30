/**
 * ROUTING DEMO — detail page (/students/:studentId)
 * Shows: useParams to read the URL, useNavigate to change it from code.
 */
import { Link, useNavigate, useParams } from 'react-router'
import { getStudent, students } from '../../data/students.js'

export default function StudentDetail() {
  // For the URL /students/3, params = { studentId: "3" }  (always a string!)
  const { studentId } = useParams()
  const navigate = useNavigate()
  const student = getStudent(studentId)

  if (!student) {
    return (
      <>
        <h1>Student not found</h1>
        <p>No student has id <code>{studentId}</code>.</p>
        <Link to="/students">← Back to all students</Link>
      </>
    )
  }

  const nextId = (student.id % students.length) + 1

  return (
    <>
      <p><Link to="/students">← All students</Link></p>
      <h1>{student.name}</h1>
      <p className="muted">URL param <code>studentId</code> = <code>"{studentId}"</code></p>
      <div className="card stack">
        <div><strong>Track:</strong> {student.track}</div>
        <div><strong>Favorite hook:</strong> <code>{student.favoriteHook}</code></div>
        <div>{student.bio}</div>
      </div>

      <div className="row" style={{ marginTop: '1rem' }}>
        {/* navigate(-1) = browser back button */}
        <button onClick={() => navigate(-1)}>⬅ Go back</button>
        {/* navigate('/path') = go somewhere from code (e.g. after a form submit) */}
        <button onClick={() => navigate(`/students/${nextId}`)}>Next student ➡</button>
      </div>
    </>
  )
}
