import React from 'react';
import './page1.css';

export default function BPIBayanihanPage6() {
  const totalSteps = 6;
  const currentStep = 6;

  // Change this to wherever you want to land after onboarding
  const START_ROUTE = '/home2';

  const handleBack = () => {
    window.location.href = '/page5';
  };
  
  const handleStart = () => {
    window.location.href = START_ROUTE;
  };

  return (
    <div className="bpi-container">
      <div className="bpi-card">
        {/* Header */}
        <div className="bpi-header">
          <div className="bpi-header-content">
            <div className="bpi-logo">
              <span className="bpi-logo-text">B</span>
            </div>
            <span className="bpi-brand-text">BPI Bayanihan</span>
          </div>
        </div>

        {/* Progress */}
        <div className="bpi-progress-section">
          <div className="bpi-progress-header">
            <div className="bpi-progress-header-left">
              <svg className="bpi-progress-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20 6l-11 11-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>You’re All Set!</span>
            </div>
            <span>Step {currentStep} of {totalSteps}</span>
          </div>
          <div className="bpi-progress-bar">
            <div className="bpi-progress-fill" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Main */}
        <div className="bpi-main-content">
          {/* Green success circle */}
          <div className="bpi-heart-container bpi-shield-icon-container" aria-hidden="true">
            <svg className="bpi-heart-icon bpi-shield-icon" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" />
              <path d="M16 9l-5 6-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 className="bpi-title">You’re All Set!</h1>
          <p className="bpi-subtitle">Welcome to your financial journey with BPI Bayanihan</p>

          {/* Next steps box */}
          <div className="bpi-success-box">
            <div className="bpi-success-heading">Next Steps:</div>
            <ul className="bpi-success-list">
              <li>Complete your verification checklist</li>
              <li>Set your first savings goal</li>
              <li>Take your first financial lesson</li>
              <li>Make your initial deposit</li>
            </ul>
          </div>

          {/* Nav */}
          <div className="bpi-navigation">
            <button onClick={handleBack} className="bpi-back-button">
              <svg className="bpi-nav-icon" viewBox="0 0 24 24" fill="none">
                <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Back</span>
            </button>

            <button onClick={handleStart} className="bpi-continue-button">
              <span>Get Started</span>
              <svg className="bpi-nav-icon" viewBox="0 0 24 24" fill="none">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
