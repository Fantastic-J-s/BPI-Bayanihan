import React from 'react';
import './home.css';

type RoleKey = 'resident' | 'officer' | 'policymaker' | 'engineer';

export default function Home2() {
  const ROLE_ROUTES: Record<RoleKey, string> = {
    resident: '/resident',
    officer: '/officer/home',
    policymaker: '/policymaker/home',
    engineer: '/engineer/home',
  };

  const go = (role: RoleKey) => {
    localStorage.setItem('bpi.selectedRole', role);
    window.location.href = ROLE_ROUTES[role];
  };

  return (
    <div className="bpi-landing">
      {/* language pill */}
      <div className="bpi-lang-pill">
        <span>us English</span>
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
      </div>

      {/* logo + title */}
      <div className="bpi-landing-brand">
        <div className="bpi-logo bpi-logo-lg" aria-hidden="true"><span className="bpi-logo-text">B</span></div>
        <h1 className="bpi-landing-title">BPI Bayanihan</h1>
        <p className="bpi-subtitle">Financial Inclusion Platform</p>
        <div className="bpi-select-role">Select Your Role</div>
      </div>

      {/* stats */}
      <div className="bpi-stats-row">
        <div className="bpi-stat">
          <div className="bpi-stat-number">2.8M+</div>
          <div className="bpi-stat-label">Active Users</div>
        </div>
        <div className="bpi-stat">
          <div className="bpi-stat-number">₱15.4B</div>
          <div className="bpi-stat-label">Total Savings</div>
        </div>
        <div className="bpi-stat">
          <div className="bpi-stat-number">1,247</div>
          <div className="bpi-stat-label">Barangays</div>
        </div>
      </div>

      {/* role cards */}
      <div className="bpi-roles-grid">
        <RoleCard
          icon="user"
          title="Barangay Resident"
          status="Active"
          desc="Save money, learn financial skills, and achieve your goals"
          cta="Continue as Barangay Resident"
          onClick={() => go('resident')}
        />
        <RoleCard
          icon="badge"
          title="Barangay Officer"
          status="Active"
          desc="Support your community and track collective progress"
          cta="Continue as Barangay Officer"
          onClick={() => go('officer')}
        />
        <RoleCard
          icon="chart"
          title="National Policymaker"
          status="Active"
          desc="Monitor national financial inclusion metrics"
          cta="Continue as National Policymaker"
          onClick={() => go('policymaker')}
        />
        <RoleCard
          icon="cloud"
          title="Cloud Engineer"
          status="Active"
          desc="Manage system infrastructure and data analytics"
          cta="Continue as Cloud Engineer"
          onClick={() => go('engineer')}
        />
      </div>

      {/* why choose */}
      <div className="bpi-why-card">
        <h2>Why Choose BPI Bayanihan?</h2>
        <div className="bpi-why-grid">
          <WhyItem icon="wallet" title="Savings" subtitle="Smart & Secure" />
          <WhyItem icon="target" title="Goals" subtitle="Achievement-Based" />
          <WhyItem icon="book"   title="Learn"  subtitle="Interactive & Fun" />
          <WhyItem icon="users"  title="Community" subtitle="Social & Competitive" />
        </div>

        <p className="bpi-why-foot">
          Join <strong>2.8 million+</strong> Filipinos building their financial future
        </p>
        <div className="bpi-dots" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
        </div>
        <div className="bpi-why-subfoot">Your community is waiting</div>
      </div>
    </div>
  );
}

/* ---------- Small presentational components ---------- */
function RoleCard({
  icon, title, status, desc, cta, onClick,
}: {
  icon: 'user'|'badge'|'chart'|'cloud',
  title: string, status: 'Active' | string, desc: string, cta: string,
  onClick: () => void
}) {
  return (
    <div className="bpi-role-card">
      <div className="bpi-role-header">
        <div className={`bpi-role-icon`} aria-hidden="true">
          <Icon name={icon} />
        </div>
        <div className="bpi-role-meta">
          <div className="bpi-role-title">{title}</div>
          <div className="bpi-role-status">
            <span className="bpi-dot"></span>{status}
          </div>
        </div>
      </div>
      <p className="bpi-role-desc">{desc}</p>
      <button className="bpi-role-btn" onClick={onClick}>
        {cta}
      </button>
    </div>
  );
}

function WhyItem({ icon, title, subtitle }: { icon: IconName; title: string; subtitle: string; }) {
  return (
    <div className="bpi-why-item">
      <div className="bpi-why-icon" aria-hidden="true"><Icon name={icon} /></div>
      <div className="bpi-why-text">
        <div className="bpi-why-title">{title}</div>
        <div className="bpi-why-subtitle">{subtitle}</div>
      </div>
    </div>
  );
}

type IconName = 'user'|'badge'|'chart'|'cloud'|'wallet'|'target'|'book'|'users';
function Icon({ name }: { name: IconName }) {
  switch (name) {
    case 'user':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>;
    case 'badge':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2l3 3h5v5l3 3-3 3v5h-5l-3 3-3-3H4v-5l-3-3 3-3V5h5l3-3z"/></svg>;
    case 'chart':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 19V5"/><path d="M20 19H4"/><rect x="6" y="10" width="3" height="7"/><rect x="11" y="7" width="3" height="10"/><rect x="16" y="12" width="3" height="5"/></svg>;
    case 'cloud':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M7 18a4 4 0 010-8 5 5 0 019.6-1.5A4.5 4.5 0 1118 18H7z"/></svg>;
    case 'wallet':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M16 12h2"/></svg>;
    case 'target':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 2v2M2 12h2M20 12h2M12 20v2"/></svg>;
    case 'book':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 19a2 2 0 002 2h12V5a2 2 0 00-2-2H6a2 2 0 00-2 2z"/><path d="M6 17h12"/></svg>;
    case 'users':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="8" r="3"/><path d="M2 20c0-3 4-5 7-5s7 2 7 5"/><path d="M14 15c2.5 0 6 1.5 6 5"/></svg>;
    default:
      return null;
  }
}
