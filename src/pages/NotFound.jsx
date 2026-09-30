import { Link, useLocation } from 'react-router'

// Matched by <Route path="*"> — anything no other route handles.
export default function NotFound() {
  const location = useLocation() // info about the current URL
  return (
    <>
      <h1>404 — Page not found</h1>
      <p>Nothing lives at <code>{location.pathname}</code>.</p>
      <Link to="/">Go home</Link>
    </>
  )
}
