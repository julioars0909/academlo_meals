const { Router } = require("express");
const { findOneOrder, updateUser, deleteUser, findAllOrders, login } = require("../controllers/users.controller");
const { protect, protectAccountOwner } = require("../middlewares/auth.middleware");



const router = Router();

router.get('/orders',protect, findAllOrders)

router.get('/orders/:id',protect, findOneOrder)



router.patch('/:id',protect,protectAccountOwner, updateUser)

router.delete('/:id',protect,protectAccountOwner, deleteUser)

module.exports = {
  userRouter: router
}