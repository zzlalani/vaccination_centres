const mongoose = require('mongoose');

module.exports = mongoose.model("Patient", new mongoose.Schema({
  name: String,
  dob: Date,
  contact: Number,
}, {
  timestamps: true,
}));
