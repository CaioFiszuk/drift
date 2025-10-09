const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const tasksRoutes = require('./routes/tasks');
const usersRoutes = require('./routes/users');
const auth = require('./middlewares/auth');

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/drift")
.then(()=>{
  console.log("Database is successfully connected");
});

const { PORT = 3000 } = process.env;

app.use(function (req, res, next) {

  if (req.originalUrl === '/users/signin' || req.originalUrl === '/users/signup') {
    return next();
  } else {
    return auth(req, res, next);
  }
});

app.use('/tasks', tasksRoutes);
app.use('/users', usersRoutes);

app.use((err, req, res, next) => {
   console.log("err:" + err)

  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => console.log(`O servidor está rodando na porta: ${PORT}`));