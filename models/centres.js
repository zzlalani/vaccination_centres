const mongoose = require('mongoose');

module.exports = mongoose.model("Centre", new mongoose.Schema({
  name: String,
  location: {
    type: String,
    unique: true,
  },
  dailyCapacity: Number,
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule'
  }
}, {
  timestamps: true,
}));
