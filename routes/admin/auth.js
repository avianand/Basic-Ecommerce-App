const express = require("express");
const signInTemplate = require("../../views/admin/signin");
const signUpTemplate = require("../../views/admin/signup");
const UserRepo = require("../../repositories/user");
const { comparePassword } = require("../../repositories/user");


const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signUpTemplate({ req }));
});

router.post("/signup", async (req, res) => {

  const { email, password, passwordConfirmation } = req.body;

  if (password !== passwordConfirmation) {
    return res.send('Passwords don\'t match');
  } 

  const existingUser = await UserRepo.getOneBy({ email });
  
  if (existingUser) {
    return res.send('Email in use');
  }
  
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
