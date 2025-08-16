import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/"); // back to login
  }

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>🏦 Bayanihan Ledger</h1>
        <button className="btn logout" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="home-main">
        <h2>Welcome back!</h2>
        <p>Your path to financial empowerment starts here.</p>

        <div className="home-actions">
          <button className="btn primary" onClick={() => navigate("/form")}>
            ➕ Add Savings Goal
          </button>
          <button className="btn secondary" onClick={() => navigate("/dashboard")}>
            📊 View Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}
