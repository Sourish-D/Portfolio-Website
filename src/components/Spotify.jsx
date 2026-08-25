import { useEffect, useState } from "react";
import spotify from "../assets/spotify.png";
import album from "../assets/album.jpg";

const Spotify = () => {
  const [musicData, setMusicData] = useState({ track: { isPlaying: false }, stats: {} });
  const [selectedPeriod, setSelectedPeriod] = useState('overall');

  useEffect(() => {
    async function fetchMusicData() {
      try {
        const res = await fetch(`/api/now-playing?period=${selectedPeriod}`);
        const data = await res.json();
        setMusicData(data);
      } catch (err) {
        console.error("Error fetching music status: ", err);
      }
    }

    fetchMusicData();

    // Only auto-poll the live track/general state; or include period if desired
    const interval = setInterval(fetchMusicData, 30000);
    return () => clearInterval(interval);
  }, [selectedPeriod]);

  function formatTimestamp(uts) {
    if (!uts) return "Just now";
    
    // eslint-disable-next-line
    const now = Math.floor(Date.now() / 1000);
    const diffSeconds = now - parseInt(uts, 10);

    if (diffSeconds < 60) return "Just now";
    const minutes = Math.floor(diffSeconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    return new Date(uts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const { track, stats } = musicData;
  
  return (
    <section className="spotify standard-block middle-box double-grid center-text">
      {/* Left Side: Now Listening To */}
      <div className="spotify-now-playing right-border">
        <h1 className="important-text">{track.isPlaying ? "Currently Listening" : "Last Played on Last.fm"}</h1>
        <div className="double-grid">
          <img
            src={track?.albumImageUrl || spotify}
            alt={track?.title ? `${track.title} album art` : "Now Playing"}
            className="spotify-img"
          />
          <div className="distribute-column-text">
            <div>
              <h2>
                {track?.songUrl ? (
                  <a
                    href={track.songUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {track.title}
                  </a>
                ) : (
                  <span>{track?.title || "N/A"}</span>
                )}
              </h2>
              <h3>{track?.artist || "N/A"}</h3>
            </div>
            <div>
              <h3>{track.isPlaying ? "Playing Now" : `Played ${formatTimestamp(track.date?.uts)}`}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: My Listening Stats */}
      <div className="spotify-stats double-grid">
        <h1 className="important-text">My Listening Stats</h1>
        <div className="spotify-stats-titles distribute-column-text">
          <h2>Total Plays: {stats.totalPlays || "0"}</h2>
          <h2>Top Artist: {stats.topArtist || "N/A"}</h2>
          <h2>Top Track: {stats.topTrack || "N/A"}</h2>
        </div>
        <div className="spotify-stats-album row-span2">
          <img src={stats.topAlbumImg || album} alt="Top Album" />
          <h2>Top Album</h2>
        </div>
        <div className="spotify-period-buttons">
          <button 
            className={selectedPeriod === '7day' ? 'active' : ''} 
            onClick={() => setSelectedPeriod('7day')}
          >
            7 Days
          </button>
          <button 
            className={selectedPeriod === '1month' ? 'active' : ''} 
            onClick={() => setSelectedPeriod('1month')}
          >
            30 Days
          </button>
          <button 
            className={selectedPeriod === '6month' ? 'active' : ''} 
            onClick={() => setSelectedPeriod('6month')}
          >
            6 Months
          </button>
          <button 
            className={selectedPeriod === 'overall' ? 'active' : ''} 
            onClick={() => setSelectedPeriod('overall')}
          >
            All Time
          </button>
        </div>
      </div>
    </section>
  );
};

export default Spotify;