import React, { useState } from 'react';
import './page1.css';

export default function BPIBayanihanPage3() {
  const [currentStep, setCurrentStep] = useState(3);
  const [selectedUserType, setSelectedUserType] = useState('');
  const totalSteps = 6;

  const userTypes = [
    {
      id: 'barangay-resident',
      title: 'Barangay Resident',
      description: 'Individual looking to save and build financial stability',
      features: ['Personal savings goals', 'Community support', 'Financial education'],
      icon: 'user'
    },
    {
      id: 'barangay-officer',
      title: 'Barangay Officer',
      description: "Community leader supporting residents' financial wellness",
      features: ['Community insights', 'Resident support tools', 'Progress tracking'],
      icon: 'clipboard'
    },
    {
      id: 'national-policymaker',
      title: 'National Policymaker',
      description: 'Government official monitoring financial inclusion',
      features: ['National analytics', 'Policy insights', 'Impact measurement'],
      icon: 'chart'
    },
    {
      id: 'system-administrator',
      title: 'System Administrator',
      description: 'Technical professional managing platform infrastructure',
      features: ['System monitoring', 'Data analytics', 'Performance insights'],
      icon: 'settings'
    }
  ];

  const handleBack = () => {
    window.location.href = '/page2';
  };

  const handleContinue = () => {
    if (selectedUserType) {
      window.location.href = '/page4';
    }
  };

  const handleUserTypeSelect = (userTypeId) => {
    setSelectedUserType(userTypeId);
  };

  const renderIcon = (iconType) => {
    switch (iconType) {
      case 'user':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        );
      case 'clipboard':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
          </svg>
        );
      case 'chart':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 3v18h18"/>
            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
          </svg>
        );
      case 'settings':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
          </svg>
        );
      default:
        return null;
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
            <svg className="bpi-progress-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
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
          {/* User icon */}
          <div className="bpi-heart-container bpi-user-icon-container">
            <svg className="bpi-heart-icon bpi-user-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>

          {/* Title */}
          <h1 className="bpi-title">
            Tell Us About You
          </h1>

          {/* Subtitle */}
          <p className="bpi-subtitle">
            This helps us customize your experience
          </p>

          {/* User type options */}
          <div className="bpi-user-type-list">
            {userTypes.map((userType) => (
              <div 
                key={userType.id}
                className={`bpi-user-type-option ${selectedUserType === userType.id ? 'selected' : ''}`}
                onClick={() => handleUserTypeSelect(userType.id)}
              >
                <div className="bpi-user-type-header">
                  <div className="bpi-user-type-icon">
                    {renderIcon(userType.icon)}
                  </div>
                  <div className="bpi-user-type-content">
                    <div className="bpi-user-type-title">{userType.title}</div>
                    <div className="bpi-user-type-description">{userType.description}</div>
                  </div>
                  {selectedUserType === userType.id && (
                    <div className="bpi-language-check">
                      <svg className="bpi-check-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="bpi-user-type-features">
                  {userType.features.map((feature, index) => (
                    <span key={index} className="bpi-feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="bpi-navigation">
          <button 
            onClick={handleBack}
            className="bpi-back-button"
          >
            <svg className="bpi-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>

          <button 
            onClick={handleContinue}
            className={`bpi-continue-button ${!selectedUserType ? 'disabled' : ''}`}
            disabled={!selectedUserType}
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