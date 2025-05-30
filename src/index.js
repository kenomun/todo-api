const express = require('express');
const cors = require('cors');
const db = require('./database/db');
const taskRoutes = require('./routes/tasks.routes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Conexion exitosa ✅');
});

app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
