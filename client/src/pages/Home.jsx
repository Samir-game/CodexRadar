import { useEffect, useState } from "react";
import axios from "axios";
import ContestChart from "../components/ContestChart";
import ProblemSolvingChart from "../components/ProblemSolvingChart";
import "./Home.css"

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [showContest, setShowContest] = useState(false);
  const [showProblems, setShowProblems] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_HOME_API}`, {
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
      </div>

      <div className="checkbox-section">
        <label>
          <input
            type="checkbox"
            checked={showContest}
            onChange={() => setShowContest(!showContest)}
          />
          Show Contest History
        </label>

        <label>
          <input
            type="checkbox"
            checked={showProblems}
            onChange={() => setShowProblems(!showProblems)}
          />
          Show Problem Solving History
        </label>
      </div>

      <div className="chart-section">
        {showContest && <ContestChart data={contestHistory} />}
        {showProblems && <ProblemSolvingChart data={problemSolved} />}
      </div>
    </div>
  );
};

export default Home;
