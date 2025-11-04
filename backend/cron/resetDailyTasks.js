const cron = require("node-cron");
const Task = require("../models/Task");

cron.schedule("0 0 * * *", async () => {
  try {
    const result = await Task.updateMany(
      {
        "frequency.mode": "diaria",
        status: { $in: ["feito", "em_progresso"] }
      },
      { $set: { status: "pendente" } }
    );

    console.log(`[CRON] ${new Date().toISOString()} → ${result.modifiedCount} tasks reseted successfully.`);
  } catch (err) {
    console.error("[CRON] cannot reset daily tasks", err);
  }
});
