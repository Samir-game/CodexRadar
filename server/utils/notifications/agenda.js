const Agenda= require("agenda");
const {getUpcomingContests}= require("../../controllers/getUpcomingContests.js");
const {getInactiveUsers}= require("../../controllers/getInactiveUsers.js");
const sendContestReminderEmail= require("./sendContestReminderEmail.js");
const sendInactivityReminderEmail= require("./sendInactivityReminderEmail.js");
const User= require("../../models/user.model.js");
require("dotenv").config();

const agenda = new Agenda({
  db: { address: process.env.MONGODB_URI, collection: "agendaJobs" },
});


agenda.define("send inactivity reminders",async()=>{
  
  console.log("Starting inactivity reminder job");
  const inactiveUsers=await getInactiveUsers();
  for(const user of inactiveUsers){
    try {
      await sendInactivityReminderEmail(user);
    } catch (error) {
      console.log(`Failed to send inactivity email to ${user.userEmail}:`,error.message);
    }
  }
  console.log("Inactivity reminder job finished.");
});


agenda.define("send reminder for one contest",async(job)=>{
  const {contest}=job.attrs.data;

  const users=await User.find({
    codeforcesHandle: {$exists:true, $ne:""},
  }).select("userName userEmail");

  for(const user of users){
    try {
      await sendContestReminderEmail(user,contest);
    } catch (error) {
      console.error(`Failed to email ${user.userEmail}:`,error.message);
    }
  }
  console.log(`Sent reminder for contest: ${contest.name}`);
});


agenda.define("schedule contest reminder jobs",async()=>{
  console.log("Scheduling contest reminder jobs");

  const contests=await getUpcomingContests();

  for (const contest of contests) {
    const reminderTime=new Date(contest.startTimeSeconds*1000 - 3*60*60*1000);

    const existing=await agenda.jobs({
      name:"send reminder for one contest",
      "data.contest.id":contest.id,
    });

    if (existing.length === 0) {
      await agenda.schedule(reminderTime, "send reminder for one contest",{contest});
      console.log(`Scheduled:${contest.name} at ${reminderTime}`);
    } else {
      console.log(`Already scheduled:${contest.name}`);
    }
  }

  console.log("Finished scheduling contests.");
});


const startAgenda = async () => {
  await agenda.start();
  await agenda.every("0 2 * * *", "schedule contest reminder jobs"); 
  await agenda.every("0 10 * * *", "send inactivity reminders");
};

module.exports = startAgenda;
