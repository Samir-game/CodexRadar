# 🚀 CodexRadar

CodexRadar is a full-stack web application that enables users to manage and track their Codeforces competitive programming activity. It periodically fetches and analyzes each user's contest and problem-solving data using scheduled background jobs, visualizes performance with interactive charts, and helps monitor user's growth and inactivity over time.

The platform seamlessly integrates with the official Codeforces API to fetch detailed user data, including contest ratings, ranks, and submission history.

---

## 📌 Key Features

- 🔐 User Authentication with secure HTTP-only cookie-based sessions.
- 📊 Real-time visualizations for:
  - Problem Solving history (Solved Per Day, Rating Buckets)
  - Contest History (Contest performance table, Rating graph)
- 🔄 Automatic Daily Sync using Node-Cron to keep data up-to-date.
- 📧 Email notifications for:
  - Upcoming contests (3 hours before)
  - Inactivity alerts
- ⚙️ Account Settings page (Logout, Delete account)
- 📱 Responsive UI optimized for all devices

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- React Router DOM
- Axios
- Recharts (for charts)
- CSS (responsive, custom design)

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT (for authentication)
- Bcrypt.js (for password hashing)
- Codeforces Official API
- Node-Cron (scheduled background jobs)
- Nodemailer (email notifications)
- Agenda (scheduling Tasks)
---


## 🔧 Setup Instructions

## 🛠️ Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/CodexRadar.git
cd CodexRadar
```

### 2️⃣ Setup Server/Backend
```sh
cd server
npm install
```
```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_TOKEN_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```
```sh
npm start
```


### 3️⃣ Setup Client/Frontend
```sh
cd ../client
npm install
```
```env
VITE_BASE_URL=backend_url
VITE_LOGIN_API=backend_url/api/user/login
VITE_SIGNUP_API=backend_url/api/user/signup
VITE_LOGOUT_API=backend_url/api/user/logout
VITE_DELETE_API=backend_url/api/user/delete
```
```sh
npm run dev
```
