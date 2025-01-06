'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // A User has many Posts
      User.hasMany(models.Post, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Ensure name is required
    },
    mobile: {
      type: DataTypes.STRING(15),
      unique: true, // Ensure mobile is unique
      allowNull: false, // Ensure mobile is required
      validate: {
        is: /^[0-9]+$/, // Validate mobile to be numeric
      }
    },
    address: {
      type: DataTypes.TEXT,
    },
    postCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // Default postCount value is 0
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
