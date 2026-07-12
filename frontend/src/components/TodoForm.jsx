import { useState, useEffect } from "react";

const CATEGORIES = ["General", "Work", "Personal", "Shopping", "Health", "Study", "Finance"];
const PRIORITIES = ["low", "medium", "high"];

export default function TodoForm({ onSubmit, editTodo, onCancel }) {
  const isEditing = !!editTodo;

  const [form, setForm] = useState({
    text: "",
    priority: "medium",
    category: "General",
    due_date: "",
  });

  // Sync form when editTodo changes
  useEffect(() => {
    if (editTodo) {
      setForm({
        text: editTodo.text || "",
        priority: editTodo.priority || "medium",
        category: editTodo.category || "General",
        due_date: editTodo.due_date
          ? new Date(editTodo.due_date).toISOString().split("T")[0]
          : "",
      });
    } else {
      setForm({ text: "", priority: "medium", category: "General", due_date: "" });
    }
  }, [editTodo]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.text.trim()) return;
    onSubmit({ ...form, due_date: form.due_date || null });
    if (!isEditing) {
      setForm({ text: "", priority: "medium", category: "General", due_date: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm border-0 rounded-4 mb-4">
      <h6 className="fw-bold mb-3" style={{ color: "var(--primary)" }}>
        <i className={`bi ${isEditing ? "bi-pencil-square" : "bi-plus-circle"} me-2`}></i>
        {isEditing ? "Edit Task" : "Add New Task"}
      </h6>

      {/* Task text */}
      <div className="mb-3">
        <input
          type="text"
          name="text"
          className="form-control form-control-lg rounded-3"
          placeholder="✏️  What do you need to do?"
          value={form.text}
          onChange={handleChange}
          required
          autoFocus={isEditing}
        />
      </div>

      <div className="row g-2 mb-3">
        {/* Priority */}
        <div className="col-sm-4">
          <label className="form-label small fw-semibold text-muted mb-1">
            <i className="bi bi-flag me-1"></i>Priority
          </label>
          <select name="priority" className="form-select" value={form.priority} onChange={handleChange}>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className="col-sm-4">
          <label className="form-label small fw-semibold text-muted mb-1">
            <i className="bi bi-tag me-1"></i>Category
          </label>
          <select name="category" className="form-select" value={form.category} onChange={handleChange}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Due Date */}
        <div className="col-sm-4">
          <label className="form-label small fw-semibold text-muted mb-1">
            <i className="bi bi-calendar3 me-1"></i>Due Date
          </label>
          <input
            type="date"
            name="due_date"
            className="form-control"
            value={form.due_date}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary fw-semibold flex-grow-1 rounded-3">
          <i className={`bi ${isEditing ? "bi-check2-circle" : "bi-plus-lg"} me-1`}></i>
          {isEditing ? "Update Task" : "Add Task"}
        </button>
        {isEditing && (
          <button type="button" className="btn btn-outline-secondary rounded-3" onClick={onCancel}>
            <i className="bi bi-x-lg me-1"></i>Cancel
          </button>
        )}
      </div>
    </form>
  );
}
