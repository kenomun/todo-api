const express = require('express');
const cors = require('cors');
const path = require('path');
const taskRoutes = require('./routes/tasks.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Servir frontend estático
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
