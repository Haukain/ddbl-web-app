const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define('user', {
		email: { type: Sequelize.STRING, allowNull: false },
		firstName: { type: Sequelize.STRING, allowNull: false},
		lastName: { type: Sequelize.STRING, allowNull: false },
		password: { type: Sequelize.STRING, allowNull: false },
		department: { type: Sequelize.STRING, allowNull: true }
	}, {
	});
	
	User.associate = function(models) {
		models.user.belongsTo(models.company)
		models.user.belongsTo(models.role)
	  };

	return User;
};