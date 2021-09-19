const express = require("express")
const router = express.Router()

const { ModuleTypes } = require('../enums');

const routeHandler = require('./route-handler');
const genericService = require('../services/generic-service');

const nurseValidator = require('./nurse-route-validator');
const residentValidator = require('./resident-route-validator');

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
      next(err);
    }
  });

async function validatePost(req, res, next) {
  console.log('req.params.type', req.params.type);
  switch (req.params.type) {
    case ModuleTypes.NURSE:
      return nurseValidator.postNurse(req, res, next);
    case ModuleTypes.RESIDENT:
      return residentValidator.postResident(req, res, next);
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
    next(err);
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
      next(err);
    }
  });

async function validateUpdate(req, res, next) {
  switch (req.params.type) {
    case ModuleTypes.NURSE:
      return nurseValidator.updateNurse(req, res, next);
    case ModuleTypes.RESIDENT:
      return residentValidator.updateResident(req, res, next);
    default:
      return next(new Error('Invalid type'));
  }
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
      next(err);
    }
  });

module.exports = router;
