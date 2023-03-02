const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/CatchAsync');
const User = require('../models/users.model');
const Reviews = require('../models/reviews.model');
const Restaurants = require('../models/restaurants.models');
const Orders = require('../models/orders.model');

exports.protect = catchAsync(async(req, res, next) => {

    //1. Verificar que el token llegue
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1]
  }
  if(!token){
    return next(new AppError('You are not logged in!, please log in to get access', 401))
  }
  //2. Verificar el token 
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_JWT_SEED)

  //verificar que el usuario exista

  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: true,
    }
  });

  if(!user){
    return next(new AppError('The user of this token was not found'))
  }

  req.sessionUser = user;



  next();
});

exports.protectAccountOwner = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: true
    }
  });

  if(!user){
    return next(new AppError('User not found',404))
  }

  if (user.id !== sessionUser.id) {
    return next(new AppError('You do not own this account.', 401));
  }

  next();
});

exports.protectAccountOwnerReview = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { restaurantId, id } = req.params;
  
  const review = await Reviews.findOne({
    where: {
      restaurantId,
      id,
      status: 'active'
    }
  });



  if(!review){
    return next(new AppError('The review could not found', 404))
  };
  if (sessionUser.id !== review.userId) {
    return next(new AppError('You do not own this account.', 401));
  };

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.sessionUser.role)){
      return next(new AppError('You do not have permission to perform this action!', 403))
    };
    next();
  };

};

exports.protectOrderOwner = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { id } = req.params;

  const findOrderByUserId = await Orders.findOne({
    where: {
      id
    }
  });

  if(!findOrderByUserId){
    return next(new AppError('Order not found', 404))
  }

  

  if (findOrderByUserId.userId !== sessionUser.id) {
    return next(new AppError('You are not the owner of this order.', 401));
  }

  next();
});