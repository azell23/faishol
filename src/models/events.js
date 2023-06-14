'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.comments, {foreignKey: 'event_id'}),
      this.hasMany(models.bookevent, {foreignKey: 'event_id'})
    }
  }
  events.init({
    name: DataTypes.STRING,
    date: DataTypes.STRING,
    image_poster: DataTypes.STRING,
    image_surat: DataTypes.STRING,
    pdf_file: DataTypes.STRING,
    location: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    createdBy: DataTypes.STRING,
    author: DataTypes.STRING,
    email: DataTypes.STRING,
    contact_person: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'events',
  });
  return events;
};