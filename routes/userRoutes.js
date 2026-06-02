// ============================================================
// routes/userRoutes.js – All routes for the Users API
// ============================================================

import express from "express";
import users from "../data/users.js";
import validateUser from "../middleware/validateUser.js";

const router = express.Router();

// ── Helper ───────────────────────────────────────────────────
/**
 * generateId
 * Generates a simple incremental ID by finding the current
 * highest numeric ID and adding 1.
 */
const generateId = () => {
  if (users.length === 0) return "1";
  const maxId = Math.max(...users.map((u) => Number(u.id)));
  return String(maxId + 1);
};

// ============================================================
// GET /users – Fetch all users
// ============================================================
router.get("/users", (req, res) => {
  // Always returns 200 with the full users array (may be empty)
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// ============================================================
// GET /users/:id – Fetch a single user by ID
// ============================================================
router.get("/users/:id", (req, res) => {
  const { id } = req.params;

  // Find the user whose id matches the URL parameter
  const user = users.find((u) => u.id === id);

  if (!user) {
    // 404 – resource not found
    return res.status(404).json({
      success: false,
      error: `User with id "${id}" not found`,
    });
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// ============================================================
// POST /user – Create a new user
// validateUser middleware runs BEFORE the route handler
// ============================================================
router.post("/user", validateUser, (req, res) => {
  const { firstName, lastName, hobby } = req.body;

  // Build the new user object
  const newUser = {
    id: generateId(),
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    hobby: hobby.trim(),
  };

  // Push into our in-memory array (simulates a DB insert)
  users.push(newUser);

  // 201 Created – return the newly created user
  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: newUser,
  });
});

// ============================================================
// PUT /user/:id – Update an existing user
// validateUser middleware runs BEFORE the route handler
// ============================================================
router.put("/user/:id", validateUser, (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, hobby } = req.body;

  // Find the index of the user in the array
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    // 404 – no user with that id exists
    return res.status(404).json({
      success: false,
      error: `User with id "${id}" not found`,
    });
  }

  // Update fields (keep the same id)
  users[userIndex] = {
    id,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    hobby: hobby.trim(),
  };

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: users[userIndex],
  });
});

// ============================================================
// DELETE /user/:id – Delete a user by ID
// ============================================================
router.delete("/user/:id", (req, res) => {
  const { id } = req.params;

  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    // 404 – user doesn't exist, nothing to delete
    return res.status(404).json({
      success: false,
      error: `User with id "${id}" not found`,
    });
  }

  // Remove the user from the array (splice mutates the array in-place)
  const deletedUser = users.splice(userIndex, 1)[0];

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    data: deletedUser,
  });
});

export default router;