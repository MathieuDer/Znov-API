'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [{
      prenom: "Administrateur",
      nom: "ADMINISTRATEUR",
      email_perso: "admin@znov.com",
      email_ecole: "admin@ynov.com",
      password:  "$2b$07$FB83EKl7SrAG6tZsO0fuye0CLgvlmRR1wm8o2UPzWFb1kuIQY0j1q",
      telephone: "0123456789",
      adresse: "Nanterre, 95014",
      date_naissance: new Date(),
      ville_naissance: "Paris",
      classeId: null,
      roleId: 1,
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
