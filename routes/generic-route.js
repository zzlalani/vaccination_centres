const express = require("express")
const router = express.Router()

const { ModuleTypes } = require('../enums');

const routeHandler = require('./route-handler');
const genericService = require('../services/generic-service');

const centreValidator = require('./centre-route-validator');
const nurseValidator = require('./nurse-route-validator');
const residentValidator = require('./resident-route-validator');
const scheduleValidator = require('./schedule-route-validator');

// create
router.post("/:type",
  validatePost,
  async (req, res, next) => {
    try {
      const data = await genericService.create(req.params.type, {
        ...req.body
      });
      res.status(200).json({
        message: `${req.params.type} created`,
        data,
      });
    } catch (err) {
      return next(err);
    }
  });

async function validatePost(req, res, next) {
  switch (req.params.type) {
    case ModuleTypes.NURSE:
      await nurseValidator.postNurse(req, res, next);
      break;
    case ModuleTypes.RESIDENT:
      await residentValidator.postResident(req, res, next);
      break;
    case ModuleTypes.CENTRE:
      await centreValidator.postCentre(req, res, next);
      break;
    case ModuleTypes.SCHEDULE:
      await scheduleValidator.postSchedule(req, res, next);
      break;
    default:
      return next(new Error('Invalid type'));
  }
  return routeHandler(req, res, next);
}

// get all
router.get("/:type", async (req, res, next) => {
  try {
    const data = await genericService.get(req.params.type);
    res.status(200).json({
      data,
    });
  } catch (err) {
    return next(err);
  }
});

// update by id
router.put("/:type/:id",
  validateUpdate,
  async (req, res, next) => {
    try {
      const data = await genericService.update(req.params.type, req.params.id, {
        ...req.body,
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
      return next(err);
    }
  });

async function validateUpdate(req, res, next) {
  switch (req.params.type) {
    case ModuleTypes.NURSE:
      await nurseValidator.updateNurse(req, res, next);
      break;
    case ModuleTypes.RESIDENT:
      await residentValidator.updateResident(req, res, next);
      break;
    case ModuleTypes.CENTRE:
      await centreValidator.updateCentre(req, res, next);
      break;
    case ModuleTypes.SCHEDULE:
      await scheduleValidator.updateSchedule(req, res, next);
      break;
    default:
      return next(new Error('Invalid type'));
  }
  return routeHandler(req, res, next);
}

// get by id
router.get("/:type/:id",
  async (req, res, next) => {
    try {
      const data = await genericService.getById(req.params.type, req.params.id);
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
      return next(err);
    }
  });

module.exports = router;
