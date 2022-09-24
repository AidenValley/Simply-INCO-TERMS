'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class news extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.news.belongsTo(models.user);
      models.news.hasMany(models.comments);
    }
  }
  news.init({
    title: DataTypes.STRING,
    summary: DataTypes.TEXT,
    author: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'news',
  });
  return news;
};