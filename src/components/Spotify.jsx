import React from 'react'
import spotify from "../assets/spotify.png";
import album from "../assets/album.jpg";


const Spotify = () => {
  return (
    <div class="spotify standard-block">
        <div class="spotify-now-playing">
          <h1>Now Listening To</h1>
          <div class="spotify-now-playing-content">
            <img src={spotify} alt="Now Playing" />
            <div class="spotify-now-playing-info">
              <h2>Track Name</h2>
              <h3>Artist Name</h3>
              <br /><br /><br /><br /><br />
              <div class="spotify-progress_bar" />
              <h3>Time</h3>
            </div>
          </div>
        </div>
        <div class="spotify-stats">
          <h1>My Listening Stats</h1>
          <div class="spotify-stats-titles">
          <h2>Total Plays:</h2>
          <h2>Top Artist:</h2>
          <h2>Top Track:</h2>
          </div>
          <div class="spotify-stats-album">
            <img src={album} alt="Album" />
            <h2>Top Album</h2>
          </div>
          <div class="spotify-stats-time-selectors">
            <button>7 Days</button>
            <button>30 Days</button>
            <button>6 Months</button>
            <button>All Time</button>
          </div>
        </div>
    </div>
  )
}

export default Spotify