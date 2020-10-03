const express = require("express");
const Post_m = require("../models/post_m");

let route = express.Router();

route.get("/posts", async (req, res) => {
  //console.log("data search");
  let datas = await Post_m.find().sort({date:-1});
  console.log("data search:admin");

  res.render("admin_posts", { articles: datas });
});

route.get("/posts/new", (req, res) => {
  res.render("new_post");
});

route.get("/", (req, res) => {
  res.render("admin")
});

route.get("/:whatever", (req, res) => {
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

//The 404 Route (ALWAYS Keep this as the last route)
route.get('*', function(req, res){
  res.status(404).send("What???");
});
module.exports = route;
