const PRIORITY_MAP = {
  high:   { label: "High",   cls: "badge-priority-high",   icon: "bi-arrow-up-circle-fill" },
  medium: { label: "Medium", cls: "badge-priority-medium", icon: "bi-dash-circle-fill" },
  low:    { label: "Low",    cls: "badge-priority-low",    icon: "bi-arrow-down-circle-fill" },
};

function isOverdue(due_date, completed) {
  if (!due_date || completed) return false;
  return new Date(due_date) < new Date(new Date().toDateString());
}

export default function TodoCard({ todo, onToggle, onEdit, onDelete }) {
  const p = PRIORITY_MAP[todo.priority] || PRIORITY_MAP.medium;
  const overdue = isOverdue(todo.due_date, todo.completed);

  const formatDate = (d) => {
    if (!d) return null;
    const date = new Date(d);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className={`todo-card card mb-3 fade-in-up priority-${todo.priority} ${todo.completed ? "completed-card" : ""}`}>
      <div className="card-body py-3 ps-4">
        <div className="d-flex align-items-start justify-content-between gap-2">
          {/* Checkbox + Text */}
          <div className="d-flex align-items-start gap-3 flex-grow-1">
            <div className="mt-1">
              <input
                type="checkbox"
                className="form-check-input"
                style={{ width: "20px", height: "20px", cursor: "pointer" }}
                checked={todo.completed}
                onChange={() => onToggle(todo.id, !todo.completed)}
              />
            </div>
            <div className="flex-grow-1">
              <p className={`mb-1 fw-medium ${todo.completed ? "todo-text done" : "todo-text"}`}
                 style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                {todo.text}
              </p>

              {/* Meta badges */}
              <div className="d-flex flex-wrap gap-1 mt-1 align-items-center">
                {/* Priority badge */}
                <span className={`badge rounded-pill px-2 py-1 small ${p.cls}`}>
                  <i className={`bi ${p.icon} me-1`} style={{ fontSize: "0.65rem" }}></i>
                  {p.label}
                </span>

                {/* Category badge */}
                <span className="badge rounded-pill px-2 py-1 small bg-primary bg-opacity-10 text-primary">
                  <i className="bi bi-tag me-1" style={{ fontSize: "0.65rem" }}></i>
                  {todo.category}
                </span>

                {/* Due date */}
                {todo.due_date && (
                  <span className={`badge rounded-pill px-2 py-1 small ${
                    overdue
                      ? "bg-danger bg-opacity-15 text-danger overdue-glow"
                      : "bg-secondary bg-opacity-10 text-secondary"
                  }`}>
                    <i className={`bi ${overdue ? "bi-exclamation-circle" : "bi-calendar3"} me-1`}
                       style={{ fontSize: "0.65rem" }}></i>
                    {overdue ? "Overdue · " : ""}{formatDate(todo.due_date)}
                  </span>
                )}

                {/* Completed badge */}
                {todo.completed && (
                  <span className="badge rounded-pill px-2 py-1 small bg-success bg-opacity-10 text-success">
                    <i className="bi bi-check2 me-1" style={{ fontSize: "0.65rem" }}></i>Done
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="d-flex gap-1 flex-shrink-0">
            <button
              className="btn btn-sm btn-outline-primary rounded-2"
              onClick={() => onEdit(todo)}
              disabled={todo.completed}
              title="Edit task"
            >
              <i className="bi bi-pencil"></i>
            </button>
            <button
              className="btn btn-sm btn-outline-danger rounded-2"
              onClick={() => onDelete(todo.id)}
              title="Delete task"
            >
              <i className="bi bi-trash3"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
