var express = require('express')
var router = express.Router()
const KpiDefinition = require('../models').kpiDefinition;

console.log(KpiDefinition)

router.post('/create', function (req, res) {
    res.send('kpi definition create')
  })
  
  router.get('/get', function (req, res) {
    res.send('kpi definition get')
  })

module.exports = router