'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('guideline_references', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chemical: {
        type: Sequelize.STRING
      },
      upper_limit: {
        type: Sequelize.DOUBLE
      },
      lower_limit: {
        type: Sequelize.DOUBLE
      },
      type: {
        type: Sequelize.ENUM('DRINK', 'ECO')
      },
      org: {
        type: Sequelize.ENUM('CDNGOV', 'WHO', 'CMME')
      },
      exceeds_upper_limit_message: {
        type: Sequelize.TEXT
      },
      exceeds_lower_limit_message: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('guidelines_references');
  }
};