'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class als_report_results extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  als_report_results.init({
    als_id: DataTypes.STRING,
    sample_id: DataTypes.STRING,
    temp: DataTypes.DOUBLE,
    ph: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'als_report_results',
  });
  return als_report_results;
};