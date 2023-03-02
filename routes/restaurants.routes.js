const { Router } = require("express");
const { check } = require("express-validator");
const { findAllRestaurants, findOneRestaurant, createRestaurant, updateRestaurant, deleteRestaurant, createReview, updateReview, deleteReview } = require("../controllers/restaurants.controller");
const { validateField } = require("../middlewares/validateField.middleware");
const { protectAccountOwner, protect, protectAccountOwnerReview, restrictTo } = require("../middlewares/auth.middleware");

const router = Router();

router.get('/', findAllRestaurants)

router.get('/:id', findOneRestaurant)

router.post('/',[
  check('name', 'the name most be mandatory').not().isEmpty(),
  check('address', 'the address most be mandatory').not().isEmpty(),
  check('rating', 'the rating most be mandatory').not().isEmpty(),
  check('rating', 'the rating most be mandatory').isNumeric()
], validateField,protect,restrictTo('admin'),  createRestaurant)

router.patch('/:id',protect,restrictTo('admin'),  updateRestaurant)

router.delete('/:id',protect,restrictTo('admin'),  deleteRestaurant)

router.post('/reviews/:id',protect, createReview)

router.patch('/reviews/:restaurantId/:id',protect, protectAccountOwnerReview, updateReview)

router.delete('/reviews/:restaurantId/:id',protect, protectAccountOwnerReview, deleteReview)

module.exports = {
  restaurantsRouter: router
}