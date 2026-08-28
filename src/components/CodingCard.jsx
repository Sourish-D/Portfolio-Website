import { useEffect, useState } from "react";

const ONE_DAY = 24 * 60 * 60 * 1000;

const hasValidCache = (key, timeKey) => {
  const cachedTime = localStorage.getItem(timeKey);
  return (
    localStorage.getItem(key) &&
    cachedTime &&
    Date.now() - parseInt(cachedTime, 10) < ONE_DAY
  );
};

const generateDefaultDays = () => {
  const days = [];
  const today = new Date();
  for (let i = 30; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    days.push({
      date: d.toISOString().split("T")[0],
      count: 0,
    });
  }
  return days;
};

const CodingCard = ({ title, link, leet = false, username }) => {
  const platformPrefix = leet ? "leetcode_cache_" : "github_cache_";
  const cacheKey = `${platformPrefix}${username}`;
  const cacheTimeKey = `${cacheKey}_time`;
  const statsCacheKey = `${cacheKey}_stats`;
  const statsCacheTimeKey = `${statsCacheKey}_time`;
  const [contributions, setContributions] = useState(() => {
    if (!username) return generateDefaultDays();
    //Check if local cache exists first
    if (hasValidCache(cacheKey, cacheTimeKey)) {
      try {
        return JSON.parse(localStorage.getItem(cacheKey));
      } catch {
        // Fallback if parse fails
      }
    }
    return generateDefaultDays();
  });

  const [columns, setColumns] = useState(() => {
    if (!username || !hasValidCache(statsCacheKey, statsCacheTimeKey)) {
      return [];
    }
    try {
      return JSON.parse(localStorage.getItem(statsCacheKey));
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(() => {
    return Boolean(username) && !hasValidCache(cacheKey, cacheTimeKey);
  });

  const getLevel = (count) => {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 10) return 3;
    return 4;
  };

  useEffect(() => {
    if (!username) {
      return;
    }

    if (
      hasValidCache(cacheKey, cacheTimeKey) &&
      hasValidCache(statsCacheKey, statsCacheTimeKey)
    ) {
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      try {
        let days = [];
        let fetchedColumns = [];

        if (leet) {
          //Leetcode Stats
          const res = await fetch(`/api/leetcode?username=${username}`);
          if (!res.ok) throw new Error("LeetCode API error");

          const { data, statColumns } = await res.json();

          fetchedColumns = statColumns || [];

          //Skeleton Graph + Parsing Info from API
          const rawCalendar = data.submissionCalendar || {};
          const calendarMap = {};

          Object.entries(rawCalendar).forEach(([timestamp, count]) => {
            const dateStr = new Date(parseInt(timestamp, 10) * 1000)
              .toISOString()
              .split("T")[0];
            calendarMap[dateStr] = count;
          });

          const today = new Date();
          for (let i = 30; i >= 0; i--) {
            const d = new Date();
            d.setDate(today.getDate() - i);
            const dateStr = d.toISOString().split("T")[0];

            days.push({
              date: dateStr,
              count: calendarMap[dateStr] || 0,
            });
          }
        } else {
          //Github Stats
          const res = await fetch(`/api/github?username=${username}`);

          if (!res.ok) throw new Error("GitHub API error");
          const { data, columnStats } = await res.json();

          fetchedColumns = columnStats || [];

          //Initializing a skeleton & Parsing Calendar events
          const daysMap = {};
          const today = new Date();
          for (let i = 30; i >= 0; i--) {
            const d = new Date();
            d.setDate(today.getDate() - i);
            const dateStr = d.toISOString().split("T")[0];
            daysMap[dateStr] = 0;
          }

          if (Array.isArray(data)) {
            data.forEach((event) => {
              const dateStr = event.created_at.split("T")[0];
              if (daysMap[dateStr] !== undefined) {
                daysMap[dateStr] += 1;
              }
            });
          }

          days = Object.keys(daysMap).map((dateStr) => ({
            date: dateStr,
            count: daysMap[dateStr],
          }));
        }

        if (!isMounted) return;

        localStorage.setItem(cacheKey, JSON.stringify(days));
        localStorage.setItem(cacheTimeKey, Date.now().toString());
        localStorage.setItem(statsCacheKey, JSON.stringify(fetchedColumns));
        localStorage.setItem(statsCacheTimeKey, Date.now().toString());

        setContributions(days);
        setColumns(fetchedColumns);
        setLoading(false);
      } catch (err) {
        if (!isMounted) return;
        console.error(
          `Failed to fetch ${leet ? "LeetCode" : "GitHub"} contribution data:`,
          err,
        );
        setContributions(generateDefaultDays());
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [
    username,
    leet,
    cacheKey,
    cacheTimeKey,
    statsCacheKey,
    statsCacheTimeKey,
  ]);

  return (
    <a
      href={link}
      className="coding-card-wrapper"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="coding-card standard-block text-center">
        <div className="card-image-overlay" />
        <h1 className="important-text">{title}</h1>

        <div className="contribution-graph-block">
          <p className="coding-card-sub-heading important-text">
            Contributions:{" "}
          </p>
          <div className="contribution-graph">
            {loading
              ? Array.from({ length: 31 }).map((_, i) => (
                  <div className="contribution-day level-0" key={i} />
                ))
              : contributions.map((day) => (
                  <div
                    className={`contribution-day level-${getLevel(day.count)}`}
                    key={day.date}
                    title={`${day.date}: ${day.count} submissions`}
                  />
                ))}
          </div>
        </div>

        <div className="coding-statistics">
          {columns.map((row, index) => (
            <div className="column-grid10" key={row.statName || index}>
              <p className="coding-stats-info column-span6">{row.statName}</p>
              <p className="coding-stats-name">{row.info}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="coding-card-pop-up standard-block center-text">
        <p>See Account!</p>
      </div>
    </a>
  );
};

export default CodingCard;
