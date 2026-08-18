/**
 * build.js
 * A tiny "build step": copies the static site from /public into /dist
 * and stamps the target environment into the HTML. In a real CI/CD
 * pipeline this is the step that runs automatically before deploying
 * to staging or production.
 */

const fs = require("fs");
const path = require("path");

const targetEnv = process.env.APP_ENV || "staging";

const srcFile = path.join(__dirname, "public", "index.html");
const distDir = path.join(__dirname, "dist");
const distFile = path.join(distDir, "index.html");

if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);

let html = fs.readFileSync(srcFile, "utf-8");
html = html.replaceAll("__APP_ENV__", targetEnv);

fs.writeFileSync(distFile, html);
console.log(`Build complete. Target environment: ${targetEnv}`);
console.log(`Output written to: ${distFile}`);
