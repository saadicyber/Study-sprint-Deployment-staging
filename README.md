# Study Sprint — Staging Deployment

> **Session 8 Entry-Level Task** · Web Dev Track

A small static web project deployed to a **staging environment** using Express. Demonstrates how a single codebase can serve both staging and production through environment variables — without changing any code.

---

## Overview

| Concept | Implementation |
|---------|---------------|
| **Static site** | A Study Sprint landing page served by Express |
| **Build step** | `build.js` stamps `APP_ENV` into the HTML output |
| **Environment control** | `APP_ENV` and `PORT` environment variables configure the server |
| **Health check** | `/health` endpoint confirms the deployment succeeded |
| **Deploy script** | `deploy_staging.sh` automates install → build → start → verify |

---

## Project Structure

```
study-sprint-deploy/
├── public/
│   └── index.html          # Source HTML (contains __APP_ENV__ placeholders)
├── dist/
│   └── index.html          # Built HTML (placeholders replaced with real values)
├── build.js                # Build script — replaces __APP_ENV__ placeholders
├── server.js               # Express server — serves /dist and /health endpoint
├── deploy_staging.sh       # Deployment automation script (bash)
├── package.json            # Dependencies and npm scripts
└── README.md
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm (comes with Node.js)

### 1. Install dependencies

```bash
cd study-sprint-deploy
npm install
```

### 2. Build for staging

```bash
npx cross-env APP_ENV=staging node build.js
```

Output:
```
Build complete. Target environment: staging
Output written to: .../dist/index.html
```

### 3. Start the staging server

```bash
npm run start:staging
```

Output:
```
Server running in [staging] mode on http://localhost:4000
```

### 4. Verify the deployment

- **Homepage:** [http://localhost:4000](http://localhost:4000) — displays the landing page with a **staging** banner
- **Health check:** [http://localhost:4000/health](http://localhost:4000/health) — returns:
  ```json
  { "status": "ok", "environment": "staging" }
  ```

---

## NPM Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `build` | `npm run build` | Runs `build.js` (uses `APP_ENV` from environment, defaults to `staging`) |
| `start:staging` | `npm run start:staging` | Starts Express on **port 4000** with `APP_ENV=staging` |
| `start:production` | `npm run start:production` | Starts Express on **port 8080** with `APP_ENV=production` |

---

## Staging vs Production

The same server code runs in both environments — only the environment variables change:

| | Staging | Production |
|---|---------|------------|
| **`APP_ENV`** | `staging` | `production` |
| **`PORT`** | `4000` | `8080` |
| **Banner color** | Amber/yellow | Teal/green |
| **URL** | `http://localhost:4000` | `http://localhost:8080` |

To switch to production:

```bash
npx cross-env APP_ENV=production node build.js
npm run start:production
```

---

## How It Works

1. **`public/index.html`** contains `__APP_ENV__` placeholders throughout the HTML
2. **`build.js`** reads the source file, replaces all `__APP_ENV__` with the value of the `APP_ENV` environment variable, and writes the output to `dist/index.html`
3. **`server.js`** serves the built files from `dist/` and exposes a `/health` endpoint for deployment verification
4. **`cross-env`** ensures environment variables work the same way on Windows, macOS, and Linux

---

## Deployment Script (Linux/macOS)

The `deploy_staging.sh` script automates the full pipeline:

```bash
chmod +x deploy_staging.sh
./deploy_staging.sh
```

Steps executed:
1. `npm install` — install dependencies
2. `APP_ENV=staging node build.js` — build for staging
3. `APP_ENV=staging PORT=4000 node server.js &` — start server in background
4. `curl http://localhost:4000/health` — verify the server is live

---

## Technologies

- **Node.js** — JavaScript runtime
- **Express** v4 — HTTP server framework
- **cross-env** — Cross-platform environment variable support
