const express = require("express");
const signInTemplate = require("../../views/admin/signin");
const signUpTemplate = require("../../views/admin/signup");
const UserRepo = require("../../repositories/user");


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

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const user = UserRepo.getOneBy({email: email})
  if(!user){
    res.send("User not found")
  }
  
  if(user.password === password ){
    res.send("logged in")
  }else{
    res.send("Invalid credentials")
  }

});

router.get("/signout", (req, res) => {
  req.session.userId = null
  res.send("logged out");
});

module.exports = router;
