/**
 * CUSTOM HOOK: a function whose name starts with "use" and that calls other hooks.
 * It lets you reuse STATEFUL LOGIC between components.
 *
 * Works exactly like useState, but the value survives a page refresh.
 *   const [name, setName] = useLocalStorage('name', '')
 */
import { useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  // Lazy initial state: the function only runs on the first render
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  // Whenever the value changes, save it
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage can be unavailable (e.g. private mode) — ignore
    }
  }, [key, value])

  return [value, setValue]
}
