const mongoose = require('mongoose');

module.exports = mongoose.model("Nurse", new mongoose.Schema({
  name: String,
  contact: String,
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule'
  }
}, {
  timestamps: true,
}));
