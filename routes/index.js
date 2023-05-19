// Import the Express module and create a new router object
const express = require("express");
const router = express.Router();

// Define routes for authentication and task management
router.use("/api/users", require("./userRoutes"));
router.use("/api/slots", require("./slotRoutes"));
router.use("/api/admin", require("./adminRoutes"));

// Export the router from the module
module.exports = router;
