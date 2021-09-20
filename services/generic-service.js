const Centre = require('../models/centres');
const Nurse = require('../models/nurses');
const Resident = require('../models/residents');
const Schedule = require('../models/schedules');

const { ModuleTypes } = require('../enums');

async function create(type, data) {
  switch (type) {
    case ModuleTypes.CENTRE:
      return Centre.create(data);
    case ModuleTypes.NURSE:
      return Nurse.create(data);
    case ModuleTypes.RESIDENT:
      return Resident.create(data);
    case ModuleTypes.SCHEDULE:
      return Schedule.create(data);
    default:
      throw new Error('Invalid type');
  }
}

async function get(type) {
  switch (type) {
    case ModuleTypes.CENTRE:
      return Centre.find();
    case ModuleTypes.NURSE:
      return Nurse.find();
    case ModuleTypes.RESIDENT:
      return Resident.find();
    case ModuleTypes.SCHEDULE:
      return Schedule.find().populate('nurses').populate('centre');
    default:
      throw new Error('Invalid type');
  }
}

async function update(type, id, data) {
  switch (type) {
    case ModuleTypes.CENTRE:
      return Centre.findByIdAndUpdate(
        id,
        data,
        {new: true},
      );
    case ModuleTypes.NURSE:
      return Nurse.findByIdAndUpdate(
        id,
        data,
        {new: true},
      );
    case ModuleTypes.RESIDENT:
      return Resident.findByIdAndUpdate(
        id,
        data,
        {new: true},
      );
    case ModuleTypes.SCHEDULE:
      return Schedule.findByIdAndUpdate(
        id,
        data,
        {new: true},
      );
    default:
      throw new Error('Invalid type');
  }
}

async function getById(type, id) {
  switch (type) {
    case ModuleTypes.CENTRE:
      return Centre.findById(id);
    case ModuleTypes.NURSE:
      return Nurse.findById(id);
    case ModuleTypes.RESIDENT:
      return Resident.findById(id);
    case ModuleTypes.SCHEDULE:
      return Schedule.findById(id);
    default:
      throw new Error('Invalid type');
  }
}

module.exports = {
  create,
  get,
  getById,
  update,
}
