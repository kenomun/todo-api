const db = require('../database/db');

exports.createTask = (req, res) => {
  const { titulo, descripcion } = req.body;

  if (!titulo || titulo.length > 100) {
    return res.status(400).json({ error: 'El título es obligatorio y debe tener máximo 100 caracteres.' });
  }

  if (descripcion && descripcion.length > 500) {
    return res.status(400).json({ error: 'La descripción debe tener máximo 500 caracteres.' });
  }

  const sql = `
    INSERT INTO tasks (titulo, descripcion)
    VALUES (?, ?)
  `;

  db.run(sql, [titulo, descripcion || null], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Error al crear la tarea.' });
    }

    // Devolver la tarea creada
    const nuevaTarea = {
      id: this.lastID,
      titulo,
      descripcion: descripcion || null,
      status: 'pendiente',
      fechaCreacion: new Date().toISOString(),
      fechaActualizacion: new Date().toISOString()
    };

    res.status(201).json(nuevaTarea);
  });
};

exports.getAllTasks = (req, res) => {
  const sql = 'SELECT * FROM tasks ORDER BY fechaCreacion DESC';

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener las tareas.' });
    }

    res.json(rows);
  });
};
