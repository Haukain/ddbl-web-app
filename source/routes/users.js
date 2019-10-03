//WIP

module.exports = function(passport){
    
  var express = require('express');
  var router = express.Router();
  var User  = require('../models/db').sequelize.models.user;

  //load passport strategies
  require('../authentication/passport')(passport, User);

  /* GET users listing. */
  router.get('/',isLoggedIn, function(req, res, next) {
    User.findAll().then(users => {
      res.send(users);
    })
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
    {
      console.log("oui")
      return next();
    }
    res.send([]);
  }

  router.post('/signup', function(req, res, next ){
    console.log(req.isAuthenticated())
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) { return next(err) }
      if (!user) { return res.json( { message: info.message }) }
      res.json(user);
    })(req, res, next); 
  });

  router.post('/login', function(req, res, next ){
    console.log(req.isAuthenticated())
    passport.authenticate('local-login', function(err, user, info) {
      if (err) { return next(err) }
      if (!user) { return res.json( { message: info.message }) }
      res.json(user);
    })(req, res, next); 
  });

  router.post('/logout', function(req, res, next) {
    res.send({})
  })

  return router
}
