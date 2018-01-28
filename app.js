const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

require("dotenv").config();
require('./config/cors.config')(app);
require('./config/database.config');

const routes = require('./routes');

app.use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(express.static(path.join(__dirname, 'public')))
  .use(routes);

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
