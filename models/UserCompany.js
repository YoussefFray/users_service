module.exports = (sequelize, DataTypes) => {
    const UserCompany = sequelize.define(
      "UserCompany",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: DataTypes.INTEGER,
        companyId: DataTypes.INTEGER,
      },
      {}
    );
  
    return UserCompany;
  };
  