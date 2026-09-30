/**
 * ROOT LAYOUT
 * Wraps every page with the header + nav.
 * <Outlet /> is the "slot" where the matched child route renders.
 */
import { Link, NavLink, Outlet } from 'react-router'
import ThemeToggle from '../components/ThemeToggle.jsx'

export default function RootLayout() {
  return (
    <>
      <header className="site-header">
        {/* <Link> changes the URL WITHOUT a full page reload (unlike <a href>) */}
        <Link to="/" className="brand">⚛️ React Crash Course</Link>

        {/* <NavLink> is a <Link> that knows if it's "active" and adds class="active" */}
        <nav className="site-nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/lessons">Lessons</NavLink>
          <NavLink to="/students">Students</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>

        <ThemeToggle />
      </header>

      <main>
        <Outlet />
      </main>
    </>
  )
}
