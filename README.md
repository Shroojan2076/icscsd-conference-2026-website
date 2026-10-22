# ICSCSD 2026 — International Conference on Smart Computing for Sustainable Development
### Hosted by Vishwakarma Institute of Technology (VIT), Pune
### Technically Sponsored by IEEE Pune Section
**IEEE Conference Record #67723 | ISBN: 979-8-3315-8953-0**
**Dates**: November 25–27, 2026 | **Venue**: VIT Pune (Bibwewadi Campus) | **Mode**: Hybrid (In-Person & Online)

---

## 1. Project Overview & Architectural Highlights

This repository contains the complete, production-grade full-stack web application for the **International Conference on Smart Computing for Sustainable Development (ICSCSD 2026)**. The project features an editorial academic conference UI/UX inspired by IEEE ICBDS-2026, paired with a custom **100% Pure Vanilla CSS Design System** (Zero Tailwind CSS, Zero CSS Frameworks).

### Key Architectural Pillars:
1. **Zero Tailwind & Pure Vanilla CSS Design System**: Built with modern CSS Custom Properties (`client/src/styles/tokens.css`), fluid `clamp()` typography, intrinsic responsive CSS Grid / Flexbox layouts, and modular BEM stylesheets.
2. **Authoritative IEEE Academic UI/UX**:
   - Institutional Top Utility Strip (`.topbar`) with conference identifiers.
   - Multi-logo Institutional Branding Banner (`.brand-header`) with BRACT, VIT Pune, NAAC A++, and IEEE Pune Section logos.
   - Sticky Dropdown Navigation (`.navbar`) with mobile slide-over drawer and backdrop blur.
   - Live 4-box dynamic Hero Countdown widget ticking to `2026-11-25T09:00:00+05:30`.
   - 4-metric highlight strip (Flagship 2026, 9 Tracks, Hybrid Mode, IEEE Xplore).
   - Numbered Track Cards (`Track 01` to `Track 09`).
3. **Full IEEE ICBDS & ICSCSD Feature Integration**:
   - **Live In-App Registration & Tax Calculator**: Real-time breakdown of Base Fee + 9% CGST + 9% SGST + ₹2,500 Co-Author add-on + 2% Convenience Fee with Razorpay order creation and HMAC verification.
   - **Full 14-Section IEEE Registration Policy Suite**: No-Show Policy, Substitute Presenter rules, Membership/Student reclassification, Visa Support Letters, and Participant Declarations.
   - **Automated Camera-Ready .zip Pre-Flight Validator (`/camera-ready-submission`)**: Inspects `ICSCSD2026-ID_<PaperID>.zip` using `adm-zip` and `pdf-lib` to verify editable source files (.docx / .tex) and strictly enforce the **4–6 page limit**.
   - **Accommodation & Travel Guide (`/accommodation`)**: Hotel cards and Pune attraction cards with road distance badges from the VIT Pune Bibwewadi campus and CC photo attributions.
   - **In-App Proposal Portals**: Interactive submission modals for Pre-Conference Tutorials and Special Sessions with automated PDF uploads.
   - **Author & Admin Consoles**: Lookup registration, download GST tax invoices, request visa support letters, and review committee proposals.

---

## 2. Tech Stack

- **Frontend**: React 18, TypeScript, Vite, TanStack React Query, React Router v6, Lucide React icons.
- **Styling**: 100% Pure Vanilla CSS with CSS Custom Properties and BEM structure (Zero CSS Frameworks).
- **Backend**: Node.js, Express.js, TypeScript, Multer, `adm-zip`, `pdf-lib`, Zod validation, JWT authentication.
- **Database**: PostgreSQL with Prisma ORM + built-in zero-latency in-memory fallback store.
- **DevOps**: Docker, Docker Compose, Nginx.

---

## 3. Directory Structure

```text
├── .gitattributes          # Line ending normalization
├── .gitignore              # Multi-tier ignore rules
├── docker-compose.yml      # Multi-container orchestration (App + Postgres)
├── package.json            # Root workspace scripts
├── LICENSE                 # MIT License
├── README.md               # Documentation
│
├── client/                 # React 18 + Vite Frontend
│   ├── .gitignore
│   ├── src/
│   │   ├── api/            # API client with fallback store
│   │   ├── components/     # Pure CSS UI Components (Navbar, Topbar, Modals, Uploader)
│   │   ├── data/           # High-fidelity fallback conference datasets
│   │   ├── pages/          # All conference page views
│   │   ├── styles/         # Pure Vanilla CSS Design System
│   │   │   ├── tokens.css  # CSS Custom Properties (colors, spacing, typography)
│   │   │   ├── reset.css   # Modern baseline reset & focus rings
│   │   │   ├── layout.css  # Containers and responsive grids
│   │   │   └── components/ # BEM modular stylesheets (hero, navbar, cards, tables, forms...)
│   │   └── types/          # TypeScript interfaces
│   └── vite.config.ts
│
└── server/                 # Express + TypeScript Backend
    ├── .env.example        # Environment variable template
    ├── .gitignore
    ├── prisma/             # Prisma schema and seed scripts
    ├── uploads/            # Runtime storage (.gitkeep preserved)
    │   ├── proposals/
    │   └── submissions/
    └── src/
        ├── config/         # Environment, DB, and seed constants
        ├── controllers/    # Registration, Submission, Public & Admin controllers
        ├── middlewares/    # File upload and auth middlewares
        ├── routes/         # Express REST API routes
        └── services/       # Pricing, Tax Calculator & Zip Validator services
```

---

## 4. Quick Start & Local Execution

### Prerequisites
- Node.js 18+ (tested on v20 / v22)
- npm 9+
- *(Optional)* Docker & Docker Compose (for containerized PostgreSQL)

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/your-username/icscsd-2026.git
cd icscsd-2026

# Install root dependencies
npm install

# Install client and server packages
npm --prefix client install
npm --prefix server install
```

### 2. Configure Environment Variables
Create `server/.env` based on `server/.env.example`:
```bash
cp server/.env.example server/.env
```

Default configuration:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/icscsd2026?schema=public"
JWT_SECRET="icscsd_2026_super_secret_jwt_key_vit_pune"
CORS_ORIGIN="http://localhost:5173"
ADMIN_EMAIL="admin@vit.edu"
ADMIN_PASSWORD="Admin@ICSCSD2026"
```

> **Note on Standalone / Fallback Mode:**
> If PostgreSQL is not running locally, both frontend and backend seamlessly operate using the built-in zero-latency in-memory data store. All 9 tracks, committee members, and pricing services work out of the box!

### 3. Run Locally
Run both client and server concurrently:
```bash
npm run dev
```

- **Frontend Client**: [http://localhost:5173](http://localhost:5173)
- **Backend API Server**: [http://localhost:5000/api](http://localhost:5000/api)

---

## 5. Docker Deployment

To spin up the entire stack using Docker Compose:
```bash
docker-compose up --build
```

---

## 6. Research Tracks & Scope

- **Track 01**: Artificial Intelligence & Machine Learning for Sustainability
- **Track 02**: IoT, Edge & Cloud Computing for Smart Systems
- **Track 03**: Blockchain & Cybersecurity for Sustainable Development
- **Track 04**: Sustainable Smart Cities & Infrastructure
- **Track 05**: Sustainable Healthcare & Biomedical Innovations
- **Track 06**: Renewable Energy & Smart Grid Technologies
- **Track 07**: Data Science & Big Data Analytics for Sustainability
- **Track 08**: Robotics & Automation for Sustainable Industries
- **Track 09**: Communication & Networking for Smart Systems

---

## 7. Submission & Review System

- **Microsoft CMT Submission**: [https://cmt3.research.microsoft.com/ICSCSD2026](https://cmt3.research.microsoft.com/ICSCSD2026)
- **Camera-Ready Validation**: Automated package validator checking 4–6 page limit, IEEE Word/LaTeX sources, and <10% similarity index.

---

## 8. License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
