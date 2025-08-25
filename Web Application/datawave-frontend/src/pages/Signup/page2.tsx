import React, { useState } from 'react';
import './page1.css';

export default function BPIBayanihanPage2() {
  const [currentStep, setCurrentStep] = useState(2);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const totalSteps = 6;

  const languages = [
    { id: 'english', name: 'English', native: 'English' },
    { id: 'filipino', name: 'Filipino', native: 'Filipino' },
    { id: 'cebuano', name: 'Cebuano', native: 'Binisaya' },
    { id: 'ilocano', name: 'Ilocano', native: 'Ilocano' }
  ];

  const handleBack = () => {
    // Navigate to page 1
    window.location.href = '/page1';
  };

  const handleContinue = () => {
    if (selectedLanguage) {
      // Navigate to page 3
      window.location.href = '/page3';
    }
  };

  const handleLanguageSelect = (languageId) => {
    setSelectedLanguage(languageId);
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
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20"/>
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
          {/* Globe icon */}
          <div className="bpi-heart-container">
            <svg className="bpi-heart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20"/>
            </svg>
          </div>

          {/* Title */}
          <h1 className="bpi-title">
            Choose Your Language
          </h1>

          {/* Subtitle */}
          <p className="bpi-subtitle">
            Select the language you're most comfortable with
          </p>

          {/* Language options */}
          <div className="bpi-language-list">
            {languages.map((language) => (
              <div 
                key={language.id}
                className={`bpi-language-option ${selectedLanguage === language.id ? 'selected' : ''}`}
                onClick={() => handleLanguageSelect(language.id)}
              >
                <div className="bpi-language-text">
                  <div className="bpi-language-name">{language.name}</div>
                  <div className="bpi-language-native">{language.native}</div>
                </div>
                {selectedLanguage === language.id && (
                  <div className="bpi-language-check">
                    <svg className="bpi-check-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                )}
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
            className={`bpi-continue-button ${!selectedLanguage ? 'disabled' : ''}`}
            disabled={!selectedLanguage}
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