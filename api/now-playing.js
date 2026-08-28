export default async function handler(req, res) {
  const apiKey = process.env.LASTFM_API_KEY;
  const username = process.env.LASTFM_USERNAME;

  if (!apiKey || !username) {
    return res
      .status(500)
      .json({ error: "Missing Last.fm environment variables" });
  }

  const period = req.query.period || "overall";

  try {
    const recentUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;
    const infoUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${username}&api_key=${apiKey}&format=json`;
    const topArtistsUrl = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${apiKey}&format=json&limit=1&period=${period}`;
    const topTracksUrl = `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&api_key=${apiKey}&format=json&limit=1&period=${period}`;
    const topAlbumsUrl = `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${username}&api_key=${apiKey}&format=json&limit=1&period=${period}`;

    const [recentRes, infoRes, artistsRes, tracksRes, albumsRes] =
      await Promise.all([
        fetch(recentUrl),
        fetch(infoUrl),
        fetch(topArtistsUrl),
        fetch(topTracksUrl),
        fetch(topAlbumsUrl),
      ]);

    const recentData = await recentRes.json();
    const infoData = await infoRes.json();
    const artistsData = await artistsRes.json();
    const tracksData = await tracksRes.json();
    const albumsData = await albumsRes.json();

    const latestTrack = recentData.recenttracks?.track?.[0];
    const isPlaying = latestTrack?.["@attr"]?.nowplaying === "true";

    const track = {
      isPlaying,
      title: latestTrack?.name || "Unknown Track",
      artist: latestTrack?.artist?.["#text"] || "Unknown Artist",
      album: latestTrack?.album?.["#text"] || "Unknown Album",
      songUrl: latestTrack?.url || "#",
      albumImageUrl:
        latestTrack?.image?.[latestTrack.image.length - 1]?.["#text"] || null,
      date: latestTrack?.date || null,
    };

    const totalPlays = infoData.user?.playcount || "0";
    const topArtist = artistsData.topartists?.artist?.[0]?.name || "N/A";
    const topTrack = tracksData.toptracks?.track?.[0]?.name || "N/A";

    const topAlbumObj = albumsData.topalbums?.album?.[0];
    const topAlbumName = topAlbumObj?.name || "N/A";
    const albumImages = topAlbumObj?.image;
    const topAlbumImg =
      albumImages && Array.isArray(albumImages) && albumImages.length > 0
        ? albumImages[albumImages.length - 1]["#text"] || null
        : null;

    return res.status(200).json({
      track,
      stats: {
        totalPlays,
        topArtist,
        topTrack,
        topAlbumName,
        topAlbumImg,
        period,
      },
    });
  } catch (error) {
    console.error("Error fetching Last.fm stats:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch music data from Last.fm" });
  }
}
