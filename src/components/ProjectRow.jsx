import { useState, useRef, useEffect } from "react";
import ProjectCard from "../components/ProjectCard.jsx";
import Track from "../assets/Track.png";

const ProjectRow = ({ project1, project2 }) => {
  const [hasOpened, setHasOpened] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState(0);

  const timersRef = useRef([]);
  const projectDetails = [project1, project2];

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  const setOpen = (i) => {
    clearAllTimers();
    //If the project is open and the open project is the one that they requested, turn off
    if (isVisible && activeProject == i) {
      timersRef.current.push(
        setTimeout(() => {
          setIsVisible(false);
        }, 150),
        setTimeout(() => {
          setActiveProject(0);
        }, 500),
      );
    } else {
      if (isVisible) {
        //If the project is visible, but we're switching to the other one

        timersRef.current.push(
          setTimeout(() => {
            setIsVisible(false);
          }, 150),
          setTimeout(() => {
            setIsVisible(true);
            setActiveProject(i);
          }, 300),
        );
      } else {
        //Project is invisible, open project and switch to the project
        setActiveProject(i);
        setIsVisible(true);
        setHasOpened(true);
      }
    }
  };

  const activeTitle = activeProject == 2 ? project2.title : project1.title;
  const activeVideo = activeProject == 2 ? project2.video : project1.video;
  const activeDesc = activeProject == 2 ? project2.desc : project1.desc;
  const activeComponents =
    activeProject == 2 ? project2.components : project1.components;
  const activeTechnologies =
    activeProject == 2 ? project2.technologies : project1.technologies;
  const activeGithub = activeProject == 2 ? project2.github : project1.github;

  return (
    <section>
      <div className="layout-mobile">
        {projectDetails.map((project, id) => (
          <div className="projects-row-display-content standard-block visible center-text" key={id}>
            <h1 className="important-text">{project.title}</h1>

            <video key={id} src={project.video} controls />
            <div className="projects-row-display-content-text">
              <p>{project.desc}</p>
              <ul>
                <li>
                  <b>Lessons: </b>
                  {project.lesson}
                </li>
                <li>
                  <b>Status: </b>
                  {project.status}
                </li>
                <li>
                  <b>Components Used: </b>
                  {project.components}
                </li>
                <li>
                  <b>Technologies Used: </b>
                  {project.technologies}
                </li>
              </ul>
            </div>
            <a href={project.github} target="_blank" rel="noreferrer">
              Github
            </a>
          </div>
        ))}
      </div>
      <div className="projects-row layout-desktop">
        <ProjectCard
          className="project-card-left"
          title={project1.title}
          img={project1.img}
          lessons={project1.lesson}
          status={project1.status}
          onClick={() => setOpen(1)}
        />

        <div
          className={`projects-row-display-content standard-block center-text ${
            isVisible ? "visible" : ""
          } ${hasOpened && !isVisible ? "project-out" : ""}`}
        >
          <h1 className="important-text">{activeTitle}</h1>

          <video key={activeVideo} src={activeVideo} controls />

          <p>{activeDesc}</p>

          <p>
            <b>Components Used: </b>
            {activeComponents}
          </p>

          <p>
            <b>Technologies Used: </b>
            {activeTechnologies}
          </p>

          <a href={activeGithub} target="_blank" rel="noreferrer">
            Github
          </a>
        </div>

        <ProjectCard
          className="project-card-right"
          title={project2.title}
          img={project2.img}
          lessons={project2.lesson}
          status={project2.status}
          onClick={() => setOpen(2)}
        />

        <img src={Track} className="project-track left" alt="" />
        <img src={Track} className="project-track right" alt="" />
      </div>
    </section>
  );
};

export default ProjectRow;
