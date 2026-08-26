import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './index.css'

import Home from './pages/Home.jsx';
import Background from './pages/Background.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/background" element={<Background />} />
        <Route path="/projects" element={<ProjectsPage leetCodeUsername="GodCREEPERGOD" githubUsername="Sourish-D" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
