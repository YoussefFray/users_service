// taxi model
module.exports = (sequelize, DataTypes) => {
    const Taxi = sequelize.define(
      "Taxi",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        model: DataTypes.STRING,
        brand: DataTypes.STRING,
        plateNumber: DataTypes.STRING,
        // Add any additional fields specific to taxis
      },
      {}
    );
  
    Taxi.associate = function (models) {
      Taxi.belongsTo(models.TaxiDriver, {
        foreignKey: 'driverId',
      });
    };
  
    return Taxi;
};
