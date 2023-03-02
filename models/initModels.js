const Meals = require("./meals.model");
const Orders = require("./orders.model");
const Restaurants = require("./restaurants.models");
const Reviews = require("./reviews.model");
const User = require("./users.model");

const initModel = () => {

  User.hasMany(Orders)
  Orders.belongsTo(User)

  User.hasMany(Reviews)
  Reviews.belongsTo(User)
  
  Restaurants.hasMany(Reviews)
  Reviews.belongsTo(Restaurants)

  Restaurants.hasMany(Meals)
  Meals.belongsTo(Restaurants)


  Meals.hasOne(Orders)
  Orders.belongsTo(Meals)

 

};

module.exports = initModel;