// src/components/Sidebar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  }

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Toggle Button */}
      <button
        className="toggle-btn"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? "➡️" : "⬅️"}
      </button>

      {/* Logo */}
      <h2 className="sidebar-logo">
        🏦 {!isCollapsed && "Bayanihan"}
      </h2>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <button onClick={() => navigate("/home")}>
          🏠 {!isCollapsed && "Home"}
        </button>
        <button onClick={() => navigate("/dashboard")}>
          📊 {!isCollapsed && "Dashboard"}
        </button>
        <button onClick={() => navigate("/form")}>
          ➕ {!isCollapsed && "Add Goal"}
        </button>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="btn logout" onClick={handleLogout}>
          🚪 {!isCollapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}
