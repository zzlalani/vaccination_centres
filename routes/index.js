const express = require('express');
const router = express.Router();

router.get('/ping', async (req, res, next) => {
  try {
    res.status(200).send('pong');
  } catch (error) {
    next(error)
  }
});

router.use('/generic', require('./generic-route'));

module.exports = router;
