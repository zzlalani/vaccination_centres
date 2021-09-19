const express = require("express")
const router = express.Router()
const { body, param } = require('express-validator');

const routeHandler = require('./route-handler');

const PatientService = require('../services/patients');

// create new patient
router.post("/",
  validateSanitizePostPatient,
  async (req, res, next) => {
  try {
    const data = await PatientService.createPatient({
      name: req.body.name,
      contact: req.body.contact,
      dob: new Date(req.body.dob),
    });
    res.status(200).json({
      message: 'patient created',
      data,
    });
  } catch (err) {
    next(err);
  }
});

async function validateSanitizePostPatient(req, res, next) {
  await Promise.all([
    body('name').notEmpty().run(req),
    body('contact').notEmpty().isNumeric().run(req),
    body('dob').notEmpty().isDate().run(req),
    body('name').trim().run(req),
    body('dob').trim().run(req),
  ]);
  return routeHandler(req, res, next)
}

// get all patients
router.get("/", async (req, res, next) => {
  try {
    const data = await PatientService.getPatients();
    res.status(200).json({
      data,
    });
  } catch (err) {
    next(err);
  }
});

// update patient by id
router.put("/:id",
  validateSanitizeUpdatePatient,
  async (req, res, next) => {
  try {
    const data = await PatientService.updatePatient(req.params.id, {
      name: req.body.name,
      contact: req.body.contact,
      dob: new Date(req.body.dob),
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

async function validateSanitizeUpdatePatient(req, res, next) {
  await Promise.all([
    param('id').trim().run(req),
    body('name').notEmpty().run(req),
    body('contact').notEmpty().isNumeric().run(req),
    body('dob').notEmpty().isDate().run(req),
    body('name').trim().run(req),
    body('dob').trim().run(req),
  ]);
  return routeHandler(req, res, next)
}

// get patient by id
router.get("/:id",
  async (req, res, next) => {
  try {
    const data = await PatientService.getPatientById(req.params.id);
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
