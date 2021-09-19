const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const db = require('./db');

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// db connection
db.connect();

app.use('/', indexRouter);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send({
    error,
  })
});

module.exports = app;
