const Task = require('../models/task');

module.exports.createTask = async (req,res) => {
  try {
     const { title, type, frequency, daysOfWeek, moodTag, isMandatory } = req.body;

    if (!title || !type || !frequency || !moodTag || isMandatory === undefined) {
      return res.status(400).send({ message: "Invalid Data" });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).send({ message: "Unauthorized: user not found" });
    }

    const task = await Task.create({
      userId,
      title,
      type,
      repeat: {
        frequency,
        daysOfWeek: Array.isArray(daysOfWeek) ? daysOfWeek : []
      },
      moodTag,
      isMandatory,
    });

    return res.status(201).send(task);

  } catch(error) {
    return res.status(500).send({ message: "Server Error" });
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
    const tasks = await Task.find({userId: userId, moodTag: 'bad', isMandatory: false});

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
    const { title, type, frequency, daysOfWeek, moodTag, isMandatory } = req.body;

    const task = await Task.findByIdAndUpdate(
      taskId,
      {
        title,
        type,
        repeat: {
          frequency,
          daysOfWeek: Array.isArray(daysOfWeek) ? daysOfWeek : [daysOfWeek]
        },
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

    if (status === "done") {
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