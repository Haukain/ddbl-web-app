const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
	var Company = sequelize.define('company', {
		name : { type: Sequelize.STRING,allowNull: false },
		description: { type: Sequelize.TEXT,allowNull: true }
	}, {
	});
    return Company;
};