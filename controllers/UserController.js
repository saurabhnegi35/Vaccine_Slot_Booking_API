const User = require("../models/User");
const Slot = require("../models/Slot");
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, phoneNumber, age, pincode, aadharNo, password } = req.body;
    // console.log(nanoid());
    // console.log(nanoid());
    // Check if user already exists with the provided phone number
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = new User({
      userId: nanoid(),
      name,
      phoneNumber,
      age,
      pincode,
      aadharNo,
      password,
    });

    const newUser = await user.save();
    // console.log(newUser);

    res.json({ newUser, message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await User.findOne({ phoneNumber, password });
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

exports.updateUserSlot = async (req, res) => {
  try {
    const { userId, newSlotId } = req.body;
    // Validate the input data
    // console.log(userId);
    // console.log(newSlotId);
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Retrieve the new slot by ID
    const slot = await Slot.findById(newSlotId);

    if (!slot) {
      return res
        .status(404)
        .json({ success: false, message: "Slot not found" });
    }

    // Check if the new slot is available
    if (!slot.available) {
      return res
        .status(400)
        .json({ success: false, message: "Selected slot is not available" });
    }

    // Update the user's slot with the new slot ID
    user.slot = newSlotId;
    if (slot.capacity !== 0) {
      slot.capacity--;
      if (slot.capacity === 0) {
        slot.available = false;
      }
    }
    user.vaccinationStatus = slot.dose;
    user.booked = true;

    // Push the user's ID to the bookedBy array in the Slot model
    slot.bookedBy.push(user._id);

    await Promise.all([slot.save(), user.save()]);

    // Save the updated user
    await user.save();

    // Send a response indicating the success of the update
    res.json({ success: true, message: "User slot updated successfully" });
  } catch (error) {
    console.error(error);
    // Handle the error and send an appropriate response
    res.status(500).json({ success: false, error: error.message });
  }
};
