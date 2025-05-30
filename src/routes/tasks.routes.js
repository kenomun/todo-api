const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks.controller');

router.post('/', tasksController.createTask);
router.get('/', tasksController.getAllTasks);
router.put('/:id', tasksController.updateTaskStatus);



module.exports = router;
