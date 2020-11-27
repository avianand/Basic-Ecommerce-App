const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/login", (req, res) => {
  res.send("Login Page");
});

app.get("/signup", (req, res) => {
  res.send("Signup Page");
});

app.get("/products", (req, res) => {
  res.send("products Page");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});