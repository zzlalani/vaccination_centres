const { body, param} = require("express-validator");

async function postCentre (req, res, next) {
  await Promise.all([
    body('name').notEmpty().run(req),
    body('location').notEmpty().run(req),
    body('dailyCapacity').notEmpty().isNumeric().run(req),
    body('name').trim().run(req),
    body('location').trim().run(req),
  ]);
}

async function updateCentre (req, res, next) {
  await Promise.all([
    param('id').trim().run(req),
    body('name').notEmpty().run(req),
    body('location').notEmpty().run(req),
    body('dailyCapacity').notEmpty().isNumeric().run(req),
    body('name').trim().run(req),
    body('location').trim().run(req),
  ]);
}

module.exports = {
  postCentre,
  updateCentre,
}
