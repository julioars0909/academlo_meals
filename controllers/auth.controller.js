const User = require("../models/users.model");
const catchAsync = require("../utils/CatchAsync");
const bcrypt = require('bcryptjs');
const generateJWT = require("../utils/jwt");
const AppError = require("../utils/AppError");

exports.createUser = catchAsync(async(req, res, next) => {

  const {name, email, password, role} = req.body

  const user = new User({
    name,
    email,
    password,
    role
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();

  const token = await generateJWT(user.id);

  return res.status(200).json({
    status: 'success',
    message: 'User created successfully',
    token,
    user: {
      name,
      email
    }
  });
});

exports.login = catchAsync(async(req, res, next) => {

  const {email, password} = req.body;
  

  const findUser = await User.findOne({
    where: {
      email,
      status: true
    }
  });


  if(!findUser){
    return next(new AppError('User not found',404))
  }

  if(!(await bcrypt.compare(password, findUser.password))){
    return next(new AppError('Incorrect email or password', 401))
  }

  const token = await generateJWT(findUser.id);

  res.status(200).json({
    status: 'success',
    message: 'User logged in',
    token,
    findUser: {
      id: findUser.id,
      name: findUser.name,
      user: findUser.email,
      role: findUser.role,

    }
  });
});
