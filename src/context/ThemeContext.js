/**
 * CONTEXT: share a value with ANY component below the provider,
 * without passing props through every level ("prop drilling").
 *
 * 3 steps:
 *   1. createContext()           -> make the context          (this file)
 *   2. <ThemeContext value={…}>  -> provide it high in the tree (ThemeProvider.jsx)
 *   3. useContext(ThemeContext)  -> read it anywhere below    (useTheme below)
 */
import { createContext, useContext } from 'react'

// 1. Create
export const ThemeContext = createContext(null)

// 3. Consume — a small custom hook so components don't import the context directly
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
