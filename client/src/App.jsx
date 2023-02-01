import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./styles/App.css";

const URL = "http://localhost:3001";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    fetch(`${URL}/todos`)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("error", err));
  };

  const completeTodo = async (id) => {
    const data = await fetch(`${URL}/todo/complete/${id}`).then((res) =>
      res.json()
    );

    const completeTask = todos.map((todo) => {
      if (todo._id === data._id) {
        todo.complete = data.complete;
      }

      return todo;
    });

    setTodos(completeTask);
  };

  return (
    <div className="container">
      <h1>MERN Todo</h1>
      <div>
        {!todos.length ? (
          <h3>no todo</h3>
        ) : (
          <ul>
            {todos.map(({ _id, task, complete }) => (
              <li key={_id}>
                <p
                  onClick={() => completeTodo(_id)}
                  className={complete ? "task_complete" : "task"}
                >
                  {task}
                </p>
                <button
                  className="delete_btn"
                  onClick={() => console.log("delete")}
                >
                  delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
