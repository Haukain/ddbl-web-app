/**
 * @ignore
 */
var express = require('express');
/**
 * @ignore
 */
var router = express.Router();
/**
 * @ignore
 */
const Kpi = require('../models').kpi;
/**
 * @ignore
 */
const check = require('./utils/check');

check(router)

//
// Visualization panel routes
//

/**
 * TODO
 */
const KpiDefinitionState = {
  UNDEFINED: 0,
  PARTIALLY_DEFINED: 1,
  DEFINED: 2
};

/**
 * TODO
 */
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
      scores = kpis
      .filter(k => k.status>=1)
      .map(k => ({name:k.name,score:(k.importance!=null&&k.easeOfMeasure!=null)?k.importance*k.easeOfMeasure:null}))
      .filter(k => k.score!=null)
      .sort(function(a, b){return b.score-a.score});
      res.send({success:scores})
    }
  );
});

module.exports = router;
