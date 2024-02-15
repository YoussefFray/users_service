module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define(
      "Company",
      {
        companyId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        city: DataTypes.STRING,
        country: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
      },
      {}
    );
  
    Company.associate = function (models) {
      Company.belongsToMany(models.User, {
        through: "UserCompany", // Name of the intermediate table
        foreignKey: "companyId",
      });
    };
  
    return Company;
  };
  