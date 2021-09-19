const Nurse = require('../models/nurses');

async function createNurse(data) {
  return Nurse.create(data);
}

async function getNurses() {
  return Nurse.find();
}

async function updateNurse(id, data) {
  return Nurse.findByIdAndUpdate(
    id,
    data,
    {new: true},
  );
}

async function getNurseById(id) {
  return Nurse.findById(id);
}

module.exports = {
  createNurse,
  getNurseById,
  getNurses,
  updateNurse,
}
