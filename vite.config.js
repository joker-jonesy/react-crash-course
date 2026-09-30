import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  plugins: [react()],
  // GitHub Pages serves this site from https://<user>.github.io/react-crash-course/
  // so production builds (and `npm run preview`) need that sub-path.
  // `npm run dev` still uses "/".
  // (Renamed the repo? Update this to match.)
  base: command === 'build' || isPreview ? '/react-crash-course/' : '/',
}))
