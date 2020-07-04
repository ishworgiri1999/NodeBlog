const express = require("express");
const Post_m = require("../models/post_m");

let route = express.Router();

route.get("/posts", async (req, res) => {
  console.log("data search");
  let datas = await Post_m.find();
  console.log("data search");

  res.render("postlist", { articles: datas });
});

route.get("/posts/new", (req, res) => {
  res.render("new");
});

route.get("/", (req, res) => {
  res.send("admin panel");
});

route.get("/404", (req, res) => {
  res.send("error panel");
});

route.get("/posts/sucess", (req, res) => {
  res.send("sucess panel");
});

route.post("/posts", async (req, res) => {
  let post = new Post_m({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    article = await post.save();
    res.redirect(`/posts/view/${article._id}`);
  } catch (e) {
    res.redirect("/admin/404");
  }
});

module.exports = route;
