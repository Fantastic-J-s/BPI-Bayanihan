import React, { useState } from "react";
import "./auth.css";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  async function handleSubmit(e) {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await fetch("http://127.0.0.1:8000/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.detail || `Login failed (${res.status})`);
    }

    const data = await res.json();
    console.log("✅ Login success:", data);

    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);

    alert("Login successful!");
    setShowLogin(false);

    // redirect to dashboard
    navigate("/home");
  } catch (err) {
    console.error(err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="page">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">Logo</div>
        <nav>
          <a href="#">Home Page</a>
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
          <div className="more">
            <span>More Links ▾</span>
          </div>
        </nav>
        <div className="nav-actions">
          <button className="btn help">Help</button>
          <button className="btn more" onClick={() => setShowLogin(true)}>
            Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            Bayanihan Ledger: <br />
            Your Path to <br />
            Financial Empowerment
          </h1>
          <p>
            Join us in transforming financial literacy through engaging
            gamification. Bayanihan Ledger empowers communities to save, learn,
            and thrive together.
          </p>
          <div className="cta-buttons">
            <button className="btn primary">Learn More</button>
            <button
              className="btn secondary"
              onClick={() => setShowLogin(true)}
            >
              Sign Up / Login
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1616627986427-3673d299c4c9?auto=format&fit=crop&w=600&q=80"
            alt="Community empowerment"
          />
        </div>
      </section>

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Login</h2>

            {/* Error message at the top */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  className="btn primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => setShowLogin(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
