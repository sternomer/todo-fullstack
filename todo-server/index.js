const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let tasks = [];
let nextId = 1;

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  const newTask = { id: nextId++, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/tasks/:id/toggle', (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (task) {
    task.completed = !task.completed;
    res.json(task);
  } else {
    res.status(404).send({ error: 'Task not found' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== Number(req.params.id));
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});