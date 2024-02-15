module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "User",
      {
        userId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        birthday: DataTypes.DATE,
      },
      {}
    );
  
    User.associate = function (models) {
      User.belongsToMany(models.Company, {
        through: "UserCompany", // Name of the intermediate table
        foreignKey: "userId",
      });
    };
  
    return User;
  };
  