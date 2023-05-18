const mongoose = require("mongoose")
// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  aadharNo: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  vaccinationStatus: {
    type: String,
    default: "none",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
