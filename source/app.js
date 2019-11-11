var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

const db = require('./models').sequelize;
db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

var companyRouter = require('./routes/company')
var roleRouter = require('./routes/role')
var userRouter = require('./routes/user')
var kpiRouter = require('./routes/kpi')
var kpiDefinitionRouter = require('./routes/kpiDefinition')

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// for production
if(app.settings.env === 'production')
{
  app.use(express.static(path.join(__dirname, './client/build')));
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'));
  })
}

app.use('/c', companyRouter)
app.use('/r', roleRouter)
app.use('/u', userRouter)
app.use('/k', kpiRouter)
app.use('/d', kpiDefinitionRouter)

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
  res.send('respond with the error log :' + error.status + " ; " + message);
});

module.exports = app;