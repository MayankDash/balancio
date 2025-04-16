// src/pages/LandingPage.jsx
import React from "react";
import "../styles/LandingPage.css";
import Navbar from "../components/NavigationBar"; // Make sure the path is correct

const LandingPage = () => {
  return (
    <div className="landing">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Financial Clarity, Powered by AI</h1>
          <p>
            Balancio helps early-stage startups automate tax compliance,
            bookkeeping, and reporting. Focus on growth while we simplify your
            financial journey.
          </p>
          <a href="#signup" className="cta-button">
            Get Started Free
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="container">
          <h2>Why Balancio?</h2>
          <p>
            Balancio is your AI-powered financial companion. We eliminate the
            burden of admin tasks so you can scale faster, smarter, and with
            confidence.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Our Key Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>AI Tax Compliance</h3>
              <p>
                Real-time, automated tax calculations & alerts to keep you
                compliant.
              </p>
            </div>

            <div className="feature-card">
              <h3>Smart Bookkeeping</h3>
              <p>
                Auto-categorize expenses and eliminate manual entries with ease.
              </p>
            </div>

            <div className="feature-card">
              <h3>Insightful Dashboards</h3>
              <p>
                Real-time cash flow, profits, and trends to guide better
                decisions.
              </p>
            </div>

            <div className="feature-card">
              <h3>Regulatory Compliance</h3>
              <p>Stay audit-ready with built-in compliance and tracking.</p>
            </div>

            <div className="feature-card">
              <h3>Cash Flow Forecasting</h3>
              <p>Plan ahead with AI-powered financial projections.</p>
            </div>

            <div className="feature-card">
              <h3>Real-Time Notifications</h3>
              <p>
                Stay informed of every critical change in your financial health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Join hundreds of startups simplifying finance</h2>
          <p>
            Start your journey with Balancio today and make smarter financial
            decisions.
          </p>
          <a href="#signup" className="cta-button cta-secondary">
            Sign Up Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
