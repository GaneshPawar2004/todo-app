// src/components/TodoList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTodos, deleteTodo } from '../firebase';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const todoList = await fetchTodos();
      setTodos(todoList);
    };

    getTodos();
  }, []);

  const handleDelete = async (id) => {
    await deleteTodo(id);
    const todoList = await fetchTodos();
    setTodos(todoList);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <Link to="/add">
        <button>Add New Todo</button>
      </Link>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <h2>{todo.name}</h2>
            <p>{todo.description}</p>
            <p><strong>Due Date:</strong> {todo.dueDate}</p>
            {/* Link to EditTodo page */}
            <Link to={`/edit/${todo.id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
