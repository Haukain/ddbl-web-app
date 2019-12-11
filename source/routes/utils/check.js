const Company = require('../../models').company;
const User = require('../../models').user;

function checkCompany(companyId, res, next) {
    Company.findOne({ where: { id: companyId } })
      .then(function(c) {
        if (c) {
          next(); // sucess : company found
        } else {
          res.status(404);
          res.send({ error: 'companyId unknown' });
        }
      })
      .catch(function(err) {
        next(err);
      });
  }
  
function checkUser(userId, res, next) {
    User.findOne({ where: { id: userId } })
      .then(function(u) {
        if (u) {
          next(); // success : user found
        } else {
          res.status(404);
          res.send({ error: 'userId unknown' });
        }
      })
      .catch(function(err) {
        next(err);
      });
  }

// Check company on get routes
module.exports = function addChecksOnRouter(router){
    router.param('companyId', function(req, res, next, param) {
    checkCompany(param, res, next);
    });
    // Check user on get routes
    router.param('userId', function(req, res, next, param) {
    checkUser(param, res, next);
    });
    
    // Check company on post routes
    router.post('*', function(req, res, next) {
    if (req.body.companyId) {
        checkCompany(req.body.companyId, res, next);
    } else {
        res.status(400);
        res.send({ error: 'No companyId provided' });
    }
    });
    // Check user on post routes
    router.post('*', function(req, res, next) {
    if (req.body.userId) {
        checkUser(req.body.userId, res, next);
    } else {
        res.status(400);
        res.send({ error: 'No userId provided' });
    }
    });
}