const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
	var Kpi = sequelize.define('kpi', {
		description: { type: Sequelize.TEXT, allowNull: false },
		status: { type: Sequelize.INTEGER, allowNull: false },
		easeOfMeasure: { type: Sequelize.INTEGER, allowNull: false },
		importance: { type: Sequelize.INTEGER, allowNull: false }
	}, {
	});

	Kpi.associate = function(models) {
		models.kpi.belongsTo(models.company)
		models.kpi.belongsTo(models.user, {foreignKey: 'createdByUserId'})
	  };

	return Kpi;
};