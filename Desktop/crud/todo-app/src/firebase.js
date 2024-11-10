

// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDMr25s7zqAXZyLbLnucLS8ikBkwX0ovxw",
    authDomain: "todo-app-dcd87.firebaseapp.com",
    projectId: "todo-app-dcd87",
    storageBucket: "todo-app-dcd87.firebasestorage.app",
    messagingSenderId: "127127527626",
    appId: "1:127127527626:web:5e5ebbfd4bed56762e9433",
    measurementId: "G-YJJ9L25YRQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch all todos from Firestore sorted by due date
export const fetchTodos = async () => {
  const todosCollection = collection(db, 'todos');

  // Query the todos collection ordered by dueDate in ascending order (closest date first)
  const q = query(todosCollection, orderBy('dueDate', 'asc'));

  const todosSnapshot = await getDocs(q);
  const todosList = todosSnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
  }));

  return todosList;
};

// Fetch a single todo by ID
export const getTodo = async (id) => {
  const todoRef = doc(db, 'todos', id);
  const todoSnap = await getDoc(todoRef);
  if (todoSnap.exists()) {
    return todoSnap.data();
  } else {
    throw new Error('Todo not found');
  }
};

// Add a new todo to Firestore
export const addTodo = async (newTodo) => {
  try {
    const docRef = await addDoc(collection(db, 'todos'), newTodo);
    console.log('Todo added with ID:', docRef.id);
  } catch (e) {
    console.error('Error adding todo:', e);
  }
};

// Update an existing todo in Firestore
export const updateTodo = async (id, updatedTodo) => {
  const todoRef = doc(db, 'todos', id);
  await updateDoc(todoRef, updatedTodo);
};

// Delete a todo from Firestore
export const deleteTodo = async (id) => {
  const todoRef = doc(db, 'todos', id);
  await deleteDoc(todoRef);
};

export { db };

