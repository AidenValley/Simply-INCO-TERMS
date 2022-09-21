'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('news', {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('news', null, {});
  }
};
