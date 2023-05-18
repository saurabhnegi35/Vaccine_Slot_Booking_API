// const AvailableSlotSchema = require("../models/availableSlots");
const Slot = require("../models/Slot");
const { nanoid } = require("nanoid");

// Generate available slots for a given day and dose
exports.createSlots = async (req, res) => {
  const { startDate, endDate, dose } = req.body;

  try {
    const startDateTime = new Date(startDate);
    startDateTime.setHours(10, 0, 0, 0);

    const endDateTime = new Date(endDate);
    endDateTime.setHours(17, 0, 0, 0);

    const slots = [];

    while (startDateTime <= endDateTime) {
      const slot = new Slot({
        slotId: nanoid(),
        date: startDateTime.toISOString().split("T")[0],
        startTime: startDateTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        endTime: new Date(
          startDateTime.getTime() + 30 * 60 * 1000
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        dose,
        capacity: 10,
        available: true,
      });

      slots.push(slot);
      startDateTime.setTime(startDateTime.getTime() + 30 * 60 * 1000);
    }

    await Slot.insertMany(slots);

    return res
      .status(200)
      .json({ slots, message: "Slots created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get available slots on a given day for a specific dose
exports.getSlots = async (req, res) => {
    const { date } = req.query;
    console.log(date);
    try {
      // Find available slots for the given date
      const slots = await Slot.find({ date, available: true });
      return res.status(200).json({ slots });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  
  exports.registerSlot = async (req, res) => {
    try {
      const { userId, slotId } = req.body;
  
      if (!userId || !slotId) {
        return res
          .status(400)
          .json({ error: "User ID and slot ID are required" });
      }
  
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Check if the slot exists and is available
      const slot = await Slot.findById(slotId);
      if (!slot || !slot.available) {
        return res.status(404).json({ error: "Slot not found or not available" });
      }
  
      // Update the slot and user's vaccination status
      slot.available = false;
      user.vaccinationStatus = slot.dose;
  
      await Promise.all([slot.save(), user.save()]);
  
      res.json({ message: "Slot registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  