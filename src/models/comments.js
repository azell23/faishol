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
      // define association here
      this.belongsTo(models.events, {foreignKey: 'event_id'})
      this.belongsTo(models.users, {foreignKey: 'user_id'})
    }
  }
  comments.init({
    event_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    commentar: DataTypes.STRING,
    date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};