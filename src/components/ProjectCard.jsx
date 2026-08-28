const ProjectCard = ({ className, title, img, lessons, status, onClick }) => {
  return (
    <button
      className={`project-card standard-block center-text ${className}`}
      onClick={onClick}
    >
      <h1 className="important-text">{title}</h1>
      <img src={img} alt="Project Image"/>
      <p>
        <b>Lessons:</b>
        <br />
        {lessons}
      </p>
      <p>
        <b>Status:</b> {status}
      </p>
    </button>
  );
};

export default ProjectCard;
