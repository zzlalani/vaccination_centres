const { body, param} = require("express-validator");

async function postResident (req, res, next) {
  await Promise.all([
    body('name').notEmpty().run(req),
    body('contact').notEmpty().isNumeric().run(req),
    body('dob').notEmpty().isDate().run(req),
    body('name').trim().run(req),
    body('dob').trim().run(req),
  ]);
}

async function updateResident (req, res, next) {
  await Promise.all([
    param('id').trim().run(req),
    body('name').notEmpty().run(req),
    body('contact').notEmpty().isNumeric().run(req),
    body('dob').notEmpty().isDate().run(req),
    body('name').trim().run(req),
    body('dob').trim().run(req),
  ]);
}

module.exports = {
  postResident,
  updateResident,
}
