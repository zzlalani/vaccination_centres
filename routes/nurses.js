const express = require("express")
const router = express.Router()
const { body, param } = require('express-validator');

const routeHandler = require('./route-handler');

const NurseService = require('../services/nurses');

// create new nurse
router.post("/",
  validateSanitizePostNurse,
  async (req, res, next) => {
  try {
    const data = await NurseService.createNurse({
      name: req.body.name,
    });
    res.status(200).json({
      message: 'nurse created',
      data,
    });
  } catch (err) {
    next(err);
  }
});

async function validateSanitizePostNurse(req, res, next) {
  await Promise.all([
    body('name').notEmpty().run(req),
    body('name').trim().run(req),
  ]);
  return routeHandler(req, res, next)
}

// get all nurses
router.get("/", async (req, res, next) => {
  try {
    const data = await NurseService.getNurses();
    res.status(200).json({
      data,
    });
  } catch (err) {
    next(err);
  }
});

// update nurse by id
router.put("/:id",
  validateSanitizeUpdateNurse,
  async (req, res, next) => {
  try {
    const data = await NurseService.updateNurse(req.params.id, {
      name: req.body.name,
    });
    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(404).json({
        message: 'id not found',
      });
    }
  } catch (err) {
    next(err);
  }
});

async function validateSanitizeUpdateNurse(req, res, next) {
  await Promise.all([
    param('id').trim().run(req),
    body('name').notEmpty().run(req),
    body('name').trim().run(req),
  ]);
  return routeHandler(req, res, next)
}

// get nurse by id
router.get("/:id",
  async (req, res, next) => {
  try {
    const data = await NurseService.getNurseById(req.params.id);
    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(404).json({
        message: 'id not found',
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
