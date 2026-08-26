import { useState } from "react";

const GameCard = ({ title, image, description }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="favourite-games-card standard-block center-text">
      <h1 className="important-text">{title}</h1>
      <img src={image} alt="Game Picture" />
      <div className={`game-description ${expanded ? "open" : ""}`}>
        <p>{description}</p>
      </div>
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? "▲" : "▼"}
      </button>
    </div>
  );
};

export default GameCard;
