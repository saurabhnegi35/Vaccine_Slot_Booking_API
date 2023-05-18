const mongoose = require('mongoose');
const { Schema } = mongoose;

const slotSchema = new Schema({
  slotId: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  dose: {
    type: String,
    enum: ['first', 'second'],
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  bookedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
