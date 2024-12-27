'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      //user has many location
      
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fullname: DataTypes.STRING,
    avatar: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: DataTypes.DATE,
   
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false,
    underscored: true,
    tableName: 'users'
  });
  return User;
};