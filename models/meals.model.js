const { DataTypes } = require("sequelize");
const { db } = require("../database/db");

const Meals = db.define('meals', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
});

module.exports = Meals;

