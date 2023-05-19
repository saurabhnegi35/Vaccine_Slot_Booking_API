const authMiddleware = require("../config/authMiddleware");
// Import the Express module and create a new router object
const express = require("express");
const router = express.Router();

// Import the authentication controller module
const UserController = require("../controllers/UserController");

// Define routes for user registration and login
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.patch("/slots", authMiddleware, UserController.updateUserSlot);

// Export the router from the module
module.exports = router;
