'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compras extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Compras.belongsTo(models.Revendedores, { foreignKey: 'revendedores_id' });
    }
  };
  Compras.init({
    valor: DataTypes.DECIMAL,
    percent_cashback: DataTypes.FLOAT,
    cashback: DataTypes.DECIMAL,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Compras',
  });
  return Compras;
};