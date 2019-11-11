var express = require('express')
var router = express.Router()
const Role = require('../models').role;

console.log(Role)

router.post('/create', function (req, res) {
  res.send('role create')
})

router.get('/get', function (req, res) {
  res.send('role get')
})

module.exports = router