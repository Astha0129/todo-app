const CATEGORIES = ["All", "General", "Work", "Personal", "Shopping", "Health", "Study", "Finance"];

export default function FilterBar({ filters, setFilters }) {
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ status: "all", priority: "all", category: "All", search: "" });
  };

  const hasActiveFilters =
    filters.status !== "all" ||
    filters.priority !== "all" ||
    filters.category !== "All" ||
    filters.search !== "";

  return (
    <div className="card border-0 shadow-sm rounded-4 p-3 mb-4">
      <div className="row g-2 align-items-end">
        {/* Search */}
        <div className="col-12 col-md-4">
          <label className="form-label small fw-semibold text-muted mb-1">
            <i className="bi bi-search me-1"></i>Search
          </label>
          <div className="input-group">
            <span className="input-group-text border-end-0 bg-transparent">
              <i className="bi bi-search text-muted small"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => handleChange("search", e.target.value)}
            />
            {filters.search && (
              <button
                className="btn btn-outline-secondary border-start-0"
                onClick={() => handleChange("search", "")}
              >
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>
        </div>

        {/* Status filter */}
        <div className="col-6 col-md-2">
          <label className="form-label small fw-semibold text-muted mb-1">
            <i className="bi bi-check-circle me-1"></i>Status
          </label>
          <select
            className="form-select"
            value={filters.status}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Priority filter */}
        <div className="col-6 col-md-2">
          <label className="form-label small fw-semibold text-muted mb-1">
            <i className="bi bi-flag me-1"></i>Priority
          </label>
          <select
            className="form-select"
            value={filters.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Category filter */}
        <div className="col-6 col-md-2">
          <label className="form-label small fw-semibold text-muted mb-1">
            <i className="bi bi-tag me-1"></i>Category
          </label>
          <select
            className="form-select"
            value={filters.category}
            onChange={(e) => handleChange("category", e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Clear filters */}
        <div className="col-6 col-md-2 d-flex align-items-end">
          {hasActiveFilters ? (
            <button className="btn btn-outline-secondary w-100 rounded-3" onClick={clearFilters}>
              <i className="bi bi-funnel me-1"></i>Clear
            </button>
          ) : (
            <div className="text-muted small d-flex align-items-center gap-1 ps-1">
              <i className="bi bi-funnel"></i> Filters
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
