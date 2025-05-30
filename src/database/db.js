const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta absoluta a la base de datos
const dbPath = path.resolve(__dirname, 'tasks.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error al conectar con SQLite:', err.message);
  } else {
    console.log('✅ Conectado a la base de datos SQLite');
  }
});

// Crear tabla si no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL CHECK(length(titulo) <= 100),
      descripcion TEXT CHECK(length(descripcion) <= 500),
      status TEXT DEFAULT 'pendiente',
      fechaCreacion TEXT DEFAULT (datetime('now')),
      fechaActualizacion TEXT DEFAULT (datetime('now'))
    )
  `);
});

module.exports = db;
