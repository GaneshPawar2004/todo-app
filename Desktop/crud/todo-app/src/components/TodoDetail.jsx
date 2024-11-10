// src/components/TodoDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTodos, updateTodo } from '../firebase';

const TodoDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [todo, setTodo] = useState({
        name: '',
        description: '',
        endDate: '',
    });

    useEffect(() => {
        const getTodo = async () => {
            const todos = await fetchTodos();
            const todo = todos.find(todo => todo.id === id);
            if (todo) {
                setTodo(todo);
            }
        };

        getTodo();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTodo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = async () => {
        await updateTodo(id, todo);
        navigate('/');
    };

    return (
        <div>
            <h1>Edit Todo</h1>
            <form>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={todo.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={todo.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        value={todo.endDate}
                        onChange={handleChange}
                    />
                </div>
                <button type="button" onClick={handleSave}>Save</button>
            </form>
        </div>
    );
};

export default TodoDetail;
