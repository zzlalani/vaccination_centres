const Reservation = require('../models/reservations');
const Centre = require('../models/centres');
const Resident = require('../models/residents');
const Schedule = require('../models/schedules');

const { getTimeRange, getSlotTime } = require('./reservation-utilities')

async function create(centreId, residentId, date, slot) {
  const centerObj = await Centre.findById(centreId);
  if (!centerObj) {
    throw new Error('Invalid center id');
  }
  const residentObj = await Resident.findById(residentId);
  if (!residentObj) {
    throw new Error('Invalid resident id');
  }
  const scheduleObj = await Schedule.findOne({
    centre: centreId,
    date,
  });
  if (!scheduleObj) {
    throw new Error(`no schedule found for centre in given date: ${date}`);
  }
  // check the daily capacity of the centre is not reached
  const reservationsOnDate = await Reservation.find({
    centre: centreId,
    date,
  });
  if (reservationsOnDate.length > centerObj.dailyCapacity) {
    throw new Error('centre\'s daily capacity reached');
  }
  const timeRange = getTimeRange(date, centerObj.startTime, centerObj.endTime);
  const slotTime = getSlotTime(date, slot);
  // check if the selected slot is with in the slot timings of the centre
  if (slotTime >= timeRange.startTime && slotTime < new Date(timeRange.endTime.getTime() - (1000 * centerObj.slotTime))) {
    const reservationsSameSlot = reservationsOnDate.filter(reservationObj => reservationObj.slot === slot);
    // check if the number of nurses matches the total reservations in the given time slot.
    if (scheduleObj.nurses.length >= reservationsSameSlot.length + 1) {
      return Reservation.create({
        centre: centreId,
        resident: residentId,
        date,
        slot,
      });
    } else {
      throw new Error(`${slot} slot on ${date} is not available`);
    }
  }
}

async function getAll(centreId, date) {
  return Reservation.find({
    centre: centreId,
    date,
  }).sort('slot');
}

async function getById(id) {
  return Reservation.findById(id).populate('resident').populate('centre');
}

module.exports = {
  create,
  getAll,
  getById,
};
