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

module.exports = router;
