/**
 * GitHub Pages only knows about real files. A React Router URL like
 * /react-crash-course/students/3 has no file behind it, so Pages would 404.
 *
 * After `vite build`, this script copies dist/index.html to one .html file per
 * route (dist/students/3.html, dist/lessons/jsx.html, …). GitHub Pages serves
 * /students/3 from students/3.html with a normal 200 status, the app boots,
 * and React Router renders the right page.
 *
 * dist/404.html is also a copy, so unknown URLs still load the app and show
 * our NotFound page — with a correct 404 status.
 *
 * ➕ Added a new page? Add its path to the list below.
 */
import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { lessons } from '../src/data/lessons.js'
import { students } from '../src/data/students.js'

const routes = [
  'about',
  'home',
  'lessons',
  ...lessons.map((l) => `lessons/${l.slug}`),
  'students',
  ...students.map((s) => `students/${s.id}`),
]

const dist = 'dist'
const index = join(dist, 'index.html')

for (const route of routes) {
  const file = join(dist, `${route}.html`)
  mkdirSync(dirname(file), { recursive: true })
  copyFileSync(index, file)
}
copyFileSync(index, join(dist, '404.html'))

console.log(`spa-fallback: wrote ${routes.length} route pages + 404.html`)
