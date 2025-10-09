const router = require('express').Router();
const { getUser, createUser, login } = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', createUser);

router.get('/me', getUser);

module.exports = router;