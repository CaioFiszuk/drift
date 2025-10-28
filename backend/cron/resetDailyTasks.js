const cron = require("node-cron");
const Task = require("../models/Task");

cron.schedule("0 0 * * *", async () => {
  try {
    const result = await Task.updateMany(
      {
        "repeat.frequency": "daily",
        status: { $in: ["done", "in_progress"] }
      },
      { $set: { status: "pending" } }
    );

    console.log(`[CRON] ${new Date().toISOString()} → ${result.modifiedCount} tasks reseted successfully.`);
  } catch (err) {
    console.error("[CRON] cannot reset daily tasks", err);
  }
});
