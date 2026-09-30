/**
 * ENTRY POINT
 * -----------
 * Vite loads index.html, which loads this file via <script type="module">.
 * This is where React takes over the <div id="root"> in index.html.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { ThemeProvider } from './context/ThemeProvider.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  // StrictMode: dev-only helper that double-runs some code to surface bugs.
  <StrictMode>
    {/* BrowserRouter keeps the UI in sync with the URL in the address bar.
        Anything that uses routing (Link, Routes, useParams...) must be inside it. */}
    <BrowserRouter>
      {/* A Context provider — see Lesson 10. Everything inside can read the theme. */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
