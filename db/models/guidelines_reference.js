'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class guidelines_reference extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  guidelines_reference.init({
    chemical: DataTypes.STRING,
    upper_limit: DataTypes.DOUBLE,
    lower_limit: DataTypes.DOUBLE,
    type: DataTypes.STRING,
    org: DataTypes.STRING,
    exceeds_upper_limit_message: DataTypes.TEXT,
    exceeds_lower_limit_message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'guidelines_reference',
  });
  return guidelines_reference;
};