import { useEffect, useState } from 'react';

const generateDefaultDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 30; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        days.push({
            date: d.toISOString().split('T')[0],
            count: 0,
        });
    }
    return days;
};

// Helper to check cache synchronously during initialization
const getInitialData = (leet, username) => {

    const platformPrefix = leet ? 'leetcode_cache_' : 'github_cache_';
    const cacheKey = `${platformPrefix}${username}`;
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(`${cacheKey}_time`);
    const oneDay = 24 * 60 * 60 * 1000;

    if (cachedData && cachedTime && Date.now() - parseInt(cachedTime, 10) < oneDay) {
        try {
            return { data: JSON.parse(cachedData), loading: false };
        } catch {
            // fallback if JSON parse fails
        }
    }

    return { data: generateDefaultDays(), loading: true };
};

const CodingCard = ({ title, columns, link, leet = false, username }) => {
    const initial = getInitialData(leet, username);
    const [contributions, setContributions] = useState(initial.data);
    const [loading, setLoading] = useState(initial.loading);

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

        const platformPrefix = leet ? 'leetcode_cache_' : 'github_cache_';
        const cacheKey = `${platformPrefix}${username}`;
        let isMounted = true;

        const fetchData = async () => {
            try {
                let days = [];
                if (leet) {
                    const apiUrl = `https://leetcode-stats-api.herokuapp.com/${username}`;
                    const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(apiUrl)}`;
                    
                    const res = await fetch(proxyUrl);
                    if (!res.ok) throw new Error('LeetCode API error');
                    const data = await res.json();
                    
                    const rawCalendar = data.submissionCalendar || {};
                    const calendarMap = {};

                    Object.entries(rawCalendar).forEach(([timestamp, count]) => {
                        const dateStr = new Date(parseInt(timestamp, 10) * 1000)
                            .toISOString()
                            .split('T')[0];
                        calendarMap[dateStr] = count;
                    });

                    const today = new Date();
                    for (let i = 30; i >= 0; i--) {
                        const d = new Date();
                        d.setDate(today.getDate() - i);
                        const dateStr = d.toISOString().split('T')[0];

                        days.push({
                            date: dateStr,
                            count: calendarMap[dateStr] || 0,
                        });
                    }
                } else {
                    // --- GITHUB FETCH ---
                    console.log("fetching Github");
                    const eventsUrl = `https://api.github.com/users/${username}/events/public?per_page=100`;
                    const res = await fetch(eventsUrl);
                    
                    if (!res.ok) throw new Error('GitHub API error');
                    const events = await res.json();
                    console.log("GitHub events received:", events);

                    const daysMap = {};
                    const today = new Date();
                    for (let i = 30; i >= 0; i--) {
                        const d = new Date();
                        d.setDate(today.getDate() - i);
                        const dateStr = d.toISOString().split('T')[0];
                        daysMap[dateStr] = 0;
                    }

                    if (Array.isArray(events)) {
                        events.forEach(event => {
                            const dateStr = event.created_at.split('T')[0];
                            if (daysMap[dateStr] !== undefined) {
                                daysMap[dateStr] += 1;
                            }
                        });
                    }

                    days = Object.keys(daysMap).map(dateStr => ({
                        date: dateStr,
                        count: daysMap[dateStr]
                    }));
                }
                if (!isMounted) return;

                // Save to localStorage cache
                localStorage.setItem(cacheKey, JSON.stringify(days));
                localStorage.setItem(`${cacheKey}_time`, Date.now().toString());

                setContributions(days);
                setLoading(false);

            } catch (err) {
                if (!isMounted) return;
                console.error(`Failed to fetch ${leet ? 'LeetCode' : 'GitHub'} contribution data:`, err);
                setContributions(generateDefaultDays());
                setLoading(false);
            }
        };

        fetchData();
        return () => {
            isMounted = false;
        };
    }, [username, leet, loading]);

    return (
        <a href={link} className="coding-card-wrapper" target="_blank" rel="noopener noreferrer">
            <div className="coding-card standard-block text-center">
                <div className="card-image-overlay" />
                <h1 className="important-text">{title}</h1>
                
                <div className="contribution-graph-block">
                    <p className="coding-card-sub-heading important-text">Contributions: </p>
                    <div className="contribution-graph">
                        {loading ? (
                            Array.from({ length: 31 }).map((_, i) => (
                                <div className="contribution-day level-0" key={i} />
                            ))
                        ) : (
                            contributions.map((day) => (
                                <div
                                    className={`contribution-day level-${getLevel(day.count)}`}
                                    key={day.date}
                                    title={`${day.date}: ${day.count} submissions`}
                                />
                            ))
                        )}
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