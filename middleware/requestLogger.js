// ============================================================
// middleware/requestLogger.js – Logs every HTTP request
// ============================================================

/**
 * requestLogger
 * Logs: timestamp | HTTP method | URL | status code | response time
 * Uses res.on("finish") so the status code is available after the
 * response has been sent.
 */
const requestLogger = (req, res, next) => {
  const startTime = Date.now(); // record when request arrived

  // "finish" fires once the response headers & body have been sent
  res.on("finish", () => {
    const duration = Date.now() - startTime; // ms taken to respond
    const timestamp = new Date().toISOString();

    console.log(
      `[${timestamp}] ${req.method} ${req.originalUrl} – ${res.statusCode} (${duration}ms)`
    );
  });

  next(); // hand control to the next middleware / route handler
};

export default requestLogger;