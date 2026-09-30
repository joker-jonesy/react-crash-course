import { useTheme } from '../context/ThemeContext.js'

// This component is nowhere near ThemeProvider in the tree,
// yet it can read and change the theme thanks to Context (Lesson 10).
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
