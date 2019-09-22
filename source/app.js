var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
// var passport   = require('passport')
// var session    = require('express-session')

var db = require('./models/db')

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// For Passport
// app.use(session({ secret: 'basicsecretkey',resave: true, saveUninitialized:true})); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// Public directories
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, './client/build')));

// var usersRouter = require('./routes/users')(passport);
// app.use('/api/u', usersRouter);

if(app.settings.env === 'production')
{
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'));
  })
}

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