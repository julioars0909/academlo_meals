const Restaurants = require("../models/restaurants.models");
const Reviews = require("../models/reviews.model");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/CatchAsync");


exports.findAllRestaurants = catchAsync(async(req, res, next) => {

  const findRestaurants = await Restaurants.findAll({

    where: {
      status: true
    },
    include: [
      {
        model: Reviews
      }
    ]
  })

  res.status(200).json({
    status: 'success',
    message: 'The restaurants was found successfully',
    findRestaurants
  });
});

exports.findOneRestaurant = catchAsync(async(req, res, next) => {

  const { id } = req.params;

  const findRestaurant = await Restaurants.findOne({
    where: {
      id,
      status: true,
    },
    include: [
      {
        model: Reviews
      }
    ]
  });

  res.status(200).json({
    status: 'success',
    message: 'Restaurant found successfully',
    findRestaurant,
  });
});

exports.createRestaurant = catchAsync(async(req, res, next) => {

  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurants.create({
    name,
    address,
    rating,
  });

  res.status(200).json({
    status: 'success',
    message: 'The restaurant has been created',
    newRestaurant,
  });
});

exports.updateRestaurant = catchAsync(async(req, res, next) => {

  const { name, address } = req.body;
  const { id } = req.params;

  const findRestaurant = await Restaurants.findOne({
    where: {
      id,
      status: true,
    }
  });

  if(!findRestaurant){
    return next(new AppError('Restaurant not found', 404))
  };

  const upInfoRestaurant = await findRestaurant.update({
    name,
    address,
  });


  res.status(200).json({
    status: 'success',
    message: 'The restaurant was updated successfully',
    upInfoRestaurant

  })
})

exports.deleteRestaurant = catchAsync(async(req, res, next) => {

  const { id } = req.params;

  const findRestaurant = await Restaurants.findOne({
    where: {
      id,
      status: true,
    }
  });

  if(!findRestaurant){
    return next(new AppError('Restaurant not found', 404))
  };

  const restaurantDelete = await findRestaurant.update({status: false})

  res.status(200).json({
    status: 'success',
    message: 'Restaurant deleted successfully',
    restaurantDelete,
  })
})

exports.createReview = catchAsync(async(req, res, next) => {

  const { comment, rating, restaurantId, userId } = req.body;
  const { id } = req.params;

  const findRestaurant = await Restaurants.findOne({
    where: {
      id,
      status: true,
    }
  });

  if(!findRestaurant){
    return next(new AppError('Restaurant not found', 404))
  };

  const newReview = await Reviews.create({
    comment,
    rating,
    restaurantId,
    userId,
  });

  res.status(200).json({
    status: 'success',
    message: 'Review created successfully',
    newReview
  });
});

exports.updateReview = catchAsync(async(req, res, next) => {

  const { comment, rating } = req.body;
  const { restaurantId, id } = req.params;

  const findReview = await Reviews.findOne({
    where: {
      restaurantId,
      id,
      status: 'active'
    }
  });

  if(!findReview){
    return next(new AppError('The review could not found', 404))
  };


  const reviewUpdate = await findReview.update({
    comment,
    rating,
  });

  
  res.status(200).json({
    status: 'success',
    message: 'Review updated successfully',
    
  });
});

exports.deleteReview = catchAsync(async(req, res, next) => {

  const { restaurantId, id } = req.params;

  const findReview = await Reviews.findOne({
    where: {
      restaurantId,
      id,
      status: 'active'
    }
  });

  console.log(findReview)
  

    const reviewDeleted =  findReview.update({status: 'deleted'})

  res.status(200).json({
    status: 'success',
    message: 'Review deleted successfully'
  })
})