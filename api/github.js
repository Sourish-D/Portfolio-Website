export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=59");

  try {
    //Checking Graph Data
    const graphResponse = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      },
    );
    //Checking User Data
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`,
    );
    const userData = await userResponse.json();
    //Checking Last 100 Events Data
    const eventsResponse = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=100`,
    );
    const events = await eventsResponse.json();
    //Checking Repos Data (For Latest Repo Stat)
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=1`,
    );
    const reposData = await reposResponse.json();
    //Parsing Latest Repo
    const latestRepoName =
      Array.isArray(reposData) && reposData.length > 0
        ? reposData[0].name
        : "None";
    const columnStats = ([
      {
        info: events.length > 0 ? `${events.length}+` : "0",
        statName: "Recent Events",
      },
      { info: userData.public_repos ?? 0, statName: "Repos" },
      { info: userData.followers ?? 0, statName: "Followers" },
      { info: latestRepoName, statName: "Latest Repo" },
    ]);
    if (!graphResponse.ok) {
      return res
        .status(graphResponse.status)
        .json({ error: "Failed to fetch GitHub data" });
    }

    const data = await graphResponse.json();
    return res.status(200).json({data, columnStats});
  } catch (error) {
    return res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
}
