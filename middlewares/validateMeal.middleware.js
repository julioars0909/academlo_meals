const Meals = require("../models/meals.model");
const Orders = require("../models/orders.model");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/CatchAsync");

exports.validateMeal = catchAsync(async(req, res, next) => {
  
  const {mealId} = req.body;

  //buscar que la comida exista a traves del mealId

  const findMeal = await Meals.findOne({
    where: {
      id: mealId,
      status: true
    },
  });

if(!findMeal){
    return next(new AppError('The meal could not found', 404))
  };

  const findOrder = await Orders.findOne({
    where: {
      id: mealId
    }

  })

  if(!findOrder){
    return next(new AppError('The meal could not found', 404))
  };

  next();
});