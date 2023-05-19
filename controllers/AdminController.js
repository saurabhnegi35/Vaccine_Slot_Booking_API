const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const User = require("../models/User");
const Slot = require("../models/Slot");

exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Validate the input data

    // Find the admin by username
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const user = await Admin.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1h" });

    res.json({ user, message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Total Registered Users
exports.getTotalRegisteredUsers = async (req, res) => {
  try {
    // Retrieve total registered users count
    const totalUsers = await User.countDocuments();
    const users = await User.find();

    // Send a response with the total registered users count
    res.json({ success: true, totalUsers, users });
  } catch (error) {
    // Handle the error and send an appropriate response
    res.status(500).json({ success: false, error: error.message });
  }
};
// Filter Registered Users
exports.filterRegisteredUsers = async (req, res) => {
  try {
    const { age, pincode, vaccineStatus, booked } = req.query;
    console.log(booked);
    // Create an empty filter object to store the filter conditions
    const filter = {};

    // Add filter conditions based on the provided filters
    if (age) {
      filter.age = parseInt(age);
    }

    if (pincode) {
      filter.pincode = pincode;
    }

    if (vaccineStatus) {
      filter.vaccineStatus = vaccineStatus;
    }
    if (booked) {
      filter.booked = booked;
      console.log(filter);
    }

    // Retrieve registered users based on the filter conditions
    const filteredUsers = await User.find(filter);

    // Send a response with the filtered registered users
    res.json({ success: true, filteredUsers });
  } catch (error) {
    // Handle the error and send an appropriate response
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Slot Details for a Day
exports.getSlotDetailsForDay = async (req, res) => {
  try {
    const { date } = req.query;
    // Validate the input data

    // Convert the provided date to a JavaScript Date object
    const targetDate = new Date(date);
    console.log(targetDate);

    // Retrieve slot details for the provided date
    const slotDetails = await Slot.find({
      date: targetDate,
    });

    // Send a response with the slot details
    res.json({ success: true, slotDetails });
  } catch (error) {
    // Handle the error and send an appropriate response
    res.status(500).json({ success: false, error: error.message });
  }
};
