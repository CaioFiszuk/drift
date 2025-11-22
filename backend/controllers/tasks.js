const Task = require('../models/task');

module.exports.createTask = async (req,res) => {
  try {
    const { title, frequency, isMandatory, moodTag } = req.body;
    const userId = req.user.id;

    const newTask = new Task({
      userId,
      title,
      frequency,
      isMandatory,
      moodTag,
    });

    await newTask.save();

    res.status(201).json(newTask);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Cannot create a Task" });
  }
}

module.exports.getAllTasks = async (req,res) => {
  try {
    const userId = req.user.id;
    const task = await Task.find({userId: userId});

    return res.status(200).send(task);

  } catch(error) {
    return res.status(500).send({ message: "Server Error" });
  }
}

module.exports.getTasksByMood = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({userId, moodTag: 'bad', isMandatory: false});

    return res.status(200).send(tasks);

  }catch(error) {
    return res.status(500).send({ message: "Server Error" });
  }
}

module.exports.getFixedTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ userId, "frequency.mode": { $in: ["data fixa"] }});
    return res.status(200).send(tasks);

  }catch(error) {
    return res.status(500).send({ message: "Server Error" });
  }
}

module.exports.getIdeas = async (req, res) => {
    try {
    const userId = req.user.id;
    const tasks = await Task.find({ userId, "frequency.mode": { $in: ["ideia"] }});
    return res.status(200).send(tasks);

  }catch(error) {
    return res.status(500).send({ message: "Server Error" });
  }
}

module.exports.deleteTask = async (req,res) => {
    try {
    const { taskId } = req.params;

    const task = await Task.findByIdAndDelete(taskId);

    return res.status(200).send(task);

  } catch(error) {
    return res.status(500).send({ message: "Server Error" });
  }
}

module.exports.updateTask = async (req,res) => {
    try {
    const { taskId } = req.params;
    const { title, frequency, moodTag, isMandatory } = req.body;

    const task = await Task.findByIdAndUpdate(
      taskId,
      {
        title,
        frequency,
        moodTag,
        isMandatory
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).send(task);

  } catch(error) {
    return res.status(500).send({ message: "Server Error" });
  }
}

module.exports.updateStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is missing" });
    }

    const update = { status, updatedAt: new Date() };

    if (status === "feito") {
      update.lastCompletedAt = new Date();
    }

    const task = await Task.findByIdAndUpdate(taskId, update, { new: true });

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    return res.status(200).send(task);

  } catch(error) {
    return res.status(500).send({ message: "Server Error" });
  }
}