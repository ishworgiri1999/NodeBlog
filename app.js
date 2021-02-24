//express module
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const User_m = require("./models/user_m");

//mongodb mongoose module
var mongoose = require("mongoose");

//posts route management
const posts = require("./routes/posts");

//admin routes management
const admin = require("./routes/admin");

//dotenv
require("dotenv/config");

//config express app
const app = express();
app.set("view engine", "ejs"); //viewengine as ejs
app.use(cookieParser());
app.use(session({ secret: "IDK" }));
app.use(express.urlencoded({ extended: false })); //for

const port = process.env.PORT || 8000; //for port

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("db connected")
);

app.use(function (req, res, next) {
  console.log(req.headers.referer);
  next();
});

//middleware for handling routes
app.use("/posts", posts);
app.use("/admin", admin);

app.get("/login", (req, res) => {
  if (req.session.username) {
    res.redirect("/admin?loggedin=true");
  } else {
    res.render("login");
  }
});

app.post("/login", async (req, res) => {
   var success = 0;
 await User_m.findOne(
    { username: req.body.username, password: req.body.password },
    (err, person) => {
      console.log(person);
      //res.render("admin_posts", { articles: datas });
      if (err) {
        console.log("er");

        success = 0;
      } else {
        if (person) {
          console.log("noter");
          req.session.username = person.username;
          success = 1;
        }
      }
    }
  );
    console.log(success)

  return (success==1) ? res.redirect("/admin") : res.redirect("/login?invalid=true");
});

app.get("/logout", (req, res) => {
  req.session.destroy(res.redirect("/login?logout=true"));
});

app.get("/", (req, res) => {
  if (req.session.page_views) {
    req.session.page_views++;
  } else {
    req.session.page_views = 1;
  }
  var tosend = req.session.page_views;
  return res.render("home", { data: tosend });
});

app.get("/:what", (req, res) => res.render("404"));

console.log(
  app
    .listen(port, () => console.log(`Example app listening on port ${port}!`))
    .address()
);
