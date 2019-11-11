var express = require('express')
var router = express.Router()
const Company = require('../models').company;

console.log(Company)

router.post('/create', function (req, res) {
    res.send('company create')
  })
  
  router.get('/get', function (req, res) {
    res.send('company get')
  })

module.exports = router