import React, { useState } from "react";
import "./home.css";
import Sidebar from "../../components/Sidebar";

export default function Home() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="layout">
      <Sidebar isCollapsed={isCollapsed} />

      <div className="home-content">
        {/* Toggle button */}
        <button 
          className="collapse-btn" 
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "➡️" : "⬅️"}
        </button>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-text">
            <h2>Empowering Financial Inclusion Through Gamification</h2>
            <p>
              Unlock your financial potential today. Save smarter, track your
              progress, and join a supportive community.
            </p>
            <button className="btn primary">➕ Get Started</button>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1616627986427-3673d299c4c9?auto=format&fit=crop&w=600&q=80"
              alt="Empowerment"
            />
          </div>
        </section>

        {/* Features */}
        <section className="features">
          <h2>Unlock Your Financial Potential</h2>
          <div className="feature-list">
            <div className="feature-card">
              <h3>📚 Learn & Earn</h3>
              <p>Explore interactive financial literacy modules.</p>
            </div>
            <div className="feature-card">
              <h3>💰 Track Savings</h3>
              <p>Save more with goal-setting and progress tracking.</p>
            </div>
            <div className="feature-card">
              <h3>🤝 Community</h3>
              <p>Join our referral program and grow together.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <h2>Ready to take control of your savings?</h2>
          <p>
            Start your journey with Bayanihan Ledger and achieve your financial
            goals step by step.
          </p>
          <div className="cta-actions">
            <button className="btn primary">📊 View Dashboard</button>
            <button className="btn secondary">➕ Add Goal</button>
          </div>
        </section>

        {/* Footer */}
        <footer className="home-footer">
          <p>© {new Date().getFullYear()} Bayanihan Ledger. Built for financial empowerment.</p>
        </footer>
      </div>
    </div>
  );
}
