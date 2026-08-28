import { useState, useRef, useEffect } from "react";

const Extracurriculars = ({ title, image, description, time, award }) => {
  const [transmuted, setTransmuted] = useState(false);
  const [flashing, setFlashing] = useState(false);
  const timersRef = useRef([]);

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  const transmute = () => {
    clearAllTimers();
    setFlashing(true);

    timersRef.current.push(
      setTimeout(() => {
        setTransmuted((prev) => !prev);
      }, 150),

      setTimeout(() => {
        setFlashing(false);
      }, 300),
    );
  };
  return (
    <div
      className={`extracurricular-card standard-block center-text ${flashing ? "flash" : ""}`}
    >
      <h1 className="important-text">{title}</h1>
      <div
        className={`ec-block distribute-column-text ec-block-two ${transmuted ? "ec-closed" : ""}`}
      >
        <p>
          <b>Executive</b>
          <br />
          {time} - Present
        </p>
        <p>
          <b>{award}</b>
        </p>
        <p className="ec-description">{description}</p>
      </div>
      <div className={`ec-block ${transmuted ? "" : "ec-closed"}`}>
        <img src={image} alt="Extracurricular Image"/>
      </div>
      <button onClick={transmute}>View More</button>
    </div>
  );
};

export default Extracurriculars;
