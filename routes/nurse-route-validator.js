const {param, body} = require("express-validator");
const routeHandler = require("./route-handler");

async function postNurse(req, res, next) {
  await Promise.all([
    param('type').trim().run(req),
    body('name').notEmpty().run(req),
    body('name').trim().run(req),
  ]);
  return routeHandler(req, res, next);
}

async function updateNurse(req, res, next) {
  await Promise.all([
    param('id').trim().run(req),
    body('name').notEmpty().run(req),
    body('name').trim().run(req),
  ]);
  return routeHandler(req, res, next)
}

module.exports = {
  postNurse,
  updateNurse,
}
