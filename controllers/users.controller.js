const Meals = require("../models/meals.model");
const Orders = require("../models/orders.model");
const Restaurants = require("../models/restaurants.models");
const User = require("../models/users.model");
const AppError  = require("../utils/AppError");
const  catchAsync  = require("../utils/CatchAsync");

exports.findAllOrders = catchAsync(async(req, res, next) => {

  //Hacer un middleware para esta funcion
  const { sessionUser } = req;

  const findOrders = await User.findOne({
    where: {
      id: sessionUser.id
    },
    include: [
      {
        model: Orders,
        include: [
          {
            model: Meals,
            include: [
              {
                model: Restaurants
              }
            ]
          }
        ]
      }
    ]
  });

  res.status(200).json({
    status: 'success',
    message: 'The orders was found',
    findOrders,
  });


});

exports.findOneOrder = catchAsync(async(req, res, next) => {
  const { sessionUser } = req;
  const {id} = req.params;

  const findOrder = await Orders.findOne({
    where: {
      id,
      status: 'active'
    }
  })
//Hacer un middleware para esta funcion
  const user = await User.findOne({
    where: {
      id: sessionUser.id
    },
    include: [
      {
        model: Orders,
        include: [
          {
            model: Meals,
            include: [
              {
                model: Restaurants
              }
            ]
          }
        ]
      }
    ]
  });

  if(!findOrder){
    return next(new AppError('Order not found',404))
  }

  res.status(200).json({
    status: 'success',
    message: 'The order was found',
    findOrder,
    user,
  });

});
exports.updateUser = catchAsync(async(req, res, next) => {

  const {name, email} = req.body;
  const {id} = req.params;

  const findUser = await User.findOne({
    where: {
      id,
      status: true
    }
  });


  if(!findUser){
    return next(new AppError('User not found',404))
  }

  const updatedUser = findUser.update({
    name,
    email
  });

  return res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
    updatedUser: {
      name,
      email
    }
  });

});
exports.deleteUser = catchAsync(async(req, res, next) => {

  const {id} = req.params;

  const findUser = await User.findOne({
    where: {
      id,
      status: true
    }
  });


  if(!findUser){
    return next(new AppError('User not found',404))
  }

  const userDelete = findUser.update({status: false})

  return res.status(200).json({
    status: 'success',
    message: 'user eliminated successfully',
  });

});