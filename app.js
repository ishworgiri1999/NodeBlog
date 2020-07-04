//express module
const express = require("express");

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
app.use(express.urlencoded({ extended: false })); //for

const port = 8080; //for port

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("db connected")
);

//middleware for handling routes
app.use("/posts", posts);
app.use("/admin", admin);

app.get("/:what", (req, res) => res.render("404"));

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
