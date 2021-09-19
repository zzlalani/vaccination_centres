const {param, body} = require("express-validator");

async function postNurse(req, res, next) {
  await Promise.all([
    param('type').trim().run(req),
    body('name').notEmpty().run(req),
    body('name').trim().run(req),
  ]);
}

async function updateNurse(req, res, next) {
  await Promise.all([
    param('id').trim().run(req),
    body('name').notEmpty().run(req),
    body('name').trim().run(req),
  ]);
}

module.exports = {
  postNurse,
  updateNurse,
}
