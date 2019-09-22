const User = (sequelize, DataTypes) => {
    sequelize.define('user', {
        // attributes
        email: {
          type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
          },
        name: {
            type: DataTypes.STRING
        },
      },
    { 
        timestamps: false
    })
}

module.exports = User