import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      return;
    }
    // mock user (replace with API later)
    setUser({ name: "Juan Dela Cruz", wallet: 5200 });
  }, [navigate]);

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">4J</h2>
        <nav className="nav">
          <button className="nav-btn">Home</button>
          <button className="nav-btn">Learn & Earn</button>
          <button className="nav-btn">Goals</button>
          <button className="nav-btn">Credit</button>
          <button className="nav-btn">Refer</button>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main">
        {/* Wallet */}
        <section className="wallet-card">
          <h3>My Wallet</h3>
          <p className="balance">₱ {user?.wallet.toLocaleString()}.00</p>
          <div className="wallet-actions">
            <button className="action-btn">Top Up</button>
            <button className="action-btn">Send</button>
            <button className="action-btn freeze">Freeze</button>
          </div>
        </section>

        {/* Goals */}
        <section className="section">
          <h3>Goals / Wishlist</h3>
          <div className="goal-list">
            <div className="goal-item">
              <span>🎯 Emergency Fund</span>
              <span>₱300 / ₱50,000</span>
            </div>
            <div className="goal-item">
              <span>🎮 Nintendo Switch</span>
              <span>₱300 / ₱50,000</span>
            </div>
            <div className="goal-item">
              <span>✈️ Trip to Singapore</span>
              <span>₱300 / ₱50,000</span>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="section">
          <h3>Recent Activities</h3>
          <ul className="activity-list">
            <li>
              Received money from <b>Kevin Santos</b> —{" "}
              <span className="text-green">₱200.00</span>
            </li>
            <li>
              Sent money to <b>Piximperfect</b> —{" "}
              <span className="text-red">₱100.00</span>
            </li>
          </ul>
        </section>

        {/* Extra Widgets */}
        <section className="widgets">
          <div className="widget-card">
            <h4>💹 Money Tracker</h4>
            <p>Plan your cash flow today</p>
          </div>
          <div className="widget-card">
            <h4>🎁 Earn ₱200</h4>
            <p>Invite friends to BPI Bayanihan</p>
          </div>
          <div className="widget-card">
            <h4>📚 Level Up by Learning</h4>
            <p>Finish modules to grow your financial literacy</p>
          </div>
        </section>
      </main>
    </div>
  );
}
