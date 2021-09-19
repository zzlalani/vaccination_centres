const Nurse = require('../models/nurses');

async function createNurse(data) {
  return Nurse.create(data);
}

async function getNurses() {
  return Nurse.find();
}

async function updateNurses(id, data) {
  return Nurse.findByIdAndUpdate(id, data)
}

async function getNurseById(id) {
  return Nurse.findById(id);
}

module.exports = {
  createNurse,
  getNurseById,
  getNurses,
  updateNurses,
}
