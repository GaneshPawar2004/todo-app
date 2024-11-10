// src/components/EditTodo.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTodo, updateTodo } from '../firebase';

const EditTodo = () => {
  const { id } = useParams(); // Get the todo ID from the URL
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  // Fetch the todo data based on the ID from Firestore
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const todo = await getTodo(id); // Fetch the todo from Firebase
        setName(todo.name);
        setDescription(todo.description);
        setDueDate(todo.dueDate);
      } catch (error) {
        console.error('Error fetching todo: ', error);
      }
    };

    fetchTodo();
  }, [id]);

  // Handle form submission to update the todo
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === '' || description === '' || dueDate === '') {
      alert('Please fill in all fields');
      return;
    }

    const updatedTodo = {
      name,
      description,
      dueDate,
      updatedAt: new Date().toISOString(), // Update timestamp
    };

    try {
      await updateTodo(id, updatedTodo); // Call Firebase function to update the todo
      navigate('/'); // Redirect to the main todo list page
    } catch (error) {
      console.error('Error updating todo: ', error);
    }
  };

  return (
    <div>
      <h1>Edit Todo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter todo name"
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter todo description"
            required
          />
        </div>

        <div>
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <button type="submit">Update Todo</button>
      </form>
    </div>
  );
};

export default EditTodo;
