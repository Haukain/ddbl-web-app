var express = require('express')
var router = express.Router()
const Kpi = require('../models').kpi;

console.log(Kpi)

router.post('/create', function (req, res) {
  res.send('kpi create')
})

router.get('/get', function (req, res) {
  res.send('kpi get')
})

module.exports = router