const { body, param} = require("express-validator");

async function postSchedule(req, res, next) {
  await Promise.all([
    body('date').notEmpty().isDate().run(req),
    body('centre').notEmpty().run(req),
    body('nurses').notEmpty().isArray().run(req),
    body('nurses.*').notEmpty().run(req),
    body('centre').trim().run(req),
    body('nurses.*').trim().run(req),
  ]);
}

async function updateSchedule(req, res, next) {
  await Promise.all([
    param('id').trim().run(req),
    body('date').notEmpty().isDate().run(req),
    body('centre').notEmpty().run(req),
    body('nurses').notEmpty().isArray().run(req),
    body('centre').trim().run(req),
    body('nurses.*').trim().run(req),
  ]);
}

module.exports = {
  postSchedule,
  updateSchedule,
}
