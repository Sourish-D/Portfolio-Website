import {useState} from 'react'

const Extracurriculars = ({title, image, description, time, award}) => {
  const [transmuted, setTransmuted] = useState(false); 
  const [flashing, setFlashing] = useState(false);
  const transmute = () => {
    setFlashing(true);

    setTimeout(() => {
        setTransmuted(prev => !prev);
    }, 150);

    setTimeout(() => {
        setFlashing(false);
    }, 300);
  };
  return (
    <div class={`extracurricular-card standard-block ${flashing ? "flash" : ""}`}>
        <h1>{title}</h1>
        <div class={`ec-block ec-block-two ${transmuted ? 'ec-closed' : ''}`} >
            <p><b>Executive</b><br/>{time} - Present</p>
            <p><b>{award}</b></p>
            <p>{description}</p>
        </div>
        <div class={`ec-block ${transmuted ? '' : 'ec-closed'}`}>
            <img src={image} />
        </div>
        <button onClick={transmute}>View More</button>
    </div>
  )
}

export default Extracurriculars