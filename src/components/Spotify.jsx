import spotify from "../assets/spotify.png";
import album from "../assets/album.jpg";

const Spotify = () => {
  return (
    <section className="spotify standard-block middle-box double-grid center-text">
      <div className="spotify-now-playing right-border">
        <h1 className="important-text">Now Listening To</h1>
        <div className="double-grid">
          <img src={spotify} alt="Now Playing" className="spotify-img"/>
          <div className="distribute-column-text">
            <div>
              <h2>Track Name</h2>
              <h3>Artist Name</h3>
            </div>
            <div>
              <div className="spotify-progress_bar"/>
              <h3>Time</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="spotify-stats double-grid">
        <h1 className="important-text">My Listening Stats</h1>
        <div className="spotify-stats-titles distribute-column-text">
          <h2>Total Plays:</h2>
          <h2>Top Artist:</h2>
          <h2>Top Track:</h2>
        </div>
        <div className="spotify-stats-album row-span2">
          <img src={album} alt="Album" />
          <h2>Top Album</h2>
        </div>
        <div>
          <button>7 Days</button>
          <button>30 Days</button>
          <button>6 Months</button>
          <button>All Time</button>
        </div>
      </div>
    </section>
  );
};

export default Spotify;
