const mongoose = require("mongoose");
// Define the Slot schema
const slotSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  dose: { type: String, required: true },
  available: { type: Boolean, default: true },
  registeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Slot = mongoose.model("Slot", slotSchema);
module.exports = Slot;
