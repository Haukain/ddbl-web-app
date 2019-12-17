var express = require('express');
var router = express.Router();
const Kpi = require('../models').kpi;
const check = require('./utils/check');

check(router)

//
// Longlist, shortlist, definition step routes
//

function checkForInListNameDuplicates(list){
  for(let [i,x] of list.entries())
    for(let [j,y] of list.entries()){
      if(i !== j && x.name===y.name){
        return true
      }
    }
  return false
}

function checkForInDatabaseNameDuplicates(list){
  let promises = []
  for(let k of list){
    promises.push(
      Kpi.findOne({ where: { name: k.name }} )
    )
  }
  return Promise.all(promises)
  .then( res => {
    console.log(res)
    if(res.every(e => e===null)) return false
    else return true
  })
  .catch( err => {
    console.error(err)
    return true
  })
}

router.post('/', function(req, res, next) {
  let promises = [];
  checkForInDatabaseNameDuplicates(req.body.kpis).then(
    dbCheck => {
      let listCheck = checkForInListNameDuplicates(req.body.kpis)
      
      let bothChecks = listCheck || dbCheck

      if(bothChecks){
        res.status(400);
        res.send({ error: 'List contains duplicated kpis' });
      }
      else{
        for (let k of req.body.kpis) {
          promises.push(
            Kpi.create({
              name: k.name,
              description: null,
              status: 0,
              easeOfMeasure: null,
              importance: null,
              companyId: req.body.companyId,
              createdByUserId: req.body.userId
            })
          );
        }
      
        Promise.all(promises)
          .then(function(e) {
            res.send({ success: e });
          })
          .catch(function(err) {
            next(err);
          });   
      }
    }
  )
});

router.get('/:companyId/:userId', function(req, res) {
  Kpi.findAll().then(function(k) {
    res.send({success:k});
  });
});

router.get('/:companyId/:userId/names', function(req, res) {
  Kpi.findAll().then(function(k) {
    res.send({success:k.map((k)=>({id:k.id,name:k.name}))});
  });
});

router.get('/:companyId/:userId/:kpiId', function(req, res, next) {
  Kpi.findOne({ where: { id: req.params.kpiId }} ).then(function(k) {
    res.send({success:k});
  })
  .catch(function(err) {
    next(err);
  });
});

router.post('/definition', function(req, res, next) {
  if(req.body.definition){
    if (req.body.kpiId) {
      Kpi.findOne({ where: { id: req.body.kpiId } })
      .then(function(k) {
        if (k) {
          k.update({
            purpose: req.body.definition.purpose,
            customers: req.body.definition.customers,
            datasources:  req.body.definition.datasources,
            formula: req.body.definition.formula,
            resources:  req.body.definition.resources,
            problems: req.body.definition.problems,
            targets: req.body.definition.targets,
            outcomes: req.body.definition.outcomes,
            cost: req.body.definition.cost,
            definedByUserId : req.body.userId,
            status: 3,
          })
          .then(function(k) {
            res.send({ success: k });
          })
          .catch(function(err){
            next(err)
          })
        } else {
          res.status(404);
          res.send({ error: 'kpiId unknown' });
        }
      })
      .catch(function(err) {
        next(err);
      });
    } else {
      res.status(400);
      res.send({ error: 'No kpiId provided' });
    }
  }
  else {
    res.status(400);
    res.send({ error: 'No kpi definition provided' });
  }
});

router.post('/shortlist', function(req, res, next) {
  let findPromises = []
  let updatePromises = []
  for(let o of req.body.kpisToSave){
    if (o.kpiId) {
      findPromises.push(
        Kpi.findOne({ where: { id: o.kpiId } })
        .then(function(k) {
          updatePromises.push(
            k.update({
              easeOfMeasure: o.score.easeOfMeasure,
              importance: o.score.importance,
              status: o.shortlisted?2:1,
            })
          );
        })
      )
    }
  }
  Promise.all(findPromises)
    .then(function(found) {
      Promise.all(updatePromises)
      .then(function(updated) {
        res.send({ success: updated });
      })
      .catch(function(err) {
        next(err);
      });
    })
    .catch(function(err) {
      next(err);
    });
});

module.exports = router;
