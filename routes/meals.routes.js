const { Router } = require("express");
const { check } = require("express-validator");
const { getAllMeals, getOneMeals, createMeals, updateMeals, deleteMeals } = require("../controllers/meals.controller");
const { protect, restrictTo } = require("../middlewares/auth.middleware");
const { validateField } = require("../middlewares/validateField.middleware");

const router = Router();

router.get('/', getAllMeals)

router.get('/:id', getOneMeals)

router.post('/:id',[
  check('name', 'The name most be mandatory').not().isEmpty(),
  check('price', 'The price most be mandatory').not().isEmpty(),
  check('price', 'The price most be s correct format').isNumeric(),
], validateField,protect,restrictTo('admin'), createMeals)

router.patch('/:id',protect,restrictTo('admin'), updateMeals)

router.delete('/:id',protect,restrictTo('admin'), deleteMeals)

module.exports = {
  mealsRouter: router
};