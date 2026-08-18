/**
 * server.js
 * Minimal Express server that serves the built static site.
 * The PORT and APP_ENV are read from environment variables, so the
 * exact same server/code can run in staging or production —
 * only the environment configuration changes.
 */

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const APP_ENV = process.env.APP_ENV || "development";

app.use(express.static(path.join(__dirname, "dist")));

// Simple health-check endpoint, commonly used by CI/CD pipelines
// to confirm a deployment succeeded before routing traffic to it.
app.get("/health", (req, res) => {
  res.json({ status: "ok", environment: APP_ENV });
});

app.listen(PORT, () => {
  console.log(`Server running in [${APP_ENV}] mode on http://localhost:${PORT}`);
});
