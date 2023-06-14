'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookevent extends Model {
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
  bookevent.init({
    event_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bookevent',
  });
  return bookevent;
};