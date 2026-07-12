const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  clearAllTodos,
  getStats,
} = require("../controllers/todoController");

// All todo routes are protected
router.use(authMiddleware);

router.get("/stats", getStats);
router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/clear", clearAllTodos);
router.delete("/:id", deleteTodo);

module.exports = router;
