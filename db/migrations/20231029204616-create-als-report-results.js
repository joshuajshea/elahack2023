'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('als_report_results', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      analyte: {
        type: Sequelize.STRING
      },
      als_sample_id: {
        type: Sequelize.STRING
      },
      client_sample_id: {
        type: Sequelize.STRING
      },	
      method: {
        type: Sequelize.STRING 
      },	
      results: {
        type: Sequelize.DOUBLE 
      },	
      detection_limit: {
        type: Sequelize.DOUBLE 
      }, 
      units: {
        type: Sequelize.STRING 
      },	
      date_sampled: {
        type: Sequelize.DATE 
      },	
      analysis_date: {
        type: Sequelize.DATE 
      },
      processed: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('als_report_results');
  }
};