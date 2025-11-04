const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  frequency: {
    mode: {
      type: String,
      enum: ["diaria", "diaria com exceção", "semanal", "quinzenal", "data fixa", "data fixa adiavel"],
      default: "diaria",
    },

    exceptDays: {
      type: [Number],
      default: [],
    },

    dayOfWeek: {
      type: Number,
      default: null,
    },

    dueDate: {
      type: Date,
      default: null,
    },
  },

  status: {
    type: String,
    enum: ["pendente", "em_progresso", "feito"],
    default: "pendente",
  },

  isMandatory: {
    type: Boolean,
    default: false,
  },

  moodTag: {
    type: String,
    enum: ["good", "bad"],
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

taskSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.models.Task || mongoose.model("Task", taskSchema);
