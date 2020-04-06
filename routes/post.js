const express = require("express");
let route = express.Router();

route.get("/:id", (req, res) => {
  var data = {
    age: 29,
    job: "hero",
    hobbies: ["eating", "fighting"],
  };
  res.render("post", { person: req.params.name, data: data });
});

module.exports = route;
