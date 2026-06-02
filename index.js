// ============================================================
// index.js – Entry point for the Users REST API (ES6 Modules)
// ============================================================

import express from "express";

const app = express();
const PORT = 3000;

// ── Built-in middleware ──────────────────────────────────────
// Parse incoming JSON request bodies
app.use(express.json());




// ── 404 handler – unknown routes ────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ── Global error handler ─────────────────────────────────────
// Catches any errors passed via next(err)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

// ── Start server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;