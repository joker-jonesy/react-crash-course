/**
 * 2. PROVIDE the theme context (wraps <App /> in main.jsx).
 * See ThemeContext.js for steps 1 and 3.
 *
 * (Kept in its own file because Vite's fast refresh works best when a
 * .jsx file only exports components.)
 */
import { useEffect } from 'react'
import { ThemeContext } from './ThemeContext.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

export function ThemeProvider({ children }) {
  // Custom hook from Lesson 11 — remembers the theme across page reloads
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  // Sync React state -> the real DOM (a side effect, Lesson 8)
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  // In React 19 the context itself can be used as the provider
  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>
}
