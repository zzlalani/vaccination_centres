const Patient = require('../models/patients');

async function createPatient(data) {
  return Patient.create(data);
}

async function getPatients() {
  return Patient.find();
}

async function updatePatient(id, data) {
  return Patient.findByIdAndUpdate(
    id,
    data,
    {new: true},
  );
}

async function getPatientById(id) {
  return Patient.findById(id);
}

module.exports = {
  createPatient,
  getPatientById,
  getPatients,
  updatePatient,
}
