// taxiDriver model
module.exports = (sequelize, DataTypes) => {
    const TaxiDriver = sequelize.define(
      "TaxiDriver",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        // Add any additional fields specific to taxi drivers
      },
      {}
    );
  
    TaxiDriver.associate = function (models) {
      TaxiDriver.hasMany(models.Taxi, {
        foreignKey: 'driverId',
        onDelete: 'CASCADE', // Optional: cascade deletion if needed
      });
    };
  
    return TaxiDriver;
};
