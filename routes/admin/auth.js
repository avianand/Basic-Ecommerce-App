const express = require("express");
const signInTemplate = require("../../views/admin/signin");
const signUpTemplate = require("../../views/admin/signup");

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signUpTemplate({ req }));
});

router.post("/signup", (req, res) => {
  const { email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    res.send("passwords don't match");
  } else {
    res.send("Account Created");
  }
});

router.get("/signin", (req, res) => {
  res.send(signInTemplate({ req }));
});

router.post("/signin", (req, res) => {
  res.send("login success.");
});

router.get("/signout", (req, res) => {
  res.send("logged out");
});

module.exports = router;
