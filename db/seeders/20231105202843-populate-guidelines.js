'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('guideline_references', [{
      chemical: 'Aluminum',
      upper_limit: '2.9',
      lower_limit: '0.0',
      units: 'mg/L',
      type: 'DRINK',
      org: 'CDNGOV',
      exceeds_upper_limit_message: 'The ammount of Aluminum found in this sample can cause neuromuscular effects (hind- and fore-limb grip strength, foot splay), urinary tract effects and general toxicity when consumed.',
      exceeds_lower_limit_message: 'N/A'
    },
    {
      chemical: 'Nitrite',
      upper_limit: '3',
      lower_limit: '0.0',
      units: 'mg/L',
      type: 'DRINK',
      org: 'CDNGOV',
      exceeds_upper_limit_message: 'The ammount of Nitrite found in this sample can cause methaemoglobinaemia (blue baby syndrome) in bottle-fed infants less than 6 months of age. Identified as potential carcinogen.',
      exceeds_lower_limit_message: 'N/A'
    },
    {
      chemical: 'Lead',
      upper_limit: '0.005',
      lower_limit: '0.0',
      units: 'mg/L',
      type: 'DRINK',
      org: 'CDNGOV',
      exceeds_upper_limit_message: 'The ammount of Lead found in this sample can cause reduced intelligence in children measured as decreases in IQ is the most sensitive and well established health effect of lead exposure. There is no known safe exposure level to lead. Guidelines state as low as possible.',
      exceeds_lower_limit_message: 'N/A'
    },
    {
      chemical: 'Manganese',
      upper_limit: '0.12',
      lower_limit: '0.0',
      units: 'mg/L',
      type: 'DRINK',
      org: 'CDNGOV',
      exceeds_upper_limit_message: 'The ammount of Manganese found in this sample can cause effects on neurological development and behaviour; deficits in memory, attention, and motor skills.',
      exceeds_lower_limit_message: 'N/A'
    },
    {
      chemical: 'Mercury',
      upper_limit: '0.001',
      lower_limit: '0.0',
      units: 'mg/L',
      type: 'DRINK',
      org: 'CDNGOV',
      exceeds_upper_limit_message: 'The ammount of Mercury found in this sample can cause irreversible neurological symptoms',
      exceeds_lower_limit_message: 'N/A'
    },
    {
      chemical: 'pH',
      upper_limit: '7.0',
      lower_limit: '10.5',
      units: 'N/A',
      type: 'ECO',
      org: 'CDNGOV',
      exceeds_upper_limit_message: 'The control of pH is important to maximize treatment effectiveness, control corrosion and reduce leaching from distribution system and plumbing components.',
      exceeds_lower_limit_message: 'The control of pH is important to maximize treatment effectiveness, control corrosion and reduce leaching from distribution system and plumbing components.'
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('guideline_references', null, {});
  }
};
