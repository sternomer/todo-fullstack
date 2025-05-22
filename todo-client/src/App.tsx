import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from "lucide-react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3001/tasks')
      .then((res) => setTasks(res.data))
      .catch(() => setError('⚠️ Failed to connect to server'))
      .finally(() => setLoading(false));
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) {
      setError('Task title cannot be empty');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (tasks.some((t) => t.title === newTask.trim())) {
      setError('Task already exists');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post('http://localhost:3001/tasks', {
        title: newTask.trim(),
      });
      setTasks((prev) => [...prev, res.data]);
      setNewTask('');
      setSuccess('Task added successfully');
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      setError('Failed to add task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTask = async (id: number) => {
    const res = await axios.put(`http://localhost:3001/tasks/${id}/toggle`);
    setTasks((prev) => prev.map((task) => (task.id === id ? res.data : task)));
  };

  const deleteTask = async (id: number) => {
    await axios.delete(`http://localhost:3001/tasks/${id}`);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 rounded-xl shadow-xl bg-white transition-all">
      <h1 className="text-2xl font-bold text-center mb-4">ToDo List</h1>

      <div className="flex gap-2 mb-2">
        <input
          className="flex-1 border rounded p-2"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task..."
        />
        <button
          onClick={addTask}
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
        >
          Add
        </button>
      </div>

      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      {success && <div className="text-green-600 text-sm mb-2">{success}</div>}
      {loading && <div className="text-gray-500 text-sm mb-2">Loading tasks...</div>}

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center border p-2 rounded hover:shadow transition"
          >
            <span
              className={`flex-1 cursor-pointer ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}
              onClick={() => toggleTask(task.id)}
            >
              {task.title}
            </span>
            <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700">
  <Trash2 size={18} />
</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
