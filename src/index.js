const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const db = require('./database/db');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.set('io', io);

io.on('connection', (socket) => {
  console.log('🔌 Cliente WebSocket conectado');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

module.exports = server;
