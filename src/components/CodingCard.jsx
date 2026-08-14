const contributions = [
    { date: "2026-08-01", count: 0 },
    { date: "2026-08-02", count: 2 },
    { date: "2026-08-03", count: 5 },
    { date: "2026-08-04", count: 1 },
    { date: "2026-08-05", count: 8 },
    { date: "2026-08-06", count: 12 },
    { date: "2026-08-07", count: 3 },

    { date: "2026-08-08", count: 0 },
    { date: "2026-08-09", count: 4 },
    { date: "2026-08-10", count: 7 },
    { date: "2026-08-11", count: 2 },
    { date: "2026-08-12", count: 10 },
    { date: "2026-08-13", count: 1 },
    { date: "2026-08-14", count: 6 },

    { date: "2026-08-15", count: 0 },
    { date: "2026-08-16", count: 3 },
    { date: "2026-08-17", count: 9 },
    { date: "2026-08-18", count: 15 },
    { date: "2026-08-19", count: 4 },
    { date: "2026-08-20", count: 2 },
    { date: "2026-08-21", count: 11 },

    { date: "2026-08-22", count: 0 },
    { date: "2026-08-23", count: 1 },
    { date: "2026-08-24", count: 5 },
    { date: "2026-08-25", count: 8 },
    { date: "2026-08-26", count: 13 },
    { date: "2026-08-27", count: 2 },
    { date: "2026-08-28", count: 7 },

    { date: "2026-08-29", count: 0 },
    { date: "2026-08-30", count: 6 },
    { date: "2026-08-31", count: 10 },
];

const CodingCard = ({title, columns, link}) => {
    const getLevel = (count) => {
        if (count === 0) return 0;
        if (count <= 2) return 1;
        if (count <= 5) return 2;
        if (count <= 10) return 3;
        return 4;
    };
  return (
    <a href={link} class="coding-card-wrapper">
        <div class="coding-card">
            <h1>{title}</h1>
            
            <p class="coding-card-sub-heading">Contributions: </p>
            <div className="contribution-graph">
                {contributions.map((day) => (
                    <div
                        className={`contribution-day level-${getLevel(day.count)}`}
                        key={day.date}
                    />
                ))}
            </div>

            <div class="coding-statistics">
                {columns.map((row) => (
                    <div class="coding-stats-row">
                        <p class="coding-stats-info">{row.info}</p>
                        <p class="coding-stats-name">{row.statName}</p>
                    </div>
                ))}
            </div>
        </div>
        <div class="coding-card-pop-up">
            <p>See Account!</p>
            <h2>↓</h2>
        </div>
    </a>
  )
}

export default CodingCard