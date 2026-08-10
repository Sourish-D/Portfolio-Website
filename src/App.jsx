import { useState } from 'react';
import {BrowswerRouter, Routes, Route} from 'react-router-dom';

import './index.css'

import Home from './pages/Home';
import About from './pages/About';
import ProjectsPage from './pages/ProjectPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
