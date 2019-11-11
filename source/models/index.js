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
        dialect: 'postgres'
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
// sequelize.sync({ force: process.env.DATABASE_URL ? false : true })
//   .then(() => {
//     console.log(`Database & tables created!`)
//   })

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;