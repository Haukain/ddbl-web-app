var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const db = require('./models').sequelize;

var kpisRouter = require('./routes/kpis');
var chartsRouter = require('./routes/charts');
var settingsRouter = require('./routes/settings');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/kpi', kpisRouter);
app.use('/chart', chartsRouter);
app.use('/setting', settingsRouter);

// for production
if (app.settings.env === 'production') {
  app.use(express.static(path.join(__dirname, './client/build')));
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'));
  });
}

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  let message = err.message;
  let error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    error: 'respond with the error log :' + error.status + ' ; ' + message
  });
});

module.exports = app;
