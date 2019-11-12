var express = require('express')
var router = express.Router()
const Company = require('../models').company;
const User = require('../models').user;
const Kpi = require('../models').kpi;

function checkUser(userId,res,next){
  User.findOne({ where: {id: userId} })
  .then(function(u){
    if(u){
      next() // success : user found
    }
    else{
      res.status(404);
      res.send({error:'User unknown'});
    }
  })
  .catch(function (err) {
    next(err)
  });
}

function checkCompany(companyId,res,next){
  Company.findOne({ where: {id: companyId} })
  .then(function(c){
    if(c){
      next() // sucess : company found
    }
    else{
      res.status(404);
      res.send({error:'Company unknown'});
    }
  })
  .catch(function (err) {
    next(err)
  });
}

// Check company on get routes
router.param('companyId', function (req, res, next, param) {
  checkCompany(param,res,next)
})
// Check user on get routes
router.param('userId', function (req, res, next, param) {
  checkUser(param,res,next)
})

// Check company on post routes
router.post('*', function (req, res, next) {
  console.log(req.body)
  if(req.body.companyId){
    checkCompany(req.body.companyId,res,next)
  }
  else{
    res.status(400);
    res.send({error:'No CompanyId provided'});
  }
})
// Check user pn post routes
router.post('*', function (req, res, next) {
  if(req.body.userId){
    checkUser(req.body.userId,res,next)
  }
  else{
    res.status(400);
    res.send({error:'No UserId provided'});
  }
})

router.post('/', function (req, res, next) {
  let promises = []
  //TODO: Don't save KPI if it has the same company and name
  for(let k of req.body.kpis){
    promises.push(Kpi.create({
      name: k.name,
      description: null,
      status: 0,
      easeOfMeasure: null,
      importance: null,
      companyId: req.body.companyId,
      createdByUserId: req.body.userId
    }))
  }
  Promise.all(promises).then(function(e){
    res.send({success:e})
  })
  .catch(function (err) {
    next(err)
  })
})

router.get('/:companyId/:userId', function (req, res) {
  Kpi.findAll()
  .then(function(k){
    res.send(k)
  })
})

module.exports = router