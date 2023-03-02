const express = require('express');
const cors = require('cors');
const { db } = require('../database/db');
const { userRouter } = require('../routes/users.routes');
const  AppError  = require('../utils/AppError');
const  globalErrorHandler  = require('../controllers/error.controller');
const initModel = require('./initModels');
const { authRouter } = require('../routes/auth.routes');
const { restaurantsRouter } = require('../routes/restaurants.routes');
const { mealsRouter } = require('../routes/meals.routes');
const { ordersRouter } = require('../routes/orders.routes');



class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT 

    //camino de Rutas
    this.paths = {
      users: "/api/v1/users",
      auth: "/api/v1/auth",
      restaurants: "/api/v1/restaurants",
      meals: "/api/v1/meals",
      orders: "/api/v1/orders"

    }


    //coneccion con la base de datos
    this.database();

    //middlewares
    this.middlewares();

    //Rutas
    this.routes();

  }
//Utilizar los middlewares
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }
//Utilizar las rutas
  routes() {
    this.app.use(this.paths.users, userRouter);

    this.app.use(this.paths.auth, authRouter);

    this.app.use(this.paths.restaurants, restaurantsRouter);

    this.app.use(this.paths.meals, mealsRouter);

    this.app.use(this.paths.orders, ordersRouter);

    this.app.all('*', (req, res, next) => {
      return next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
    });
    this.app.use(globalErrorHandler);

  }

  //Autenticacion y sincronizacion de la base de datos
  database() {
    //Autenticacion
    db.authenticate()
    .then(() => console.log('Database authenticated'))
    .catch(err => console.log(err));

    //Relaciones
    initModel()

    //Sincronizacion
    db.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.log(err));

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server Running On Port', this.port)
    })
  }

}

module.exports = Server;