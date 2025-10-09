const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  title: {
    type: String,
    required: true,
    trim: true
  },

  type: {
    type: String,
    enum: ["single", "project"],
    default: "single"
  },

  repeat: {
    frequency: {
      type: String,
      enum: ["daily", "weekly", "casual"],
      default: "daily"
    },
    daysOfWeek: [Number]
  },

dueDate: {
  type: Date,
  default: function() {
    return this.repeat.frequency === "casual" ? new Date() : null;
  }
},

  parentTaskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    default: null
  },

  parentTask: {
    type: Object,
    default: null
  },

  moodTag: {
    type: String,
    enum: ["good", "bad"],
    default: null
  },

  isMandatory: {
    type: Boolean,
    default: false
  },

  status: {
    type: String,
    enum: ["pending", "in_progress", "done"],
    default: "pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

taskSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  next();
});

taskSchema.pre(/^find/, function(next) {
  this.populate("parentTaskId");
  next();
});

taskSchema.virtual("parentTask").get(function() {
  return this.parentTaskId;
});

module.exports = mongoose.model("Task", taskSchema);
