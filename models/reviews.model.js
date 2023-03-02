const { DataTypes } = require("sequelize");
const { db } = require("../database/db");


const Reviews = db.define('reviews', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status:{
    type: DataTypes.ENUM('active', 'deleted'),
    defaultValue: 'active',
    allowNull: false,
  },

  rating: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5
    },
    allowNull: false
  }
});

module.exports = Reviews;