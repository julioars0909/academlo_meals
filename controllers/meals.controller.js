const catchAsync = require("../utils/CatchAsync")
const Meals = require('../models/meals.model');
const AppError = require("../utils/AppError");
const Restaurants = require("../models/restaurants.models");

exports.getAllMeals = catchAsync(async(req, res, next) => {

  const findMeals = await Meals.findAll({
    where: {
      status: true
    },
    include: [
      {
        model: Restaurants
      }
    ]
  });

  res.status(200).json({
    status: 'success',
    message: 'The meals was found successfully',
    findMeals
  });
});

exports.getOneMeals = catchAsync(async(req, res, next) => {

  const {id} = req.params;



  const findMeal = await Meals.findOne({
    where: {
      id,
      status: true
    },
    include: [
      {
        model: Restaurants
      }
    ]
  });

if(!findMeal){
    return next(new AppError('The meal could not found'))
  };


  

  res.status(200).json({
    status: 'success',
    message: 'The meal was found successfully',
    findMeal,
  });
});



exports.createMeals = catchAsync(async(req, res, next) => {

  const {name, price, restaurantId } = req.body;
  

  const newMeal = await Meals.create({
    restaurantId,
    name,
    price,
  });

  res.status(200).json({
    status: 'success',
    message: 'Meal created successfully',
    newMeal

  });
});

exports.updateMeals = catchAsync(async(req, res, next) => {

  const {id} = req.params;
  const {name, price} = req.body;

  const findMeal = await Meals.findOne({
    where: {
      id,
      status: true
    }
  });

  if(!findMeal){
    return next(new AppError('The meal could not found'))
  };

  const updateMeal = await findMeal.update({
    name,
    price
  })

  res.status(200).json({
    status: 'success',
    message: 'Meal updated successfully',
    updateMeal,
  })
})

exports.deleteMeals = catchAsync(async(req, res, next) => {

  const {id} = req.params;

  const findMeal = await Meals.findOne({
    where: {
      id,
      status: true
    }
  });

  if(!findMeal){
    return next(new AppError('The meal could not found'))
  };

  const eliminateMeal = await findMeal.update({status: false})

  res.status(200).json({
    status: 'success',
    message: 'Meal eliminated successfully',
    eliminateMeal
  });
});
