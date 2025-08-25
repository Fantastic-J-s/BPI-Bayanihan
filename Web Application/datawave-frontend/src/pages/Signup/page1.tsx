import React, { useState } from 'react';
import './page1.css';

export default function BPIBayanihanWelcome() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const handleContinue = () => {
    // Navigate to page 2
    window.location.href = '/page2';
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
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

        {/* Progress bar */}
        <div className="bpi-progress-section">
          <div className="bpi-progress-header">
            <svg className="bpi-progress-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>Step {currentStep} of {totalSteps}</span>
          </div>
          <div className="bpi-progress-bar">
            <div 
              className="bpi-progress-fill"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main content */}
        <div className="bpi-main-content">
          {/* Heart icon */}
          <div className="bpi-heart-container">
            <svg className="bpi-heart-icon" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>

          {/* Title */}
          <h1 className="bpi-title">
            Welcome to BPI Bayanihan
          </h1>

          {/* Subtitle */}
          <p className="bpi-subtitle">
            Your journey to financial wellness starts here
          </p>

          {/* Features list */}
          <div className="bpi-features-container">
            <h3 className="bpi-features-title">What you'll get:</h3>
            <div className="bpi-features-list">
              <div className="bpi-feature-item">
                <div className="bpi-feature-bullet"></div>
                <span>Safe and secure savings platform</span>
              </div>
              <div className="bpi-feature-item">
                <div className="bpi-feature-bullet"></div>
                <span>Community-powered financial support</span>
              </div>
              <div className="bpi-feature-item">
                <div className="bpi-feature-bullet"></div>
                <span>Educational resources in your language</span>
              </div>
              <div className="bpi-feature-item">
                <div className="bpi-feature-bullet"></div>
                <span>Goal-based savings with rewards</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="bpi-navigation">
          <button 
            onClick={handleBack}
            className="bpi-back-button"
            disabled={currentStep === 1}
          >
            <svg className="bpi-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>

          <button 
            onClick={handleContinue}
            className="bpi-continue-button"
          >
            <span>Continue</span>
            <svg className="bpi-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}