
const ProjectCard = ({className, title, img, lessons, status, onClick}) => {
  return (
    <div class={`project-card standard-block center-text ${className}`} onClick={onClick}>
      <h1 className="important-text">{title}</h1>
      <img alt={img} />
      <p><b>Lessons:</b><br />{lessons}</p>
      <p><b>Status:</b> {status}</p>
    </div>
  )
}

export default ProjectCard