import React, { useState } from 'react';
import './page1.css';

export default function BPIBayanihanPage4() {
  const [currentStep, setCurrentStep] = useState(4);
  const [selectedMethod, setSelectedMethod] = useState('');
  const totalSteps = 6;

  const verificationMethods = [
    {
      id: 'camera',
      title: 'Scan with Camera',
      description: 'Take a photo of your ID',
      icon: 'camera',
      primary: true
    },
    {
      id: 'upload',
      title: 'Upload Photo',
      description: 'Choose from your gallery',
      icon: 'upload'
    },
    {
      id: 'manual',
      title: 'Enter Manually',
      description: 'Type your ID information',
      icon: 'edit'
    }
  ];

  const handleBack = () => {
    window.location.href = '/page3';
  };

  const handleContinue = () => {
    if (selectedMethod) {
      window.location.href = '/page5';
    }
  };

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
  };

  const renderIcon = (iconType) => {
    switch (iconType) {
      case 'camera':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
        );
      case 'upload':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7,10 12,15 17,10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        );
      case 'edit':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
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
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
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
          {/* Shield icon */}
          <div className="bpi-heart-container bpi-shield-icon-container">
            <svg className="bpi-heart-icon bpi-shield-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>

          {/* Title */}
          <h1 className="bpi-title">
            Verify Your Identity
          </h1>

          {/* Subtitle */}
          <p className="bpi-subtitle">
            Choose how you'd like to verify your ID
          </p>

          {/* Verification methods */}
          <div className="bpi-verification-list">
            {verificationMethods.map((method) => (
              <div 
                key={method.id}
                className={`bpi-verification-option ${selectedMethod === method.id ? 'selected' : ''} ${method.primary ? 'primary' : ''}`}
                onClick={() => handleMethodSelect(method.id)}
              >
                <div className="bpi-verification-icon">
                  {renderIcon(method.icon)}
                </div>
                <div className="bpi-verification-content">
                  <div className="bpi-verification-title">{method.title}</div>
                  <div className="bpi-verification-description">{method.description}</div>
                </div>
                {selectedMethod === method.id && (
                  <div className="bpi-language-check">
                    <svg className="bpi-check-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Security note */}
          <div className="bpi-security-note">
            <svg className="bpi-info-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
            </svg>
            <span>Your information is encrypted and secure. We only use this for verification.</span>
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
            className={`bpi-continue-button ${!selectedMethod ? 'disabled' : ''}`}
            disabled={!selectedMethod}
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