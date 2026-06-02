// ============================================================
// middleware/validateUser.js – Validates user request bodies
// ============================================================

// Required fields every user object must contain
const REQUIRED_FIELDS = ["firstName", "lastName", "hobby"];

/**
 * validateUser
 * Used on POST /user and PUT /user/:id routes.
 * Checks that all required fields are present and non-empty.
 * Returns 400 Bad Request with a descriptive message if validation fails.
 */
const validateUser = (req, res, next) => {
  const body = req.body;

  // Collect any fields that are missing or blank
  const missingFields = REQUIRED_FIELDS.filter(
    (field) => !body[field] || String(body[field]).trim() === ""
  );

  if (missingFields.length > 0) {
    // Respond immediately – do NOT call next()
    return res.status(400).json({
      error: "Validation failed",
      message: `Missing or empty required field(s): ${missingFields.join(", ")}`,
    });
  }

  // All fields present – continue to the route handler
  next();
};

export default validateUser;