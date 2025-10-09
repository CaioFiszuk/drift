const router = require('express').Router();
const { createTask, getAllTasks, updateTask, deleteTask } = require('../controllers/tasks');

router.post('/', createTask);
router.get('/', getAllTasks);
router.patch('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

module.exports = router;