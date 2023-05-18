const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { name, phoneNumber, age, pincode, aadharNo, password } = req.body;

    // Check if user already exists with the provided phone number
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = new User({
      name,
      phoneNumber,
      age,
      pincode,
      aadharNo,
      password,
    });

    await user.save();

    res.json({ user, message: "User registered successfully" });
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

    res.json({ user, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
