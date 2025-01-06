'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, // Ensure the name field is required
      },
      mobile: {
        type: Sequelize.STRING(15), // Set a length limit for mobile
        unique: true, // Ensure the mobile number is unique
        allowNull: false, // Ensure the mobile number field is required
      },
      address: {
        type: Sequelize.TEXT,
      },
      postCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0, // Set the default value of postCount to 0
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW, // Automatically set the current timestamp
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW, // Automatically set the current timestamp
      },
    });

    // Add index on mobile for performance
    await queryInterface.addIndex('Users', ['mobile']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
