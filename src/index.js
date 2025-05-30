const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const db = require('./database/db');
const taskRoutes = require('./routes/tasks.routes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});


app.use(cors());
app.use(express.json());
app.use('/tasks', taskRoutes);
app.set('io', io);


app.get('/', (req, res) => {
    res.send('Conexion exitosa ✅');
});

io.on('connection', (socket) => {
    console.log('🔌 Cliente WebSocket conectado');
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
