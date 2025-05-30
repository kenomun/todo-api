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

    // Emitir evento WebSocket
    const io = req.app.get('io');
    io.emit('newTask', nuevaTarea);

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


const estadosPermitidos = ['pendiente', 'completada'];
exports.updateTaskStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !estadosPermitidos.includes(status)) {
    return res.status(400).json({ error: 'Estado inválido. Debe ser "pendiente" o "completada".' });
  }

  const fechaActualizacion = new Date().toISOString();
  const sql = `
    UPDATE tasks
    SET status = ?, fechaActualizacion = ?
    WHERE id = ?
  `;

  db.run(sql, [status, fechaActualizacion, id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al actualizar el estado de la tarea.' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada.' });
    }

    // Emitir evento WebSocket
    const io = req.app.get('io');
    io.emit('taskUpdated', { id: parseInt(id), status });

    res.json({ message: 'Tarea actualizada correctamente', id: parseInt(id), status });
  });
};



exports.deleteTask = (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM tasks WHERE id = ?`;

  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar la tarea.' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada.' });
    }

    // Emitir evento WebSocket si la tarea se elimina correctamente
    const io = req.app.get('io');
    io.emit('taskDeleted', { id: parseInt(id) });

    res.json({ message: 'Tarea eliminada correctamente', id: parseInt(id) });
  });
};
