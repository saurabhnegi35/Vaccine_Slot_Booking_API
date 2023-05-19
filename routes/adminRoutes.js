const express = require("express");
const router = express.Router();
const authMiddleware = require("../config/authMiddleware");

// Import the authentication controller module
const AdminController = require("../controllers/AdminController");

// Define routes for user registration and login
router.post("/login", AdminController.adminLogin);
router.get(
  "/total-users",
  authMiddleware,
  AdminController.getTotalRegisteredUsers
);
router.get(
  "/filter-users",
  authMiddleware,
  AdminController.filterRegisteredUsers
);
router.get(
  "/slot-details",
  authMiddleware,
  AdminController.getSlotDetailsForDay
);

// Export the router from the module
module.exports = router;
