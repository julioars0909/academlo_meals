const Orders = require("../models/orders.model");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/CatchAsync");

exports.validateStatus = catchAsync(async(req, res, next) => {
  const {id} = req.params;

  const findOrder = await Orders.findOne({
    where: {
      id,
      status: 'active'
    }
  })

  if(!findOrder){
    return next(new AppError('The order is not available', 404))
  }; 
  next();
})