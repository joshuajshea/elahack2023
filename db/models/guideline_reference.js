'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class guideline_reference extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  guideline_reference.init({
    chemical: DataTypes.STRING,
    upper_limit: DataTypes.DOUBLE,
    lower_limit: DataTypes.DOUBLE,
    units: DataTypes.STRING,
    type: DataTypes.STRING,
    org: DataTypes.STRING,
    exceeds_upper_limit_message: DataTypes.TEXT,
    exceeds_lower_limit_message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'guideline_reference',
  });
  return guideline_reference;
};