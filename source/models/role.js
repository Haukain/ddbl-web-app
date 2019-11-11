const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
	var Role = sequelize.define('role', {
		description: { type: Sequelize.TEXT, allowNull: true }
	}, {
	});
	return Role;
};