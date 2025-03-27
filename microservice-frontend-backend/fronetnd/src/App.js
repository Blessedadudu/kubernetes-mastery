import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

console.log(API_URL, "ccc");

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/todos`)
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const addTodo = () => {
    axios.post(`${API_URL}/todos`, { task }).then(() => {
      setTodos([...todos, { task }]);
      setTask("");
    });
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
