// utils/cronJobs.js
const cron = require("node-cron");
const Match = require("../models/Match");

// Every minute — upcoming → live
cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    const updated = await Match.updateMany(
      { status: "upcoming", scheduledAt: { $lte: now } },
      { $set: { status: "live" } }
    );
    if (updated.modifiedCount > 0)
      console.log(`🔴 ${updated.modifiedCount} match(es) went LIVE`);
  } catch (err) {
    console.error("Cron error:", err.message);
  }
});