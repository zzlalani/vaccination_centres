const { body, param} = require("express-validator");

async function postCentre (req, res, next) {
  await Promise.all([
    body('name').notEmpty().run(req),
    body('location').notEmpty().run(req),
    body('startTime').notEmpty().run(req),
    body('endTime').notEmpty().run(req),
    body('dailyCapacity').notEmpty().isNumeric().run(req),
    body('slotTime').notEmpty().isNumeric().run(req),
    body('name').trim().run(req),
    body('location').trim().run(req),
    body('startTime').trim().run(req),
    body('endTime').trim().run(req),
  ]);
}

async function updateCentre (req, res, next) {
  await Promise.all([
    param('id').trim().run(req),
    body('name').notEmpty().run(req),
    body('location').notEmpty().run(req),
    body('startTime').notEmpty().run(req),
    body('endTime').notEmpty().run(req),
    body('dailyCapacity').notEmpty().isNumeric().run(req),
    body('slotTime').notEmpty().isNumeric().run(req),
    body('name').trim().run(req),
    body('location').trim().run(req),
    body('startTime').trim().run(req),
    body('endTime').trim().run(req),
  ]);
}

module.exports = {
  postCentre,
  updateCentre,
}
