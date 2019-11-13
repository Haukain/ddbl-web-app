const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const db = {};

let sequelize;
if(process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        operatorsAliases: false,
        logging: false
    });
}
else {
    sequelize = new Sequelize('ddbl_web_app', 'ddbl_web_app', 'ddbl', {
        host: 'localhost',
        dialect: 'postgres',
        logging: console.log
    });
}

fs
.readdirSync(__dirname)
.filter(file =>
	(file.indexOf('.') !== 0) &&
	(file !== basename) &&
	(file.slice(-3) === '.js'))
.forEach(file => {
	const model = sequelize.import(path.join(__dirname, file));
	db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

// Uncomment for synchronisation with the database (with force:true drop the tables beforehand)
let force = false
sequelize.sync({ force: force })
  .then(() => {
    console.log(`Database & tables created!`)
    if(force) console.log(`Force update enabled, table were dropped`)

    //TEST USERS TO BE REMOVED
    if(force){
      let c = db.company.create({
        name: 'test-company',
      }).then(function(c) {
        return c
      })
      
      let r = db.role.create({
        name: 'test-role',
      }).then(function(r) {
        return r
      })
      
      let u = Promise.all([c,r]).then(function(e){
        defaultUser = db.user.create({
              email: 'test-email',
              firstName: 'test-firstname',
              lastName: 'test-lastname',
              password: 'test-password',
              companyId: e[0].id,
              roleId: e[1].id
        }).then(function(u) {
          return u
        })
      })
    }
  })

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;