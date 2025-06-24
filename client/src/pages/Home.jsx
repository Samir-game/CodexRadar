import { useEffect, useState } from "react";
import axios from "axios";
import ContestTable from "../components/ContestTable.jsx";
import RatingGraph from "../components/RatingGraph.jsx";
import SolvedPerDayChart from "../components/SolvedPerDayChart.jsx";
import RatingBucketChart from "../components/RatingBucketChart.jsx";
import "./Home.css";

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [showContest, setShowContest] = useState(false);
  const [showProblems, setShowProblems] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_HOME_API, {
          withCredentials: true,
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error.message);
      }
    };

    fetchUserInfo();
  }, []);

  if (!userInfo) return <p className="loading-text">Loading...</p>;

  const { userName, userEmail, userCFInfo } = userInfo;
  const {
    codeForcesHandle,
    currentRating,
    maxRating,
    currentRank,
    maxRank,
    titlePhoto,
    lastSyncedAt,
    contestHistory,
    problemSolved,
  } = userCFInfo;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  return (
    <div className="home-container">
      <div className="profile-header">
        <img src={titlePhoto} alt="User" className="profile-photo" />
        <div className="profile-info">
          <h2 className="user-name">{userName}</h2>
          <p className="user-email">{userEmail}</p>
          <p><strong>Codeforces Handle:</strong> {codeForcesHandle}</p>
          <p className="last-synced">
            <strong>Last Synced:</strong> {formatDate(lastSyncedAt)}
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="label">Current Rating</p>
          <p className="value">{currentRating}</p>
        </div>
        <div className="stat-card">
          <p className="label">Max Rating</p>
          <p className="value">{maxRating}</p>
        </div>
        <div className="stat-card">
          <p className="label">Current Rank</p>
          <p className="value">{currentRank}</p>
        </div>
        <div className="stat-card">
          <p className="label">Max Rank</p>
          <p className="value">{maxRank}</p>
        </div>
        <div className="stat-card">
          <p className="label">Total Solved</p>
          <p className="value">{problemSolved.totalSolved}</p>
        </div>
        <div className="stat-card">
          <p className="label">Avg Rating Solved</p>
          <p className="value">{problemSolved.averageRating}</p>
        </div>
        <div className="stat-card">
          <p className="label">Highest Rating Solved</p>
          <p className="value">{problemSolved.highestRatingSolved}</p>
        </div>
      </div>

      <div className="toggle-section">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={showContest}
            onChange={() => {
              setShowContest(!showContest);
              if (showProblems && !showContest) setShowProblems(false); 
            }}
          />
          Show Contest History
        </label>

        {!showContest && (
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={showProblems}
              onChange={() => setShowProblems(!showProblems)}
            />
            Show Problem Solving History
          </label>
        )}
      </div>

      <div className="chart-section">
        {showContest && (
          <>
            <ContestTable data={contestHistory.contestData} />
            <RatingGraph data={contestHistory.ratingGraph} />
            <div className="toggle-section-bottom">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={showProblems}
                  onChange={() => setShowProblems(!showProblems)}
                />
                Show Problem Solving History
              </label>
            </div>
          </>
        )}

        {showProblems && (
          <>
            <SolvedPerDayChart data={problemSolved.solvedPerday} />
            <RatingBucketChart data={problemSolved.ratingBucket} />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
