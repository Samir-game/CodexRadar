const Agenda = require("agenda");
const getUpcomingContests = require("./getUpcomingContests.js");
const sendReminderEmail = require("./sendReminderEmail.js");
const User = require("../../models/user.model.js");
require("dotenv").config();

const agenda = new Agenda({
  db: { address: process.env.MONGODB_URI, collection: "agendaJobs" },
});

agenda.define("send contest reminders", async () => {
  const contests = await getUpcomingContests();
  if (contests.length === 0) return;

  const users = await User.find({
    codeforcesHandle: { $exists: true, $ne: "" },
  }).select("userName userEmail");

  for (const user of users) {
    for (const contest of contests) {
      await sendReminderEmail({
        name: user.userName,
        email: user.userEmail,
      }, contest);
    }
  }
});

const startAgenda = async () => {
  await agenda.start();
  await agenda.every("30 minutes", "send contest reminders");
};

module.exports = startAgenda;
