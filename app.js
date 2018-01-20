const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');

require("dotenv").config();
require('./config/database.config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => (
  res.status(err.status || 500).json(err.message || 'Server side error')
));

module.exports = app;
