'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Groups","userIds")
  },

  async down (queryInterface, Sequelize) {
  
  }
};
