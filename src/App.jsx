import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './index.css'

import Home from './pages/Home.jsx';
import Background from './pages/Background.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';

function App() {
  return (
    <BrowserRouter basename="/Portfolio-Website">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/background" element={<Background />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
