const express = require("express");
var mongoose = require("mongoose");
const posts = require("./routes/posts");
const admin = require("./routes/admin");
require("dotenv/config");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const port = 8080;

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("db connected")
);

app.use("/posts", posts);
app.use("/admin", admin);

app.get("/:what/:whatever", (req, res) => res.render("404"));

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
