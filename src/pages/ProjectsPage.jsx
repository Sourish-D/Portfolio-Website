import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ProjectRow from "../components/ProjectRow.jsx";
import CodingCard from "../components/CodingCard.jsx";
import Animation from "../components/Animation.jsx";
import portfolio from "../assets/portfolio.png";
import esp_car from "../assets/esp_car.webp";
import EspCarVid from "../assets/EspCarVid.mp4";
import PortfolioDevlogThree from "../assets/PortfolioDevlogThree.mp4";
import {  useState, useEffect } from 'react';

const projectInfo = [
  {
    title:"Portfolio Website", 
    img:portfolio, 
    lesson:"Responsive Design, API Integration, UI Animation", 
    status:"In Progress", 
    desc:"An interactive personal portfolio website designed to showcase my projects, experience, extracurriculars, certifications, and technical skills. The site uses an Opus Magnum-inspired visual style, with mechanical animations and interactive components to make the portfolio feel more like an application than a traditional resume.", 
    components:"Git/GitHub, React, Vite", 
    technologies:"React, JavaScript, REST APIs / GraphQL APIs", 
    github:"https://github.com/Sourish-D/Portfolio-Website", 
    video: PortfolioDevlogThree
  },
  {
    title:"ESP32 Autonomous Car", 
    img:esp_car, 
    lesson:"Embedded Programming, Motor Control, Sensor Integration", 
    status:"In Progress", 
    desc:"An ESP32-powered car designed to demonstrate wireless control and autonomous movement. The project combines DC motors, a motor driver, and sensors to control the car's movement and respond to its surroundings. I designed and programmed the control system while troubleshooting both the electronics and mechanical components.", 
    components:"ESP32, Motors, Sensor, Gears", 
    technologies:"C++, Arduino, Motor Control", 
    github:"https://github.com/Sourish-D/ESP32Projects/tree/main/Car", 
    video: EspCarVid
  }
]
const ProjectsPage = ({leetCodeUsername, githubUsername}) => {
  const [leetColumns, setLeetColumns] = useState([]);
  const [gitColumns, setGitColumns] = useState([]);
  //LeetCode API
  useEffect(() => {
    fetch(`https://alfa-leetcode-api.onrender.com/${leetCodeUsername}/solved`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setLeetColumns([
            {statName: "Total Solved: ", info: data.totalSolved || 0},
            {statName: "Easy: ", info: data.easySolved || 0},
            {statName: "Medium: ", info: data.mediumSolved || 0},
            {statName: "Hard: ", info: data.hardSolved || 0}
          ]);
        }
      })
    .catch((err) => {
      console.error("Failed to fetch LeetCode stats: ", err);
    })
  }, [leetCodeUsername]);

  //Github API
  useEffect(() => {
    const fetchGitHubData = async () => {
        try {
            const userResponse = await fetch(`https://api.github.com/users/${githubUsername}`);
            const userData = await userResponse.json();
            const eventsResponse = await fetch(`https://api.github.com/users/${githubUsername}/events/public?per_page=100`);
            const events = await eventsResponse.json();
            const reposResponse = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=1`);
            const reposData = await reposResponse.json();
            const latestRepoName = Array.isArray(reposData) && reposData.length > 0 
                ? reposData[0].name 
                : "None";
            setGitColumns([
                { info: events.length > 0 ? `${events.length}+` : "0", statName: "Recent Events" },
                { info: userData.public_repos ?? 0, statName: "Repos" },
                { info: userData.followers ?? 0, statName: "Followers" },
                { info: latestRepoName, statName: "Latest Repo"}
            ]);

        } catch (error) {
            console.err("Error fetching GitHub data:", error);
        }
    };

    fetchGitHubData();
  }, [githubUsername]);

  return (
    <div>
      <Navbar />

      <h1 className="title">Projects</h1>
      <ProjectRow
        project1={projectInfo[0]}
        project2={projectInfo[1]}
      />

      <h1 className="title">Coding Activity</h1>
      <section className="coding-activity-row even-flex space-down">
        <Animation 
          element={
             <CodingCard 
              title="Github"
              columns={gitColumns}
              link="https://github.com/Sourish-D"
              username="Sourish-D"
            />
          }
          width="100%"
          card
        />
       <Animation 
          element={
             <CodingCard 
              title="LeetCode"
              columns={leetColumns}
              link="https://leetcode.com/u/GodCREEPERGOD/"
              leet
              username="GodCREEPERGOD"
            />
          }
          width="100%"
          card
          right
        />
      </section>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
