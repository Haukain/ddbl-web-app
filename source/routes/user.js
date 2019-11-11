var express = require('express')
var router = express.Router()
const User = require('../models').user;

console.log(User)

router.post('/create', function(req, res) {
  User.create({
    username: req.body.username,
    email: 'test-email',
    firstName: 'test-firstname',
    lastName: 'test-lastname',
    password: 'test-password',
  }).then(function() {
    res.send({stored:'ok'});
  });
});

router.get('/get', function (req, res) {
  User.findAll({
    username: req.body.username,
    email: 'test-email',
    firstName: 'test-firstname',
    lastName: 'test-lastname',
    password: 'test-password',
  }).then(function(users) {
    res.send(users)
  })
})

module.exports = router
