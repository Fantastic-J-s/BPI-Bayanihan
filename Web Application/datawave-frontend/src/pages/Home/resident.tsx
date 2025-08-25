import React from 'react';
import './home.css';

type Txn = {
  id: string;
  name: string;
  tag: 'Income' | 'Food' | 'Savings' | 'Transfer' | 'Bills';
  amount: number;               // positive = inflow, negative = outflow
  date: string;                 // ISO or pretty
};

export default function ResidentHome() {
  const user = { name: 'Maria', tier: 'Gold Saver', streakDays: 7 };
  const totals = { balance: 15750, lifetime: 45230, creditScore: 78 };

  const transactions: Txn[] = [
    { id: 't1', name: 'Salary Deposit', tag: 'Income', amount: +25000, date: '2024-01-15' },
    { id: 't2', name: 'Grocery Shopping', tag: 'Food', amount: -1250, date: '2024-01-14' },
    { id: 't3', name: 'Emergency Fund', tag: 'Savings', amount: -5000, date: '2024-01-13' },
    { id: 't4', name: 'Auto Deposit', tag: 'Savings', amount: -1000, date: '2024-01-12' },
  ];

  const fmt = (n: number) =>
    `₱${Math.abs(n).toLocaleString('en-PH')}`;

  const go = (path: string) => (window.location.href = path);

  return (
    <div className="bpi-resident">
      {/* Topbar */}
      <header className="bpi-topbar">
        <div className="bpi-topbar-left">
          <div className="bpi-logo"><span className="bpi-logo-text">B</span></div>
          <div className="bpi-topbar-meta">
            <div className="bpi-topbar-title">BPI Bayanihan</div>
            <div className="bpi-topbar-sub">Financial Inclusion Platform</div>
          </div>
        </div>
        <div className="bpi-topbar-right">
          <button className="bpi-chip" onClick={() => go('/roles')}>Barangay Resident</button>
          <button className="bpi-ghost">Switch Role</button>
        </div>
      </header>

      {/* Greeting */}
      <section className="bpi-greeting">
        <div className="bpi-avatar">MS</div>
        <div className="bpi-greet-text">
          <div className="bpi-greet-title">Good morning, {user.name}</div>
          <div className="bpi-greet-row">
            <span className="bpi-badge gold">Gold Saver</span>
            <span className="bpi-dot-sep">•</span>
            <span className="bpi-streak">{user.streakDays} day streak</span>
          </div>
        </div>
        <div className="bpi-action-inline">
          <button className="bpi-small danger" onClick={() => go('/deposit')}>Save Now</button>
        </div>
      </section>

      {/* Nudges */}
      <div className="bpi-nudge">
        You’re ₱200 away from your weekly goal! ✨
      </div>

      {/* Wallet banner */}
      <section className="bpi-wallet">
        <div className="bpi-wallet-top">
          <div className="bpi-wallet-title">Total Savings</div>
          <div className="bpi-credit">
            <span className="bpi-credit-score">{totals.creditScore}</span>
            <span className="bpi-credit-label">Credit Score</span>
          </div>
        </div>

        <div className="bpi-wallet-amount">{fmt(totals.balance)}</div>
        <div className="bpi-wallet-sub">Lifetime Saved: {fmt(totals.lifetime)}</div>

        <div className="bpi-wallet-actions">
          <WalletAction icon="plus" label="Deposit" onClick={() => go('/deposit')} />
          <WalletAction icon="send" label="Send Money" onClick={() => go('/send')} />
          <WalletAction icon="transfer" label="Transfer" onClick={() => go('/transfer')} />
          <WalletAction icon="freeze" label="Freeze" onClick={() => alert('Card frozen (demo)')} />
        </div>
      </section>

      {/* Feature grid (2 x 3) */}
      <div className="bpi-feature-grid">
        <FeatureCard
          icon="target"
          title="Set Your Dreams in Motion"
          desc="Save up for a vocation, a car or anything else you've been dreaming of."
          meta="2 active goals"
          cta="Start a Goal"
          onClick={() => go('/goals/new')}
        />
        <FeatureCard
          icon="chartUp"
          title="Smarter Spending Insights"
          desc="Track daily expenses, spot patterns, and discover ways to save."
          meta="₱2,360 saved this month"
          cta="Manage My Savings"
          onClick={() => go('/statistics')}
        />
        <FeatureCard
          icon="graduation"
          title="Learn Smart Banking"
          desc="Master financial basics with interactive lessons in your local language."
          meta="12 lessons completed"
          cta="Start Learning"
          onClick={() => go('/learn')}
        />
        <FeatureCard
          icon="heart"
          title="Community Success"
          desc="Read inspiring stories from your community and share your own journey."
          meta="24 new stories this week"
          cta="Explore Stories"
          onClick={() => go('/community')}
        />
        <FeatureCard
          icon="gift"
          title="Invite Friends"
          desc="Get ₱100 for every successful referral with deposit."
          meta="₱500 earned"
          cta="Invite Friends"
          onClick={() => go('/invite')}
        />
        <FeatureCard
          icon="help"
          title="Need More Help"
          desc="Get support via message, chat, call, or FAQ."
          meta="24/7 support available"
          cta="Get Help"
          onClick={() => go('/support')}
        />
      </div>

      {/* Green banner */}
      <div className="bpi-banner-green">
        <div className="bpi-banner-green-left">
          <div className="bpi-banner-title">Auto Deposit</div>
          <div className="bpi-banner-sub">
            Set up automatic savings to reach your goals faster
            <span className="bpi-banner-hint"> • Weekly, Bi-weekly, or Monthly • ₱100 minimum</span>
          </div>
        </div>
        <button className="bpi-small success" onClick={() => go('/auto-deposit')}>
          Set Up Auto Deposit
        </button>
      </div>

      {/* Community Support (simple list row) */}
      <div className="bpi-list-row">
        <div className="bpi-list-icon"><Icon name="users" /></div>
        <div className="bpi-list-content">
          <div className="bpi-list-title">Community Support</div>
          <div className="bpi-list-sub">Join Bayaniihan savings circles with your neighbors</div>
        </div>
      </div>

      {/* This Week's Progress */}
      <section className="bpi-week">
        <div className="bpi-week-title">This Week’s Progress</div>
        <div className="bpi-week-grid">
          <ProgressBox tone="green"  value={fmt(1250)} label="Saved" />
          <ProgressBox tone="blue"   value="3"         label="Lessons" />
          <ProgressBox tone="purple" value="85%"       label="Goal Progress" />
          <ProgressBox tone="amber"  value="120"       label="Points Earned" />
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="bpi-tx">
        <div className="bpi-tx-head">
          <div className="bpi-tx-title">Recent Transactions</div>
          <button className="bpi-link" onClick={() => go('/transactions')}>View All</button>
        </div>
        <ul className="bpi-tx-list">
          {transactions.map(t => (
            <li key={t.id} className="bpi-tx-item">
              <div className={`bpi-tx-bullet ${t.amount >= 0 ? 'income' : 'expense'}`} />
              <div className="bpi-tx-meta">
                <div className="bpi-tx-name">{t.name}</div>
                <div className="bpi-tx-tag">{t.tag}</div>
              </div>
              <div className={`bpi-tx-amt ${t.amount >= 0 ? 'pos' : 'neg'}`}>
                {t.amount >= 0 ? '+' : '-'}{fmt(t.amount)}
              </div>
              <div className="bpi-tx-date">{t.date}</div>
            </li>
          ))}
        </ul>
      </section>

      {/* Bottom tab bar */}
      <nav className="bpi-tabbar">
        <TabItem label="Home" icon="home" active onClick={() => go('/resident')} />
        <TabItem label="Statistics" icon="stats" onClick={() => go('/statistics')} />
        <TabItem label="Transactions" icon="receipt" onClick={() => go('/transactions')} />
        <TabItem label="Goals" icon="target" onClick={() => go('/goals')} />
        <TabItem label="Profile" icon="user" onClick={() => go('/profile')} />
      </nav>
    </div>
  );
}

/* ---------- Small components ---------- */

function WalletAction({ icon, label, onClick }:{ icon: IconName; label: string; onClick: () => void }) {
  return (
    <button className="bpi-wallet-act" onClick={onClick}>
      <Icon name={icon} />
      <span>{label}</span>
    </button>
  );
}

function FeatureCard({
  icon, title, desc, meta, cta, onClick
}: {
  icon: IconName; title: string; desc: string; meta?: string; cta: string; onClick: () => void;
}) {
  return (
    <div className="bpi-feature-card">
      <div className="bpi-feature-head">
        <div className="bpi-feature-icon"><Icon name={icon} /></div>
        <div className="bpi-feature-title">{title}</div>
      </div>
      <p className="bpi-feature-desc">{desc}</p>
      {meta && <div className="bpi-feature-meta">{meta}</div>}
      <button className="bpi-feature-cta" onClick={onClick}>{cta}</button>
    </div>
  );
}

function ProgressBox({ tone, value, label }:{ tone: 'green'|'blue'|'purple'|'amber'; value: string; label: string }) {
  return (
    <div className={`bpi-progress-box ${tone}`}>
      <div className="bpi-progress-value">{value}</div>
      <div className="bpi-progress-label">{label}</div>
    </div>
  );
}

function TabItem({ label, icon, active, onClick }:{
  label: string; icon: IconName; active?: boolean; onClick: () => void;
}) {
  return (
    <button className={`bpi-tab ${active ? 'active' : ''}`} onClick={onClick}>
      <div className="bpi-tab-icon"><Icon name={icon} /></div>
      <div className="bpi-tab-label">{label}</div>
    </button>
  );
}

type IconName =
  | 'plus' | 'send' | 'transfer' | 'freeze'
  | 'users' | 'target' | 'chartUp' | 'graduation' | 'gift' | 'help'
  | 'home' | 'stats' | 'receipt' | 'user';

function Icon({ name }:{ name: IconName }) {
  switch (name) {
    case 'plus': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round"/></svg>;
    case 'send': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 2L11 13" strokeWidth="2"/><path d="M22 2l-7 20-4-9-9-4 20-7z" strokeWidth="2"/></svg>;
    case 'transfer': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M7 7h11l-3-3M17 17H6l3 3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'freeze': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2v20M4 6l16 12M20 6L4 18" strokeWidth="2" strokeLinecap="round"/></svg>;
    case 'users': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="8" r="3"/><path d="M2 20c0-3 4-5 7-5s7 2 7 5"/><path d="M14 15c2.5 0 6 1.5 6 5"/></svg>;
    case 'target': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 2v2M2 12h2M20 12h2M12 20v2"/></svg>;
    case 'chartUp': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 20V6"/><path d="M20 20H4"/><path d="M6 12l4-4 3 3 5-5"/></svg>;
    case 'graduation': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M2 7l10-4 10 4-10 4-10-4z"/><path d="M6 10v5a6 3 0 0012 0v-5"/></svg>;
    case 'gift': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="2" y="7" width="20" height="15" rx="2"/><path d="M12 7v15M2 12h20"/><path d="M12 7c-3 0-4-3-2.5-4S12 5 12 5s2-4 4.5-2S15 7 12 7z"/></svg>;
    case 'help': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 115.8 1c0 2-3 2-3 4"/><circle cx="12" cy="17" r="1"/></svg>;
    case 'home': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12l9-9 9 9"/><path d="M9 21V9h6v12"/></svg>;
    case 'stats': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="4" y="10" width="4" height="10"/><rect x="10" y="6" width="4" height="14"/><rect x="16" y="3" width="4" height="17"/></svg>;
    case 'receipt': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 2h12v20l-3-2-3 2-3-2-3 2z"/><path d="M8 6h8M8 10h8M8 14h6"/></svg>;
    case 'user': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>;
    default: return null;
  }
}
