import React, { useEffect, useMemo, useState } from 'react';
import './page1.css';

type Brgy = { id: number; name: string };

export default function BPIBayanihanPage5() {
  const totalSteps = 6;
  const currentStep = 5;

  // --- HARD-CODED DEFAULT BARANGAY ---
  const HARDCODED_BRGY: Brgy = { id: 1, name: 'Barangay San Roque' };

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    // Preselect the hardcoded barangay so validation passes
    barangayId: String(HARDCODED_BRGY.id),
    occupation: '',
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [barangays, setBarangays] = useState<Brgy[]>([]);
  const [loadingBrgy, setLoadingBrgy] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch barangays and ensure the hardcoded one is present
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoadingBrgy(true);
        const res = await fetch('/v1/barangays');
        const data = await res.json();
        if (!isMounted || !Array.isArray(data)) return;

        let list: Brgy[] = data;
        // Put hardcoded barangay at the top if it's not in the API response
        if (!list.some(b => String(b.id) === String(HARDCODED_BRGY.id))) {
          list = [HARDCODED_BRGY, ...list];
        }
        setBarangays(list);
      } catch {
        // If API fails, still provide the hardcoded option so user can proceed
        setBarangays([HARDCODED_BRGY]);
      } finally {
        setLoadingBrgy(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required';
    if (!form.lastName.trim()) e.lastName = 'Last name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email || '')) e.email = 'Enter a valid email';
    if (!/^\+?\d[\d\s-]{9,}$/.test(form.phone || '')) e.phone = 'Enter a valid phone number';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.barangayId) e.barangayId = 'Please select your barangay';
    if (!form.occupation.trim()) e.occupation = 'Occupation is required';
    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  const setField = (key: string) => (e: any) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const onBlur = (key: string) => () =>
    setTouched((t) => ({ ...t, [key]: true }));

  const handleBack = () => {
    window.location.href = '/page4';
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      firstName: true, lastName: true, email: true, phone: true,
      address: true, barangayId: true, occupation: true,
    });
    if (!isValid) return;
    setSubmitting(true);
    try {
      localStorage.setItem('signup.personalInfo', JSON.stringify(form));
      window.location.href = '/page6';
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bpi-container">
      <div className="bpi-card">
        {/* Header */}
        <div className="bpi-header">
          <div className="bpi-header-content">
            <div className="bpi-logo"><span className="bpi-logo-text">B</span></div>
            <span className="bpi-brand-text">BPI Bayanihan</span>
          </div>
        </div>

        {/* Progress */}
        <div className="bpi-progress-section">
          <div className="bpi-progress-header">
            <div className="bpi-progress-header-left">
              <svg className="bpi-progress-icon" viewBox="0 0 24 24" fill="none">
                <path d="M8 6h8M8 12h8M8 18h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>Personal Information</span>
            </div>
            <span>Step {currentStep} of {totalSteps}</span>
          </div>
          <div className="bpi-progress-bar">
            <div
              className="bpi-progress-fill"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Main */}
        <div className="bpi-main-content">
          <div className="bpi-heart-container" aria-hidden="true">
            <svg className="bpi-heart-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <path d="M14 2v6h6" fill="#fff" opacity="0.35"/>
            </svg>
          </div>

          <h1 className="bpi-title">Personal Information</h1>
          <p className="bpi-subtitle">Complete your profile</p>

          <form className="bpi-form" onSubmit={handleContinue} noValidate>
            <div className="bpi-form-grid">
              <div className="bpi-field">
                <label className="bpi-label" htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  className={`bpi-input ${touched.firstName && errors.firstName ? 'bpi-input-error' : ''}`}
                  placeholder="Enter your first name"
                  value={form.firstName}
                  onChange={setField('firstName')}
                  onBlur={onBlur('firstName')}
                  autoComplete="given-name"
                />
                {touched.firstName && errors.firstName && <p className="bpi-error">{errors.firstName}</p>}
              </div>

              <div className="bpi-field">
                <label className="bpi-label" htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  className={`bpi-input ${touched.lastName && errors.lastName ? 'bpi-input-error' : ''}`}
                  placeholder="Enter your last name"
                  value={form.lastName}
                  onChange={setField('lastName')}
                  onBlur={onBlur('lastName')}
                  autoComplete="family-name"
                />
                {touched.lastName && errors.lastName && <p className="bpi-error">{errors.lastName}</p>}
              </div>
            </div>

            <div className="bpi-field">
              <label className="bpi-label" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className={`bpi-input ${touched.email && errors.email ? 'bpi-input-error' : ''}`}
                placeholder="your.email@example.com"
                value={form.email}
                onChange={setField('email')}
                onBlur={onBlur('email')}
                autoComplete="email"
              />
              {touched.email && errors.email && <p className="bpi-error">{errors.email}</p>}
            </div>

            <div className="bpi-field">
              <label className="bpi-label" htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                inputMode="tel"
                className={`bpi-input ${touched.phone && errors.phone ? 'bpi-input-error' : ''}`}
                placeholder="+63 9XX XXX XXXX"
                value={form.phone}
                onChange={setField('phone')}
                onBlur={onBlur('phone')}
                autoComplete="tel"
              />
              {touched.phone && errors.phone && <p className="bpi-error">{errors.phone}</p>}
            </div>

            <div className="bpi-field">
              <label className="bpi-label" htmlFor="address">Address</label>
              <input
                id="address"
                className={`bpi-input ${touched.address && errors.address ? 'bpi-input-error' : ''}`}
                placeholder="Complete address"
                value={form.address}
                onChange={setField('address')}
                onBlur={onBlur('address')}
                autoComplete="street-address"
              />
              {touched.address && errors.address && <p className="bpi-error">{errors.address}</p>}
            </div>

            <div className="bpi-form-grid">
              <div className="bpi-field">
                <label className="bpi-label" htmlFor="barangayId">Barangay</label>
                <div className="bpi-select-wrapper">
                  <select
                    id="barangayId"
                    className={`bpi-select ${touched.barangayId && errors.barangayId ? 'bpi-input-error' : ''}`}
                    value={form.barangayId}
                    onChange={setField('barangayId')}
                    onBlur={onBlur('barangayId')}
                    disabled={loadingBrgy}
                  >
                    {/* Make sure the hardcoded option exists */}
                    <option value={String(HARDCODED_BRGY.id)}>
                      {HARDCODED_BRGY.name} (Default)
                    </option>
                    <option value="">{loadingBrgy ? 'Loading…' : 'Select your barangay'}</option>
                    {barangays.map((b) => (
                      <option key={b.id} value={String(b.id)}>{b.name}</option>
                    ))}
                  </select>
                </div>
                {touched.barangayId && errors.barangayId && <p className="bpi-error">{errors.barangayId}</p>}
              </div>

              <div className="bpi-field">
                <label className="bpi-label" htmlFor="occupation">Occupation</label>
                <input
                  id="occupation"
                  className={`bpi-input ${touched.occupation && errors.occupation ? 'bpi-input-error' : ''}`}
                  placeholder="Your occupation"
                  value={form.occupation}
                  onChange={setField('occupation')}
                  onBlur={onBlur('occupation')}
                  autoComplete="organization-title"
                />
                {touched.occupation && errors.occupation && <p className="bpi-error">{errors.occupation}</p>}
              </div>
            </div>

            {/* Nav */}
            <div className="bpi-navigation">
              <button type="button" onClick={handleBack} className="bpi-back-button">
                <svg className="bpi-nav-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Back</span>
              </button>

              <button
                type="submit"
                className={`bpi-continue-button ${(!isValid || submitting) ? 'disabled' : ''}`}
                disabled={!isValid || submitting}
              >
                <span>Continue</span>
                <svg className="bpi-nav-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
