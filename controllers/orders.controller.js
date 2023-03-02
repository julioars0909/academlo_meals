const Meals = require("../models/meals.model");
const Orders = require("../models/orders.model");
const Restaurants = require("../models/restaurants.models");
const User = require("../models/users.model");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/CatchAsync")



exports.findOrdersByUsers = catchAsync(async(req, res, next) => {

  const { sessionUser } = req;

  

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

  res.status(200).json({
    status: 'success',
    message: 'The orders was found successfully',
    user
  });
});

exports.createOrder = catchAsync(async(req, res, next) => {

  const {quantity, mealId, userId, totalPrice} = req.body;

  const findMeal = await Meals.findOne({
    where: {
      id: mealId,
    },
  });



if(!findMeal){
    return next(new AppError('The meal could not found'))
  };

  const newOrder = await Orders.create({
    quantity,
    mealId,
    userId,
    totalPrice
  });

  const qty = newOrder.quantity
  const price = findMeal.price
  const total = qty * price

  const orderCompleted = await Orders.create({
    
    totalPrice: total,
    mealId: newOrder.mealId,
    quantity: newOrder.quantity,
    userId: newOrder.userId
  })
  
  res.status(200).json({
    status: 'success',
    message: 'Order completed',
    orderCompleted: {
      id: orderCompleted.id,
      totalPrice: orderCompleted.totalPrice,
      mealId: orderCompleted.mealId,
      quantity: orderCompleted.quantity
    }
    
    
    
  });
});

exports.completeOrder = catchAsync(async(req, res, next) => {

  const {id} = req.params;

  const findOrder = await Orders.findOne({
    where: {
      id,
      status: 'active'
    }
  });

  if(!findOrder){
    return next(new AppError('Order not found'))
  };

  const OrderCompleted = await findOrder.update({status: 'completed'})

  
  res.status(200).json({
    status: 'success',
    message: 'The order completed successfully',
    OrderCompleted
  });
});

exports.cancelOrder = catchAsync(async(req, res, next) => {

  const {id} = req.params;

  const findOrder = await Orders.findOne({
    where: {
      id,
      status: 'active'
    }
  });

  if(!findOrder){
    return next(new AppError('Order not found'))
  };

  const OrderCompleted = await findOrder.update({status: 'cancelled'})
  
  res.status(200).json({
    status: 'success',
    message: 'Order cancelled successfully',
    OrderCompleted
  });
});