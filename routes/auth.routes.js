const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, login } = require("../controllers/auth.controller")
const { validateField } = require("../middlewares/validateField.middleware")

const router = Router();


router.post('/signup',[
  check('name','The name most be mandatory').not().isEmpty(),
  check('email','The email most be mandatory').not().isEmpty(),
  check('email','The email most be a correct format').isEmail(),
  check('password','The password most be mandatory').not().isEmpty()
],validateField, createUser)


router.post('/login', login )

module.exports = {
  authRouter: router, 
} 