export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=59");

  try {
    const graphResponse = await fetch(
      `https://leetcode-stats-api.herokuapp.com/${username}`
    );

    if (!graphResponse.ok) {
      return res
        .status(graphResponse.status)
        .json({ error: "Failed to fetch LeetCode stats" });
    }

    // 1. Parse the JSON first so `data` is defined
    const data = await graphResponse.json();

    // 2. Build statColumns using the parsed data object
    const statColumns = [
      { statName: "Total Solved", info: data.totalSolved || 0 },
      { statName: "Easy", info: data.easySolved || 0 },
      { statName: "Medium", info: data.mediumSolved || 0 },
      { statName: "Hard", info: data.hardSolved || 0 },
    ];

    // 3. Return both to the front end cleanly
    return res.status(200).json({ data, statColumns });
  } catch (error) {
    return res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
}