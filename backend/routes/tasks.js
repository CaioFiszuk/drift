const router = require('express').Router();
const { createTask, getAllTasks, updateTask, deleteTask, getTasksByMood } = require('../controllers/tasks');

router.post('/', createTask);
router.get('/', getAllTasks);
router.get('/mood', getTasksByMood);
router.patch('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

module.exports = router;