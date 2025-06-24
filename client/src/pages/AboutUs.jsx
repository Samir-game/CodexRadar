import React from 'react';
import './AboutUs.css'; // Optional: Create this file if you want to style
import { FaHeart } from "react-icons/fa";
const AboutUs = () => {
  return (
    <div>
      <div className="about-container">
        <h1>About CodexRadar</h1>
        <p>
          CodexRadar is a student progress tracking system that helps 
          users monitor and analyze their performance on Codeforces.
          Whether you're preparing for competitiveprogramming contests or
          just solving problems to improve,
          CodexRadar keeps everything organized and visual.
        </p>

        <h2>Key Features</h2>
        <ul>
          <li>📊 Detailed analytics of solved problems and contest performance</li>
          <li>📅 Daily sync of Codeforces data for up-to-date tracking</li>
          <li>📈 Visual charts to help track growth over time</li>
          <li>📬 Email reminders for upcoming contests and inactivity alerts</li>
        </ul>

        <h2>Our Mission</h2>
        <p>
          We aim to empower students and programming enthusiasts by providing tools that 
          offer insights into their coding journey. By making progress visible, 
          we hope to boost motivation, discipline, and a love for problem-solving.
        </p>

        <h2>Made With 💻</h2>
        <p>
          This project is built using the MERN stack and integrates directly with the Codeforces API to ensure accurate and real-time data. 
          It’s designed by developer, for developer.
        </p>
      </div>
      <p className='made-by'>
        Made By: Samir Game <FaHeart style={{ color: 'red', fontSize: '1.2rem' }} />
      </p>
    </div>
  );
};

export default AboutUs;
