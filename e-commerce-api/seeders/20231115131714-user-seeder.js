'use strict';

/** @type {import('sequelize-cli').Migration} */
const { faker } = require('@faker-js/faker');
const users = [...Array(100)].map((user) => (
  {
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(8),
    dob: faker.date.between('1970-01-01', '2002-12-31'),
    profileImage: faker.image.avatar(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
))
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', users, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};