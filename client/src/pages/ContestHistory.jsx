import React, { useEffect, useState } from "react";
import axios from "axios";
import ContestTable from "../components/ContestTable";
import RatingGraph from "../components/RatingGraph";
import "./ContestHistory.css"; // Optional styling

const ContestHistory = () => {
  const [contestData, setContestData] = useState(null);

  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_HOME_API, {
          withCredentials: true,
        });

        setContestData(response.data.userCFInfo.contestHistory);
      } catch (error) {
        console.error("Error fetching contest data:", error.message);
      }
    };

    fetchContestData();
  }, []);

  if (!contestData) return <p className="loading-text">Loading...</p>;

  return (
    <div className="contest-history-container">
      <h2>Contest History</h2>
      <ContestTable data={contestData.contestData} />
      <br/>
      <h2>Rating Over Time</h2>
      <RatingGraph data={contestData.ratingGraph} />
    </div>
  );
};

export default ContestHistory;
