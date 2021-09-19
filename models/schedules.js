const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model("Schedule", new mongoose.Schema({
  date: Date,
  centre: { type: Schema.Types.ObjectId, ref: 'centre' },
  nurses: [{ type: Schema.Types.ObjectId, ref: 'Nurse' }],
}, {
  timestamps: true,
}));
