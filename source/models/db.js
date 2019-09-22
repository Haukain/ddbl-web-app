const db = {}

const Sequelize = require('sequelize');

if(process.env.DATABASE_URL){
  db.sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    logging:  true
  })
}
else {
  db.sequelize = new Sequelize('ddbl_web_app', 'ddbl_web_app', 'ddbl', {
    host: 'localhost',
    dialect: 'postgres'
  })
}

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

var models = [
    'user'
  ];
  models.forEach(function(model) {
    db.sequelize[model] = db.sequelize.import(model);
  });

module.exports = db;