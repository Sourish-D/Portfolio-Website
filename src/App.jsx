import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Background from "./pages/Background.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import { PROFILE_CONFIG } from "./constants/profileConfig.js";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/background" element={<Background />} />
        <Route
          path="/projects"
          element={
            <ProjectsPage
              leetCodeUsername={PROFILE_CONFIG.leetCodeUsername}
              githubUsername={PROFILE_CONFIG.githubUsername}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
