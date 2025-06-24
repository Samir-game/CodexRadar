import React, { useEffect, useState } from "react";
import axios from "axios";
import SolvedPerDayChart from "../components/SolvedPerDayChart";
import RatingBucketChart from "../components/RatingBucketChart";
import "./ProblemSolvingHistory.css"; 

const ProblemSolvingHistory = () => {
  const [problemData, setProblemData] = useState(null);

  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_HOME_API, {
          withCredentials: true,
        });

        setProblemData(response.data.userCFInfo.problemSolved);
      } catch (error) {
        console.error("Error fetching problem-solving data:", error.message);
      }
    };

    fetchProblemData();
  }, []);

  if (!problemData) {
    return <p className="loading-text">Loading...</p>;
  }

  return (
    <div className="problem-solving-container">
      <h2>Problem Solving History</h2>
      <div className="charts-container">
        <SolvedPerDayChart data={problemData.solvedPerday} />
        <RatingBucketChart data={problemData.ratingBucket} />
      </div>
    </div>
  );
};

export default ProblemSolvingHistory;
