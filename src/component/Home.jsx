import { useState, useEffect } from "react";

export default function Home() {

  const [todo, setTodo] = useState("");

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [editId, setEditId] = useState(null);


  // Save tasks in Local Storage
  useEffect(() => {
    localStorage.setItem(
      "todos",
      JSON.stringify(todos)
    );
  }, [todos]);



  // Add / Update Task
  function handleSubmit(e) {
    e.preventDefault();

    if (todo.trim() === "") return;


    if (editId !== null) {

      const updatedTodos = todos.map((item) =>
        item.id === editId
          ? { ...item, text: todo }
          : item
      );

      setTodos(updatedTodos);
      setEditId(null);

    } else {

      const newTask = {
        id: Date.now(),
        text: todo,
        completed: false
      };

      setTodos([...todos, newTask]);

    }

    setTodo("");
  }



  // Delete Task
  function deleteTask(id) {

    const updatedTodos = todos.filter(
      (item) => item.id !== id
    );

    setTodos(updatedTodos);

  }



  // Clear All Tasks
  function clearAllTasks() {

    const confirmDelete = window.confirm(
      "Are you sure you want to clear all tasks?"
    );

    if (confirmDelete) {
      setTodos([]);
    }

  }



  // Edit Task
  function editTask(id) {

    const selectedTask = todos.find(
      (item) => item.id === id
    );

    setTodo(selectedTask.text);
    setEditId(id);

  }



  // Mark task completed
  function toggleComplete(id) {

    const updatedTodos = todos.map((item) =>
      item.id === id
        ? {
            ...item,
            completed: !item.completed
          }
        : item
    );

    setTodos(updatedTodos);

  }



  return (

    <div className="container mt-5">


      <h2 className="text-center mb-4">
        📝 My Todo List
      </h2>



      {/* Add Task Form */}

      <form
        onSubmit={handleSubmit}
        className="d-flex gap-2"
      >

        <input
          type="text"
          className="form-control"
          placeholder="Enter your task"
          value={todo}
          onChange={(e) =>
            setTodo(e.target.value)
          }
        />


        <button
          type="submit"
           className="btn btn-outline-primary"
        >
          {editId !== null ? "Update" : "Add"}
        </button>

      </form>




      {/* Task List */}

      <div className="mt-4">


        {todos.length === 0 ? (

          <p className="text-center">
            No tasks added yet
          </p>


        ) : (

          todos.map((item) => (

            <div
              key={item.id}
              className="card mb-2 p-3 shadow-sm"
            >

              <div className="d-flex justify-content-between align-items-center">


                <div>

                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={item.completed}
                    onChange={() =>
                      toggleComplete(item.id)
                    }
                  />


                  <span
                    style={{
                      textDecoration: item.completed
                        ? "line-through"
                        : "none"
                    }}
                  >
                    {item.text}
                  </span>

                </div>



                <div>

                  <button
                    className="btn btn-outline-success btn-sm me-2"
                    onClick={() =>
                      editTask(item.id)
                    }
                  >
                    Edit
                  </button>


                  <button
                      className="btn btn-outline-danger btn-sm"
                    onClick={() =>
                      deleteTask(item.id)
                    }
                  >
                    Delete
                  </button>

                </div>


              </div>

            </div>

          ))

        )}

      </div>



      {/* Clear All Button */}

      {todos.length > 0 && (

        <div className="text-center mt-4">

          <button
             className="btn btn-outline-danger"
            onClick={clearAllTasks}
          >
            Clear All Tasks
          </button>

        </div>

      )}



    </div>

  );
}