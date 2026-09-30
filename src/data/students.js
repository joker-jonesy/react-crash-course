// Fake data for the routing demo (/students and /students/:studentId).
// In a real app this would come from an API.
export const students = [
  { id: 1, name: 'Ada Lovelace', track: 'Frontend', favoriteHook: 'useState', bio: 'Loves breaking UIs into small components.' },
  { id: 2, name: 'Alan Turing', track: 'Fullstack', favoriteHook: 'useEffect', bio: 'Always asking "when does this re-render?"' },
  { id: 3, name: 'Grace Hopper', track: 'Frontend', favoriteHook: 'useContext', bio: 'Hunts bugs (literally) in the React DevTools.' },
  { id: 4, name: 'Katherine Johnson', track: 'Data', favoriteHook: 'useMemo', bio: 'Calculates derived state instead of storing it.' },
  { id: 5, name: 'Tim Berners-Lee', track: 'Fullstack', favoriteHook: 'useRef', bio: 'Thinks every page deserves its own URL.' },
]

export function getStudent(id) {
  // URL params are always strings, so convert before comparing to a number.
  return students.find((s) => s.id === Number(id))
}
