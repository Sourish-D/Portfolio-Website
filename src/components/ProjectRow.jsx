import { useState } from "react";
import ProjectCard from "../components/ProjectCard.jsx";
import Track from "../assets/Track.png";

const ProjectRow = ({
  title1,
  img1,
  lesson1,
  status1,
  title2,
  img2,
  lesson2,
  status2,
  desc1,
  desc2,
  components1,
  components2,
  technologies1,
  technologies2,
  github1,
  github2,
  video1,
  video2,
}) => {
  const [hasOpened, setHasOpened] = useState(false);
  const [Visible, setVisible] = useState(false);
  const [FirstOpen, setFirstOpen] = useState(false);
  const [SecondOpen, setSecondOpen] = useState(false);
  const setOpen = (i) => {
    if (Visible && ((FirstOpen && i == 1) || (SecondOpen && i == 2))) {
      setTimeout(() => {
        setVisible(false);
      }, 150);
      setTimeout(() => {
        setFirstOpen(false);
        setSecondOpen(false);
      }, 500);
    } else {
      if (Visible) {
        if (i == 1) {
          setTimeout(() => {
            setVisible(false);
          }, 150);
          setTimeout(() => {
            setVisible(true);
            setFirstOpen(true);
            setSecondOpen(false);
          }, 300);
        } else {
          setTimeout(() => {
            setVisible(false);
          }, 150);
          setTimeout(() => {
            setVisible(true);
            setFirstOpen(false);
            setSecondOpen(true);
          }, 300);
        }
      } else {
        if (i == 1) {
          setFirstOpen(true);
        } else {
          setSecondOpen(true);
        }
        setVisible(true);
        setHasOpened(true);
      }
    }
  };
  return (
    <div class="projects-row">
      <ProjectCard
        className="project-card-left"
        title={title1}
        img={img1}
        lessons={lesson1}
        status={status1}
        onClick={() => setOpen(1)}
      />
      <div
        className={`projects-row-display-content standard-block center-text
          ${Visible ? "visible" : ""} 
          ${hasOpened && !Visible ? "project-out":""}`}
      >
        <h1 className="important-text">
          {FirstOpen ? title1 : ""}
          {SecondOpen ? title2 : ""}
          {FirstOpen || SecondOpen ? "" : title1}
        </h1>
        <video 
          key={FirstOpen ? video1 : SecondOpen ? video2 : video1}
          src={FirstOpen ? video1 : SecondOpen ? video2 : video1} 
          controls 
        />
        <p>
          {FirstOpen ? desc1 : ""}
          {SecondOpen ? desc2 : ""}
          {FirstOpen || SecondOpen ? "" : desc1}
        </p>
        <p>
          <b>Components Used: </b>
          {FirstOpen ? components1 : ""}
          {SecondOpen ? components2 : ""}
          {FirstOpen || SecondOpen ? "" : components1}
        </p>
        <p>
          <b>Technologies Used: </b>
          {FirstOpen ? technologies1 : ""}
          {SecondOpen ? technologies2 : ""}
          {FirstOpen || SecondOpen ? "" : technologies1}
        </p>
        <a
          href={`
                ${FirstOpen ? github1 : ""}
                ${SecondOpen ? github2 : ""}
                ${FirstOpen || SecondOpen ? "" : github1}
            `}
        >
          Github
        </a>
      </div>
      <ProjectCard
        className="project-card-right"
        title={title2}
        img={img2}
        lessons={lesson2}
        status={status2}
        onClick={() => setOpen(2)}
      />
      <img src={Track} className="project-track left"/>
      <img src={Track} className="project-track right"/>
    </div>
  );
};

export default ProjectRow;
