const mongoose = require('mongoose');

module.exports = mongoose.model("Nurse", new mongoose.Schema({
  name: String,
  contact: String,
}, {
  timestamps: true,
}));
