const AppError = require("../utils/AppError");

const sendErrorDev = (err, res) =>{
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const handleJWTError = () => {
  new AppError('Invalid Token. Please login again!', 401)
}

const sendErrorProd = (err, res) =>{
  if(err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  }else{
    console.log('ERROR', err)
    res.status(500).json({
      status: 'fail',
      message:'something went very wrong!',
    })
  }
}

const globalErrorHandler = (err, req, res, next) =>{
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';
  //Cualquier error que tenga que validar  lo validare mediante el if
  if(process.env.NODE_ENV === 'development'){
    sendErrorDev(err, res)
  }

  if(process.env.NODE_ENV === 'production') {
    let error = {...err}

    if(!error.parent?.code) {
      error = err
    }

    if(error.name === 'jsonWebTokenError') error = handleJWTError(error);

    

    sendErrorProd(error, res)
  }

};

module.exports = globalErrorHandler;