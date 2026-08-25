import { useState, useRef, useEffect } from "react";
import ProjectCard from "../components/ProjectCard.jsx";
import Track from "../assets/Track.png";

const ProjectRow = ({project1, project2}) => {
  const [hasOpened, setHasOpened] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFirstOpen, setIsFirstOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);
  
  const timersRef = useRef([]);

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  const setOpen = (i) => {
    clearAllTimers();
    if (isVisible && ((isFirstOpen && i === 1) || (isSecondOpen && i === 2))) {
      setTimeout(() => {
        setIsVisible(false);
      }, 150);
      setTimeout(() => {
        setIsFirstOpen(false);
        setIsSecondOpen(false);
      }, 500);
    } else {
      if (isVisible) {
        if (i === 1) {
          setTimeout(() => {
            setIsVisible(false);
          }, 150);
          setTimeout(() => {
            setIsVisible(true);
            setIsFirstOpen(true);
            setIsSecondOpen(false);
          }, 300);
        } else {
          setTimeout(() => {
            setIsVisible(false);
          }, 150);
          setTimeout(() => {
            setIsVisible(true);
            setIsFirstOpen(false);
            setIsSecondOpen(true);
          }, 300);
        }
      } else {
        if (i === 1) {
          setIsFirstOpen(true);
        } else {
          setIsSecondOpen(true);
        }
        setIsVisible(true);
        setHasOpened(true);
      }
    }
  };

  const activeTitle = isSecondOpen ? project2.title : project1.title;
  const activeVideo = isSecondOpen ? project2.video: project1.video;
  const activeDesc = isSecondOpen ? project2.desc : project1.desc;
  const activeComponents = isSecondOpen ? project2.components : project1.components;
  const activeTechnologies = isSecondOpen ? project2.technologies : project1.technologies;
  const activeGithub = isSecondOpen ? project2.github : project1.github;

  return (
    <section className="projects-row">
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
    </section>
  );
};

export default ProjectRow;