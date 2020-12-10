const express = require("express");
const signInTemplate = require("../../views/admin/signin");
const signUpTemplate = require("../../views/admin/signup");
const UserRepo = require("../../repositories/user");
const { comparePassword } = require("../../repositories/user");
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signUpTemplate({ req }));
});

router.post("/signup",[ 
  body('email')
  .trim()
  .not().isEmpty()
  .withMessage('email cannot be empty')
  .isEmail()
  .withMessage('Invalid email format')
  .normalizeEmail()
  .custom(async value => {
    return await UserRepo.getOneBy({ value }).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    });
  }),
  body('password')
  .trim()
  .isLength({ min: 5 })
  .withMessage('must be at least 5 chars long'),
  body('passwordConfirmation')
  .trim()
  .isLength({ min: 5 })
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  })
  ], async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors) 
  }
  const { email, password } = req.body;
 
    const user = await UserRepo.create({email, password}) 
    req.session.userId = user.id
    return res.send("Account Created"); 

});

router.get("/signin", (req, res) => {
  res.send(signInTemplate({ req }));
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserRepo.getOneBy({ email });
  if (!user) {
    return res.send("User not found");
  }
  const compare = await comparePassword(user.password, password)
  if (compare) {
    req.session.userId = user.id
    console.log(req.session.userId)
    res.send("logged in");
  } 
  else {
    res.send("Invalid credentials");
  }
});

router.get("/signout", (req, res) => {
  req.session = null
  res.send("logged out");
});

module.exports = router;
