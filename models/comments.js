'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.comments.belongsTo(models.news);
      models.comments.belongsTo(models.user);
    }
  }
  comments.init({
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    newsId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};