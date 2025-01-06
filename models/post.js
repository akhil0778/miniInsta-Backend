'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // A Post belongs to a User
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }

  Post.init({
    title: {
      type: DataTypes.TEXT,
      allowNull: false, // Ensure title is required
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false, // Ensure description is required
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    images: {
      type: DataTypes.TEXT,
    }
  }, {
    sequelize,
    modelName: 'Post',
  });

  return Post;
};
