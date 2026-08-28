import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ProjectRow from "../components/ProjectRow.jsx";
import CodingCard from "../components/CodingCard.jsx";
import Animation from "../components/Animation.jsx";
import portfolio from "../assets/portfolio.png";
import esp_car from "../assets/esp_car.webp";
import EspCarVid from "../assets/EspCarVid.mp4";
import PortfolioDevlogThree from "../assets/PortfolioDevlogThree.mp4";

const projectInfo = [
  {
    title: "Portfolio Website",
    img: portfolio,
    lesson: "Responsive Design, API Integration, UI Animation",
    status: "In Progress",
    desc: "An interactive personal portfolio website designed to showcase my projects, experience, extracurriculars, certifications, and technical skills. The site uses an Opus Magnum-inspired visual style, with mechanical animations and interactive components to make the portfolio feel more like an application than a traditional resume.",
    components: "Git/GitHub, React, Vite",
    technologies: "React, JavaScript, REST APIs / GraphQL APIs",
    github: "https://github.com/Sourish-D/Portfolio-Website",
    video: PortfolioDevlogThree,
  },
  {
    title: "ESP32 Autonomous Car",
    img: esp_car,
    lesson: "Embedded Programming, Motor Control, Sensor Integration",
    status: "In Progress",
    desc: "An ESP32-powered car designed to demonstrate wireless control and autonomous movement. The project combines DC motors, a motor driver, and sensors to control the car's movement and respond to its surroundings. I designed and programmed the control system while troubleshooting both the electronics and mechanical components.",
    components: "ESP32, Motors, Sensor, Gears",
    technologies: "C++, Arduino, Motor Control",
    github: "https://github.com/Sourish-D/ESP32Projects/tree/main/Car",
    video: EspCarVid,
  },
];
const ProjectsPage = ({ leetCodeUsername, githubUsername }) => {
  return (
    <main className="space-up">
      <Navbar />

      <h1 className="title">Projects</h1>
      <ProjectRow project1={projectInfo[0]} project2={projectInfo[1]} />

      <h1 className="title">Coding Activity</h1>
      <section className="coding-activity-row even-flex space-down">
        <Animation
          element={
            <CodingCard
              title="Github"
              link={`https://github.com/${githubUsername}`}
              username={githubUsername}
            />
          }
          width="100%"
          card
        />
        <Animation
          element={
            <CodingCard
              title="LeetCode"
              link={`https://leetcode.com/u/${leetCodeUsername}`}
              leet
              username={leetCodeUsername}
            />
          }
          width="100%"
          card
          right
        />
      </section>

      <Footer />
    </main>
  );
};

export default ProjectsPage;
