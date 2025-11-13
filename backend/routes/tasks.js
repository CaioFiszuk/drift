const router = require('express').Router();
const { createTask, getAllTasks, updateTask, deleteTask, getTasksByMood, getFixedTasks, updateStatus } = require('../controllers/tasks');

router.post('/', createTask);
router.get('/', getAllTasks);
router.get('/mood', getTasksByMood);
router.get('/fixed', getFixedTasks);
router.patch('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);
router.patch('/:taskId/status', updateStatus);

module.exports = router;