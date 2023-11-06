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
      units: {
        type: Sequelize.STRING
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
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('guideline_references');
  }
};