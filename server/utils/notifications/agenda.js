const Agenda = require("agenda");
const {getUpcomingContests} = require("../../controllers/getUpcomingContests.js");
const {getInactiveUsers}= require("../../controllers/getInactiveUsers.js")
const sendContestReminderEmail = require("./sendContestReminderEmail.js");
const sendInactivityReminderEmail = require("./sendInactivityReminderEmail.js");
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
      await sendContestReminderEmail({
        name: user.userName,
        email: user.userEmail,
      }, contest);
    }
  }
});

agenda.define("send inactivity reminders", async () => {
  const inactiveUsers = await getInactiveUsers();
  for (const user of inactiveUsers) {
    await sendInactivityReminderEmail(user, user.daysInactive);
  }
});


const startAgenda = async () => {
  await agenda.start();
  await agenda.every("30 minutes", "send contest reminders");
  await agenda.every("0 10 * * *", "send inactivity reminders");
};

module.exports = startAgenda;
