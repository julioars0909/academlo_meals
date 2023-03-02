const { Router } = require("express");
const { findOrdersByUsers, createOrder, completeOrder, cancelOrder } = require("../controllers/orders.controller");
const { protect, protectOrderOwner } = require("../middlewares/auth.middleware");
const { validateMeal } = require("../middlewares/validateMeal.middleware");
const { validateStatus } = require("../middlewares/validateOrder.controller");

const router = Router();

router.use(protect);

router.post('/',validateMeal, createOrder)



router.get('/me', findOrdersByUsers)



router.patch('/:id',validateStatus,protectOrderOwner, completeOrder)

router.delete('/:id',validateStatus,protectOrderOwner, cancelOrder)




module.exports = {
  ordersRouter: router
};