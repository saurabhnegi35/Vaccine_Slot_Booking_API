// Import the Express module and create a new router object
const express = require("express");
const router = express.Router();
const authMiddleware = require("../config/authMiddleware");

// Import the authentication controller module
const SlotController = require("../controllers/SlotController");

// Define routes for user registration and login
router.get("/", authMiddleware, SlotController.getSlots);
router.post("/create-slots", authMiddleware, SlotController.createSlots);
router.post("/register-slot", authMiddleware, SlotController.registerSlot);

// Export the router from the module
module.exports = router;
