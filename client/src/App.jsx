import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./styles/App.css";

const URL = "http://localhost:3001";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

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

  const deleteTodo = async (id) => {
    const data = await fetch(`${URL}/todo/delete/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());

    const deleteTask = todos.filter((todo) => todo._id !== data._id);

    setTodos(deleteTask);
  };

  const createTodo = async () => {
    const newTodo = await fetch(`${URL}/todo/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: inputValue }),
    }).then((res) => res.json());

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  return (
    <div className="container">
      <h1>MERN Todo</h1>
      <input
        className="add_input"
        onChange={(e) => onChange(e)}
        type="text"
        value={inputValue}
        placeholder="add your task is here..."
      />
      <button className="add_btn" onClick={createTodo}>
        add
      </button>
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
                <button className="delete_btn" onClick={() => deleteTodo(_id)}>
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
