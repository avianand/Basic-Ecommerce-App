const express = require("express");
const bodyParser = require("body-parser");
const authrouter = require("./routes/admin/auth");
const cookieSession = require("cookie-session");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(authrouter);

app.use(
  cookieSession({
    keys: ["lkasld235j"],
  })
);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});