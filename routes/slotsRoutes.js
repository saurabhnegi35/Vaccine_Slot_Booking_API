// Import the Express module and create a new router object
const express = require("express");
const router = express.Router();

// Import the authentication controller module
const SlotController = require("../controllers/SlotController");

// Define routes for user registration and login
router.get("/", SlotController.getSlots);
router.post("/register-slot", SlotController.registerSlot);

// Export the router from the module
module.exports = router;
