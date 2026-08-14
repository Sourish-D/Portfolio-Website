import {useState} from 'react'

const GameCard = ({title, image, description}) => {
    const [expanded, setExpanded] = useState(false);
    return (
         <div class="favourite-games-card">
            <h1>{title}</h1>
            <img src={image} alt="Game Picture" />
            <div class={`game-description ${expanded ? 'open' : ''}`}>
                <p>{description}</p>
            </div>
            <button onClick={() => setExpanded(!expanded)}>
                {expanded ? "▼" :"▲"}
            </button>
        </div>
    )
}

export default GameCard