const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = (req, res, next) => {

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {

    return res
      .status(401)
      .send({ message: 'You Are Not Authorized' });
  }


  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {

    const err = new Error('Not Authorized');
    err.statusCode = 403;

    return next(err);
  }

  req.user = payload;

  next();
};