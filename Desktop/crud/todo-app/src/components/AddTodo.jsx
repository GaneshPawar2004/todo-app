// src/components/AddTodo.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTodo } from '../firebase';

const AddTodo = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from reloading when the form is submitted

    if (name === '' || description === '' || dueDate === '') {
      alert('Please fill in all fields');
      return;
    }

    const newTodo = {
      name,
      description,
      dueDate, // Save the due date here
      createdAt: new Date().toISOString(), // Current timestamp when the todo is created
    };

    try {
      await addTodo(newTodo); // Call Firebase function to add the todo
      navigate('/'); // Redirect to the main todo list page
    } catch (error) {
      console.error('Error adding todo: ', error);
    }
  };

  return (
    <div>
      <h1>Add New Todo</h1>
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
            onChange={(e) => setDueDate(e.target.value)} // Update dueDate state
            required
          />
        </div>

        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default AddTodo;
