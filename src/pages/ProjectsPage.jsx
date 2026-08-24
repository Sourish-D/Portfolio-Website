import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ProjectRow from "../components/ProjectRow.jsx";
import CodingCard from "../components/CodingCard.jsx";
import Animation from "../components/Animation.jsx";

const githubStatistics = [
  {info: "s", statName: "Commits"},
  {info: "s", statName: "Repos"},
  {info: "s", statName: "Pull Requests"},
  {info: "s", statName: "Followers"}
];
const leetCodeStatistics = [
  {info:"1", statName: "Problems Solved"},
  {info:"1", statName: "Easy"},
  {info:"0", statName: "Medium"},
  {info:"0", statName: "Hard"}
]

const ProjectsPage = () => {
  return (
    <div>
      <Navbar />

      <h1 class="title">Projects</h1>
      <ProjectRow
        title1="Portfolio Website"
        img1=""
        lesson1="Responsive Design, API Integration, UI Animation"
        status1="In Progress"
        desc1="An interactive personal portfolio website designed to showcase my projects, experience, extracurriculars, certifications, and technical skills. The site uses an Opus Magnum-inspired visual style, with mechanical animations and interactive components to make the portfolio feel more like an application than a traditional resume."
        components1="Git/GitHub, React, Vite"
        technologies1="React, JavaScript, REST APIs / GraphQL APIs"
        github1="https://github.com/Sourish-D/Portfolio-Website"
        video1=""
        title2="ESP32 Autonomous Car"
        img2=""
        lesson2="Embedded Programming, Motor Control, Sensor Integration"
        status2="In Progress"
        desc2="An ESP32-powered car designed to demonstrate wireless control and autonomous movement. The project combines DC motors, a motor driver, and sensors to control the car's movement and respond to its surroundings. I designed and programmed the control system while troubleshooting both the electronics and mechanical components."
        components2="ESP32, Motors, Sensor, Gears"
        technologies2="C++, Arduino, Motor Controll"
        github2=""
        video2=""
      />

      <h1 class="title">Coding Activity</h1>
      <div class="coding-activity-row even-flex space-down">
        <Animation 
          element={
             <CodingCard 
              title="Github"
              columns={githubStatistics}
              link="https://github.com/Sourish-D"
            />
          }
          width="100%"
          card
        />
       <Animation 
          element={
             <CodingCard 
              title="LeetCode"
              columns={leetCodeStatistics}
              link="https://leetcode.com/u/GodCREEPERGOD/"
            />
          }
          width="100%"
          card
          right
        />
      </div>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
