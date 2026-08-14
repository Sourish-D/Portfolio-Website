
const ProjectCard = ({className, title, img, lessons, status, onClick}) => {
  return (
    <div class={`project-card ${className}`} onClick={onClick}>
      <h1>{title}</h1>
      <img alt={img} />
      <p><b>Lessons:</b><br />{lessons}</p>
      <p><b>Status:</b> {status}</p>
    </div>
  )
}

export default ProjectCard