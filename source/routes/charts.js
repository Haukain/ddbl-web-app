var express = require('express');
var router = express.Router();
const Kpi = require('../models').kpi;
const check = require('./utils/check');

check(router)

//
// Visualization panel routes
//

const KpiDefinitionState = {
  UNDEFINED: 0,
  PARTIALLY_DEFINED: 1,
  DEFINED: 2
};

function completionState(kpi){
  fields = [
    kpi.purpose,
    kpi.customers,
    kpi.datasources,
    kpi.formula,
    kpi.resources,
    kpi.problems,
    kpi.targets,
    kpi.outcomes,
    kpi.cost
  ]

  if(fields.every((e)=>e!==null)){
    return KpiDefinitionState.DEFINED
  }
  else if(fields.every((e)=>e===null)){
    return KpiDefinitionState.UNDEFINED
  }
  else {
    return KpiDefinitionState.PARTIALLY_DEFINED
  }
}

router.get('/completion-percentage/:companyId/:userId', function(req, res) {
  Kpi.findAll().then((kpis) => {
      states = kpis.map(k => completionState(k))
      data = {
        defined:states.filter(s=>s==KpiDefinitionState.DEFINED).length,
        partially:states.filter(s=>s==KpiDefinitionState.PARTIALLY_DEFINED).length,
        undefined:states.filter(s=>s==KpiDefinitionState.UNDEFINED).length
      }
      res.send({success:data}) 
    }
  );
});

router.get('/kpi-score/:companyId/:userId', function(req, res) {
  Kpi.findAll().then((kpis) => {
      //TODO : remove this
      // placeholder until shortlisting is implemented
      for(let k of kpis){
        k.importance = Math.round(Math.random()*10)
        k.easeofmeasure = Math.round(Math.random()*10)
        k.status = Math.random()<0.75?0:1
      }
      scores = kpis
      .filter(k => k.status>=1)
      .map(k => ({name:k.name,score:(k.importance!=null&&k.easeofmeasure!=null)?k.importance*k.easeofmeasure:null}))
      .filter(k => k.score!=null)
      .sort(function(a, b){return b.score-a.score});
      res.send({success:scores})
    }
  );
});

router.get('/kpi-score/:companyId/:userId', function(req, res) {
  Kpi.findAll().then((kpis) => {
      kpis[1].importance = 5
      kpis[1].easeofmeasure = 7
      scores = kpis.map(k => ({name:k.name,score:(k.importance!=null&&k.easeofmeasure!=null)?k.importance*k.easeofmeasure:null}))
      .filter(k => k.score!=null)
      res.send({success:scores})
    }
  );
});

module.exports = router;
