import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);

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
    problemSolved,
  } = userCFInfo;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
      return date.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata'
      });
  };

  return (
    <div className="home-container">
      <div className="profile-header">
        <img src={titlePhoto} alt="User" className="profile-photo" />
        <div className="profile-info">
          <h2 className="user-name">{userName}</h2>
          <p className="user-email">{userEmail}</p>
          <p><strong>Handle:</strong> {codeForcesHandle}</p>
          <p className="last-synced"><strong>Last Synced:</strong> {formatDate(lastSyncedAt)}</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><p className="label">Current Rating</p><p className="value">{currentRating}</p></div>
        <div className="stat-card"><p className="label">Max Rating</p><p className="value">{maxRating}</p></div>
        <div className="stat-card"><p className="label">Current Rank</p><p className="value">{currentRank}</p></div>
        <div className="stat-card"><p className="label">Max Rank</p><p className="value">{maxRank}</p></div>
        <div className="stat-card"><p className="label">Total Solved</p><p className="value">{problemSolved.totalSolved}</p></div>
        <div className="stat-card"><p className="label">Avg Rating Solved</p><p className="value">{problemSolved.averageRating}</p></div>
        <div className="stat-card"><p className="label">Highest Rating Solved</p><p className="value">{problemSolved.highestRatingSolved}</p></div>
      </div>
    </div>
  );
};

export default Home;
