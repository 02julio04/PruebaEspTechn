import { useEffect, useState } from 'react';

export default function useListTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 // Obtener tareas de API
    useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
        .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
        })
        .then((data) => setTasks(data))
        .catch((err) => setError(err.message || 'Something went wrong'))
        .finally(() => setLoading(false));
    }, []);

    // Add nueva tarea
  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  // Marcar tarea como completada
  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    toggleComplete,
  };
}
