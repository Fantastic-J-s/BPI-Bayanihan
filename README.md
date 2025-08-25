# BPI-Bayanihan

A progressive web application (PWA) and analytics platform designed to advance financial inclusion in the Philippines. Inspired by the Bayanihan spirit, BPI Datawave delivers context‑aware, personalized financial literacy, gamified savings, and barangay‑level analytics to help communities build healthier savings habits.

---

## Abstract

Financial inclusion remains a recurring concern that various banks and economic institutions need to consider. Despite digitalization, financial institutions struggle to make their services and innovation available to the public. The Philippines has the weakest financial inclusion coverages, as shown by the minimal account penetration in traditional banking of the Philippines adult population. Inspired by the Filipino Bayanihan System, we confront this exclusivity and challenges by developing a context-aware and personalized digital banking solution. Built around diverse Filipino personas, the platform will introduce localized financial literacy to support a more inclusive, resilient, and human-centric banking ecosystem, through modular learning and gamified savings integration. Along with our innovative platform, we are building a database and financial analytics relevant in understanding Filipino savings behavior, profile inter-barangay savings performance, financial services accessibility, and national-level educational database platform for potential demographic-economic-behavioral studies.

---

## Core Features

* **Barangay-Based Registration & Profiling**
  Barangay ID verification + optional socio‑economic profile for personalization.

* **Digital Wallet for Savings**
  No minimum deposit; wallet tiers unlock rewards as milestones are reached. Optional “freeze savings” to encourage discipline.

* **Savings Score (Pilot)**
  Simple, transparent scoring for consistent saving; visible to users and, if approved, used by BPI systems as signal for access to products.

* **Learning Module Lite**
  Modular, bite‑sized lessons (EN/Tagalog). Completion unlocks Tier 1 rewards.

* **Analytics Dashboard (Internal)**
  Adoption, retention, savings patterns, and inter‑barangay performance.

* **Referral & Incentives**
  Community‑driven growth with verified engagement incentives.

* **Smart Prompts & Nudges**
  Context‑aware reminders and streaks to support consistent saving.

---

## Architecture

### Frontend (PWA)

* React.js (plain JavaScript), React Router, custom CSS
* Offline capable via service worker + caching strategies
* Talks to FastAPI via versioned REST (`/v1`)

### Backend (API)

* FastAPI + SQLAlchemy + Pydantic v2
* Auth: JWT (email/password); Google sign‑in planned
* DB: SQLite (dev) → PostgreSQL (staging/prod)
* Versioned endpoints: `/v1/auth`, `/v1/barangays`, `/v1/wallet`

### Data & Analytics

* Aggregations for barangay/user cohorts
* Extensible for education datasets & demographic‑economic studies

---

## Tech Stack

* **Frontend:** React 18, React Router, Vite, custom CSS *(no Tailwind/shadcn)*
* **Backend:** FastAPI, SQLAlchemy, Pydantic v2, Uvicorn
* **Database:** SQLite (dev), PostgreSQL (Neon/Supabase for cloud)
* **Auth:** JWT (HS256)
* **Tooling:** ESLint, Prettier, Black, Ruff, isort, pytest, React Testing Library
* **CI/CD (example):** GitHub Actions
* **Hosting (example):** Frontend (Vercel/Netlify or S3+CloudFront), API (Render/Railway or AWS ECS/Beanstalk), DB (Neon/Supabase/Aurora)

> **Not in use:** Tailwind, shadcn, React Native, TypeScript, Node.js for the backend, or MongoDB.

---

## Getting Started

### Prerequisites

* **Node.js:** 20.x LTS
  If `.nvmrc` is present: `nvm use`

  > If your machine has Node **17.x**, please install Node **20.x LTS** to avoid toolchain and PWA plugin issues.
* **Python:** 3.10+ (recommended 3.11)
* **PostgreSQL:** 14+ (staging/prod). Dev uses SQLite by default.
* **Git**, **Make** (optional)

### Quick Setup

```bash
# Clone
git clone <repo-url> bpi-datawave
cd bpi-datawave

# Frontend
cd frontend
npm ci
cp .env.example .env        # set API base URL, etc.

# Backend
cd ../backend
python -m venv .venv
# Windows: .venv\Scripts\activate
source .venv/bin/activate
pip install -r requirements.txt
cp ../.env.example .env     # fill backend env vars
```

---

## Environment Variables

### Frontend (`frontend/.env`)

> If using CRA instead of Vite, replace `VITE_` with `REACT_APP_`.

```ini
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=BPI Datawave
VITE_PWA_ENABLE=true
```

### Backend (`backend/.env`)

```ini
# SQLite (dev)
DATABASE_URL=sqlite:///./datawave.db

# PostgreSQL (staging/prod) example
# DATABASE_URL=postgresql+psycopg://user:pass@host:5432/datawave

JWT_SECRET=change_me
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

BACKEND_CORS_ORIGINS=http://localhost:5173,http://localhost:3000
ENV=development
```

---

## Running Locally

### Backend

```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
# Open: http://localhost:8000/docs
```

### Frontend (Vite)

```bash
cd frontend
npm run dev
# Open: http://localhost:5173
```

---

## Database & Migrations

We use SQLite in development and PostgreSQL in staging/production. Migrations are managed with **Alembic**.

```bash
# initialize (first time)
cd backend
alembic upgrade head

# create new migration from models
alembic revision --autogenerate -m "add wallet ledger constraints"

# apply migration
alembic upgrade head

# downgrade (if needed)
alembic downgrade -1
```

---

## Seeding Dev Data

```bash
cd backend
python scripts/init_db.py
python scripts/seed.py
# Seeds: barangays, demo users (test@example.com), demo wallets/ledger entries
```

---

## API Quickstart

**Base URL:** `http://localhost:8000`

### Auth

**POST** `/v1/auth/register`

```json
{ "email": "test@example.com", "password": "password123" }
```

**POST** `/v1/auth/login`

```json
{ "email": "test@example.com", "password": "password123" }
```

**Response**

```json
{ "access_token": "<JWT>", "token_type": "bearer" }
```

Include `Authorization: Bearer <JWT>` for protected routes.

### Barangays

* **GET** `/v1/barangays` → list barangays
* **GET** `/v1/barangays/{id}` → details

### Wallet

**POST** `/v1/wallet/deposit`

```json
{ "wallet_id": 1, "amount": 200.00 }
```

**POST** `/v1/wallet/withdraw`

```json
{ "wallet_id": 1, "amount": 50.00 }
```

**GET** `/v1/wallet/balance?wallet_id=1`

```json
{ "wallet_id": 1, "balance": 150.00 }
```

*Tip:* Import the Postman collection in `docs/postman/BPI-Datawave.postman_collection.json`.

---

## PWA Notes

* `manifest.json` and icons are in `frontend/public/`.
* Service worker registered by Vite PWA plugin or a custom SW.
* Cache static assets and select API responses (idempotent GETs).
* “Add to Home Screen” prompts on Android; offline fallback for Learning Module Lite.

---

## Testing

### Backend

```bash
cd backend
pytest -q
```

### Frontend

```bash
cd frontend
npm test
# React Testing Library + Vitest/Jest (depending on setup)
```

---

## Code Quality

* **JavaScript:** ESLint + Prettier (`npm run lint`, `npm run format`)
* **Python:** Black, isort, Ruff (`make lint` or run individually)
* Recommended: **pre-commit hooks**

---

## Commit Style & Versioning

* **Conventional Commits** (e.g., `feat: add wallet freeze flag`, `fix: correct JWT expiry`).
* **SemVer** for releases.

---

## Security & Privacy

* Keep secrets in environment variables or your platform’s secret manager; **never commit secrets**.
* JWT tokens are short‑lived; refresh flow **TBD**.
* CORS restricted to allowed origins.
* Aligns with RA 10173 (Data Privacy Act of 2012) principles; collect only necessary PII.
* Basic rate‑limit & brute‑force mitigation recommended at the API layer (WAF/CDN or app middleware).
* Follow BSP guidance for digital banking and AMLA considerations for suspicious activity monitoring (roadmap).

---

## Accessibility & Localization

* WCAG‑minded color contrast and keyboard navigation.
* EN/Tagalog first, with locale packs extensible for regional dialects.

---

## Deployment

### Frontend

* Vercel/Netlify or AWS S3 + CloudFront
* Set `VITE_API_BASE_URL` (production)
* Ensure PWA headers and service worker files are served correctly

### Backend

* Render/Railway or AWS ECS/Fargate / Elastic Beanstalk
* Set `DATABASE_URL`, `JWT_SECRET`, `BACKEND_CORS_ORIGINS`
* Use PostgreSQL (Neon/Supabase/AWS RDS)
* Run Alembic migrations on deploy

### Environment Matrix

* **Dev:** SQLite, local Uvicorn/Vite
* **Staging/Prod:** Postgres, managed hosting, CI migrations

---

## Roadmap

* Google Sign‑In (OAuth 2.0)
* Savings Score v2 (behavioral signals, explainability)
* Learning Module content packs + offline bundles
* Barangay analytics with cohort retention & anomaly flags
* Admin back‑office (approvals, refunds, manual adjustments)
* SMS/Email notifications (cost‑aware strategy)
* Data catalog & education dataset APIs
* Rate limiting + audit trails
* Mobile install & offline UX polish
