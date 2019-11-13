const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
	var Kpi = sequelize.define('kpi', {
		name: { type: Sequelize.STRING, allowNull: false },
		description: { type: Sequelize.TEXT, allowNull: true },
		status: { type: Sequelize.INTEGER, allowNull: false },
		easeOfMeasure: { type: Sequelize.INTEGER, allowNull: true },
		importance: { type: Sequelize.INTEGER, allowNull: true }
	}, {
	});

	Kpi.associate = function(models) {
		models.kpi.belongsTo(models.company, {foreignKey: { allowNull: false }})
		models.kpi.belongsTo(models.user, {foreignKey: 'createdByUserId', allowNull: false})
	  };

	return Kpi;
};