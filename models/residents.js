const mongoose = require('mongoose');

module.exports = mongoose.model("Resident", new mongoose.Schema({
  name: String,
  dob: Date,
  contact: {
    type: Number,
    unique: true,
  },
}, {
  timestamps: true,
}));
