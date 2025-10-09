const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getUser = (req, res, next) => {

  if (!req.user || !req.user.id) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  User.findById(req.user.id)
  .orFail(()=>{
    const error = new Error('There is no such user');
    error.statusCode = 404;
    throw error;
  })
  .then(user => res.send({ data: user }))
  .catch(next);
};

module.exports.createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Este e-mail já foi cadastrado." });
    }

    if (!email || !password) {
      return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    res.status(201).json({ message: "Usuário cadastrado com sucesso!", data: newUser });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const nonExistingUser = await User.findOne({ email });
    if (!nonExistingUser) {
      return res.status(400).json({ message: "Este e-mail não está cadastrado." });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      const error = new Error('E-mail ou senha incorretos');
      error.statusCode = 401;
      throw error;
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      const error = new Error('E-mail ou senha incorretos');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, "uY8n3+PqWz5jZxQfVbG2sL1mT4oN7dJcR9KX6A0MZFY=", { expiresIn: '7d' });

    return res.status(200).json({ token, isAdmin: user.isAdmin });

  } catch (err) {
    next(err);
  }
}
