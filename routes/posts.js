const express = require("express");
const Post_m = require("../models/post_m");

let route = express.Router();

route.get("/", async (req, res) => {
  let datas = await Post_m.find();
  res.render("posts", { articles: datas });
});

route.get("/view/:id", async (req, res) => {
  let data = await Post_m.findById(req.params.id);
  res.render("post", { element: data });
});

module.exports = route;
