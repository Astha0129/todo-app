export default function StatsPanel({ stats, loading }) {
  if (loading) {
    return (
      <div className="row g-3 mb-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="col-6 col-lg-3">
            <div className="stat-card card p-3">
              <div className="placeholder-glow">
                <span className="placeholder col-8 mb-2 d-block"></span>
                <span className="placeholder col-4"></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      label: "Total Tasks",
      value: stats?.total ?? 0,
      icon: "bi-list-check",
      bg: "rgba(16,185,129,0.12)",
      color: "#10b981",
    },
    {
      label: "Completed",
      value: stats?.completed ?? 0,
      icon: "bi-check-circle-fill",
      bg: "rgba(34,197,94,0.12)",
      color: "#22c55e",
    },
    {
      label: "Pending",
      value: stats?.pending ?? 0,
      icon: "bi-clock-fill",
      bg: "rgba(245,158,11,0.12)",
      color: "#f59e0b",
    },
    {
      label: "Overdue",
      value: stats?.overdue ?? 0,
      icon: "bi-exclamation-triangle-fill",
      bg: "rgba(239,68,68,0.12)",
      color: "#ef4444",
    },
  ];

  return (
    <div className="row g-3 mb-4">
      {cards.map((card) => (
        <div key={card.label} className="col-6 col-lg-3">
          <div className="stat-card card p-3 h-100">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted small mb-1 fw-medium">{card.label}</p>
                <h3 className="fw-bold mb-0" style={{ color: card.color }}>
                  {card.value}
                </h3>
              </div>
              <div
                className="stat-icon"
                style={{ background: card.bg }}
              >
                <i className={`bi ${card.icon}`} style={{ color: card.color }}></i>
              </div>
            </div>
            {/* Progress bar for completed/total */}
            {card.label === "Completed" && stats?.total > 0 && (
              <div className="mt-2">
                <div className="progress" style={{ height: "4px", borderRadius: "10px" }}>
                  <div
                    className="progress-bar"
                    style={{
                      width: `${Math.round((stats.completed / stats.total) * 100)}%`,
                      background: card.color,
                      borderRadius: "10px",
                    }}
                  ></div>
                </div>
                <small className="text-muted" style={{ fontSize: "0.7rem" }}>
                  {Math.round((stats.completed / stats.total) * 100)}% done
                </small>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
