const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

let todos = [
  { id: 1, task: "Come pancito", completed: false },
  { id: 2, task: "A volar", completed: false }
];

// Ruta para la raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la API TODO');
});

// GET (Leer todas las tareas)
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST (Crear una nueva tarea)
app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT (Actualizar una tarea)
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const updatedTodo = req.body;
  todos = todos.map(todo => todo.id == id ? updatedTodo : todo);
  res.json(updatedTodo);
});

// DELETE (Eliminar una tarea)
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id != id);
  res.status(204).end();
});

app.listen(3000, () => {
  console.log('API is running on http://localhost:3000');
});
