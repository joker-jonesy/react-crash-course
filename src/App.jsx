/**
 * APP — THE ROUTE MAP
 * -------------------
 * <Routes> looks at the current URL and renders the FIRST <Route> that matches.
 * Nested <Route>s render inside their parent's <Outlet />.
 *
 *   /                      -> Home
 *   /lessons               -> LessonsLayout > LessonsIndex
 *   /lessons/jsx           -> LessonsLayout > JsxLesson
 *   /students              -> StudentsList
 *   /students/:studentId   -> StudentDetail   (":studentId" is a URL parameter)
 *   /about                 -> About
 *   anything else          -> NotFound        (path="*" is the catch-all)
 */
import { Routes, Route, Navigate } from 'react-router'

import RootLayout from './layouts/RootLayout.jsx'
import LessonsLayout from './layouts/LessonsLayout.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/NotFound.jsx'
import LessonsIndex from './pages/LessonsIndex.jsx'
import StudentsList from './pages/students/StudentsList.jsx'
import StudentDetail from './pages/students/StudentDetail.jsx'

import JsxLesson from './lessons/01-Jsx.jsx'
import ComponentsPropsLesson from './lessons/02-ComponentsProps.jsx'
import StateLesson from './lessons/03-State.jsx'
import EventsLesson from './lessons/04-Events.jsx'
import ConditionalLesson from './lessons/05-ConditionalRendering.jsx'
import ListsLesson from './lessons/06-ListsKeys.jsx'
import FormsLesson from './lessons/07-Forms.jsx'
import EffectsLesson from './lessons/08-Effects.jsx'
import LiftingStateLesson from './lessons/09-LiftingState.jsx'
import ContextLesson from './lessons/10-Context.jsx'
import CustomHooksLesson from './lessons/11-CustomHooks.jsx'
import RoutingLesson from './lessons/12-Routing.jsx'

export default function App() {
  return (
    <Routes>
      {/* A "layout route": no path of its own, just wraps children with a header/nav */}
      <Route element={<RootLayout />}>
        {/* "index" = what renders at the parent's exact path ("/") */}
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />

        {/* Nested routes: /lessons/* all share the LessonsLayout sidebar */}
        <Route path="lessons" element={<LessonsLayout />}>
          <Route index element={<LessonsIndex />} />
          <Route path="jsx" element={<JsxLesson />} />
          <Route path="components-props" element={<ComponentsPropsLesson />} />
          <Route path="state" element={<StateLesson />} />
          <Route path="events" element={<EventsLesson />} />
          <Route path="conditional-rendering" element={<ConditionalLesson />} />
          <Route path="lists-keys" element={<ListsLesson />} />
          <Route path="forms" element={<FormsLesson />} />
          <Route path="effects" element={<EffectsLesson />} />
          <Route path="lifting-state" element={<LiftingStateLesson />} />
          <Route path="context" element={<ContextLesson />} />
          <Route path="custom-hooks" element={<CustomHooksLesson />} />
          <Route path="routing" element={<RoutingLesson />} />
        </Route>

        {/* Dynamic segment: /students/3 -> useParams() gives { studentId: "3" } */}
        <Route path="students" element={<StudentsList />} />
        <Route path="students/:studentId" element={<StudentDetail />} />

        {/* Redirect: visiting /home sends you to / */}
        <Route path="home" element={<Navigate to="/" replace />} />

        {/* Catch-all 404 — must match anything not matched above */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
