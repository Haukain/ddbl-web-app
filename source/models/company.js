const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
	var Company = sequelize.define('company', {
		description: { type: Sequelize.TEXT,allowNull: false },
		projectLeaderID: { type: Sequelize.INTEGER, allowNull: false },
	}, {
	});
    return Company;
};