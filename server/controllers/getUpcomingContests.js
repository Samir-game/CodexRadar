const axios= require("axios");

const getUpcomingContests=async()=>{
  try {
    const response=await axios.get(`${process.env.CODEFORCES_CONTEST_LIST}`);
    const contests=response?.data?.result;

    const now=Date.now();
    const targetTime=now + 3*60*60*1000;

    return contests.filter(c =>
      c.phase==="BEFORE" &&
      Math.abs(c.startTimeSeconds*1000-targetTime) <= 15*60*1000
    );
  } catch (error) {
    console.error("Error fetching contests:", error.message);
    return [];
  }
};

module.exports={
  getUpcomingContests
};
