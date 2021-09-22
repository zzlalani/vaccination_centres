function getTimeRange(date, start, end) {
  const startTime = new Date(date);
  const endTime = new Date(date);
  const startTimeSplit = start.split(':');
  const endTimeSplit = end.split(':');
  startTime.setHours(startTimeSplit[0]);
  startTime.setMinutes(startTimeSplit[1]);
  endTime.setHours(endTimeSplit[0]);
  endTime.setMinutes(endTimeSplit[1]);
  return {
    startTime,
    endTime,
  };
}

function getSlotTime(date, slot) {
  const time = new Date(date);
  const timeSplit = slot.split(':');
  time.setHours(timeSplit[0]);
  time.setMinutes(timeSplit[1]);
  return time;
}

module.exports = {
  getTimeRange,
  getSlotTime,
};
