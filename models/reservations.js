const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model("Reservation", new mongoose.Schema({
  date: Date,
  centre: { type: Schema.Types.ObjectId, ref: 'Centre' },
  resident: { type: Schema.Types.ObjectId, ref: 'Resident' },
  slot: String,
}, {
  timestamps: true,
}));
