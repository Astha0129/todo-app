import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import TodoForm from "../components/TodoForm";
import TodoCard from "../components/TodoCard";
import FilterBar from "../components/FilterBar";

export default function Home() {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    category: "All",
    search: "",
  });

  // Fetch todos
  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (filters.status !== "all") params.status = filters.status;
      if (filters.priority !== "all") params.priority = filters.priority;
      if (filters.category !== "All") params.category = filters.category;
      if (filters.search) params.search = filters.search;

      const { data } = await api.get("/todos", { params });
      setTodos(data.todos);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Add or update todo
  const handleSubmit = async (formData) => {
    try {
      if (editTodo) {
        await api.put(`/todos/${editTodo.id}`, formData);
        setEditTodo(null);
      } else {
        await api.post("/todos", formData);
      }
      fetchTodos();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save task.");
    }
  };

  // Toggle complete
  const handleToggle = async (id, completed) => {
    try {
      await api.put(`/todos/${id}`, { completed });
      setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed } : t)));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task.");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await api.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task.");
    }
  };

  // Clear all
  const handleClearAll = async () => {
    if (!window.confirm("Clear ALL tasks? This cannot be undone.")) return;
    try {
      await api.delete("/todos/clear");
      setTodos([]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to clear tasks.");
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: "820px" }}>
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          👋 Welcome back, <span style={{ color: "var(--primary)" }}>{user?.username}!</span>
        </h2>
        <p className="text-muted mb-0">Here's what's on your plate today.</p>
      </div>

      {/* Add / Edit Form */}
      <TodoForm
        onSubmit={handleSubmit}
        editTodo={editTodo}
        onCancel={() => setEditTodo(null)}
      />

      {/* Filter Bar */}
      <FilterBar filters={filters} setFilters={setFilters} />

      {/* Error */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show rounded-3" role="alert">
          <i className="bi bi-exclamation-circle me-2"></i>{error}
          <button type="button" className="btn-close" onClick={() => setError("")}></button>
        </div>
      )}

      {/* Todo List */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading…</span>
          </div>
          <p className="text-muted mt-2">Loading your tasks…</p>
        </div>
      ) : todos.length === 0 ? (
        <div className="text-center py-5 fade-in-up">
          <div className="empty-illustration">
            {filters.search || filters.status !== "all" || filters.priority !== "all" ? "🔍" : "📝"}
          </div>
          <h5 className="fw-semibold text-muted">
            {filters.search || filters.status !== "all" || filters.priority !== "all"
              ? "No tasks match your filters"
              : "No tasks yet!"}
          </h5>
          <p className="text-muted">
            {filters.search || filters.status !== "all" || filters.priority !== "all"
              ? "Try adjusting the filters above."
              : "Add your first task above to get started."}
          </p>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted small fw-medium">
              <i className="bi bi-check2-square me-1"></i>
              {todos.length} task{todos.length !== 1 ? "s" : ""} shown
            </span>
            {todos.length > 0 && (
              <button
                className="btn btn-sm btn-outline-danger rounded-3"
                onClick={handleClearAll}
              >
                <i className="bi bi-trash3 me-1"></i>Clear All
              </button>
            )}
          </div>

          {todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onEdit={setEditTodo}
              onDelete={handleDelete}
            />
          ))}
        </>
      )}
    </div>
  );
}
