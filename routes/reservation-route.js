const express = require("express");
const router = express.Router();

const routeHandler = require('./route-validation-result');
const reservationService = require('../services/reservation-service');

router.post('/',
  async (req, res, next) => {
    try {
      const data = await reservationService.create(
        req.body.centreId,
        req.body.residentId,
        req.body.date,
        req.body.slot,
      );
      res.status(200).json({
        message: `Reservation booked`,
        data,
      });
    } catch (err) {
      return next(err);
    }
  });

router.get('/centre/:centreId/date/:date',
  async (req, res, next) => {
    try {
      const data = await reservationService.getAll(req.params.centreId, req.params.date);
      res.status(200).json({
        data,
      });
    } catch (err) {
      return next(err);
    }
  });

router.get('/:id',
  async (req, res, next) => {
    try {
      const data = await reservationService.getById(req.params.id);
      res.status(200).json({
        data,
      });
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
