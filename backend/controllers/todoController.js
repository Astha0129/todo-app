const { pool } = require("../config/db");

// ─── GET ALL TODOS ────────────────────────────────────────────────────────────
const getTodos = async (req, res) => {
  const userId = req.user.id;
  const { status, priority, category, search } = req.query;

  let query = "SELECT * FROM todos WHERE user_id = ?";
  const params = [userId];

  if (status === "completed") {
    query += " AND completed = TRUE";
  } else if (status === "pending") {
    query += " AND completed = FALSE";
  }

  if (priority && ["low", "medium", "high"].includes(priority)) {
    query += " AND priority = ?";
    params.push(priority);
  }

  if (category && category !== "All") {
    query += " AND category = ?";
    params.push(category);
  }

  if (search) {
    query += " AND text LIKE ?";
    params.push(`%${search}%`);
  }

  query += " ORDER BY created_at DESC";

  try {
    const [rows] = await pool.execute(query, params);
    res.json({ todos: rows });
  } catch (err) {
    console.error("GetTodos error:", err);
    res.status(500).json({ message: "Server error fetching todos." });
  }
};

// ─── CREATE TODO ──────────────────────────────────────────────────────────────
const createTodo = async (req, res) => {
  const userId = req.user.id;
  const { text, priority = "medium", category = "General", due_date = null } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "Task text is required." });
  }

  try {
    const [result] = await pool.execute(
      "INSERT INTO todos (user_id, text, priority, category, due_date) VALUES (?, ?, ?, ?, ?)",
      [userId, text.trim(), priority, category, due_date || null]
    );

    const [rows] = await pool.execute(
      "SELECT * FROM todos WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json({ message: "Task created!", todo: rows[0] });
  } catch (err) {
    console.error("CreateTodo error:", err);
    res.status(500).json({ message: "Server error creating task." });
  }
};

// ─── UPDATE TODO ──────────────────────────────────────────────────────────────
const updateTodo = async (req, res) => {
  const userId = req.user.id;
  const todoId = req.params.id;
  const { text, completed, priority, category, due_date } = req.body;

  try {
    // Verify ownership
    const [rows] = await pool.execute(
      "SELECT * FROM todos WHERE id = ? AND user_id = ?",
      [todoId, userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Task not found." });
    }

    const existing = rows[0];

    await pool.execute(
      `UPDATE todos SET
        text = ?,
        completed = ?,
        priority = ?,
        category = ?,
        due_date = ?
      WHERE id = ? AND user_id = ?`,
      [
        text !== undefined ? text.trim() : existing.text,
        completed !== undefined ? completed : existing.completed,
        priority || existing.priority,
        category || existing.category,
        due_date !== undefined ? due_date || null : existing.due_date,
        todoId,
        userId,
      ]
    );

    const [updated] = await pool.execute(
      "SELECT * FROM todos WHERE id = ?",
      [todoId]
    );

    res.json({ message: "Task updated!", todo: updated[0] });
  } catch (err) {
    console.error("UpdateTodo error:", err);
    res.status(500).json({ message: "Server error updating task." });
  }
};

// ─── DELETE TODO ──────────────────────────────────────────────────────────────
const deleteTodo = async (req, res) => {
  const userId = req.user.id;
  const todoId = req.params.id;

  try {
    const [result] = await pool.execute(
      "DELETE FROM todos WHERE id = ? AND user_id = ?",
      [todoId, userId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.json({ message: "Task deleted!" });
  } catch (err) {
    console.error("DeleteTodo error:", err);
    res.status(500).json({ message: "Server error deleting task." });
  }
};

// ─── CLEAR ALL TODOS ──────────────────────────────────────────────────────────
const clearAllTodos = async (req, res) => {
  const userId = req.user.id;

  try {
    await pool.execute("DELETE FROM todos WHERE user_id = ?", [userId]);
    res.json({ message: "All tasks cleared!" });
  } catch (err) {
    console.error("ClearAll error:", err);
    res.status(500).json({ message: "Server error clearing tasks." });
  }
};

// ─── STATS ────────────────────────────────────────────────────────────────────
const getStats = async (req, res) => {
  const userId = req.user.id;

  try {
    const [[{ total }]] = await pool.execute(
      "SELECT COUNT(*) as total FROM todos WHERE user_id = ?",
      [userId]
    );
    const [[{ completed }]] = await pool.execute(
      "SELECT COUNT(*) as completed FROM todos WHERE user_id = ? AND completed = TRUE",
      [userId]
    );
    const [[{ high_priority }]] = await pool.execute(
      "SELECT COUNT(*) as high_priority FROM todos WHERE user_id = ? AND priority = 'high' AND completed = FALSE",
      [userId]
    );
    const [[{ overdue }]] = await pool.execute(
      "SELECT COUNT(*) as overdue FROM todos WHERE user_id = ? AND due_date < CURDATE() AND completed = FALSE",
      [userId]
    );

    res.json({
      stats: {
        total,
        completed,
        pending: total - completed,
        high_priority,
        overdue,
      },
    });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ 
      message: "Server error fetching stats.", 
      error: err.message,
      stack: err.stack
    });
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo, clearAllTodos, getStats };
