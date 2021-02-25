const express = require("express");
const Post_m = require("../models/post_m");
const User_m = require("../models/user_m");

let route = express.Router();

route.use((req, res, next) => {
  if (req.session.username) {
    next();
  } else {
    res.redirect("/login");
  }
});

route.get("/posts", async (req, res) => {
  //console.log("data search");
  let datas = await Post_m.find().sort({ date: -1 });
  console.log("data search:admin");

  res.render("admin_posts", { articles: datas });
});

route.get("/posts/new", (req, res) => {
  res.render("new_post");
});

route.get("/newuser", (req, res) => {
  res.render("new_user");
});

route.post("/newuser", async (req, res) => {
  let user = new User_m({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  });
  try {
    usersaved = await user.save();
    res.redirect("/login?username=" + usersaved.username);
  } catch (e) {
    res.redirect("/404");
  }
});

route.get("/", (req, res) => {
  res.render("admin");
});

route.get("/:whatever", (req, res) => {
  res.send("error panel");
});

route.get("/posts/sucess", (req, res) => {
  res.send("sucess panel");
});

route.get("/posts/delete", async (req, res) => {
  let posttodelete = req.query.pid;
  if (!req.query.pid) return res.redirect("/admin/posts?notdefined=true");
  
  var success=0;
  let query = await Post_m.findByIdAndDelete(posttodelete, (err,post)=>{
    if(err){
      success=1;
    }else{
      success=1
    }
  });

  if (!success) {
    return res.redirect("/admin/posts?qfailed=true");
  }
  return res.redirect("/admin/posts?delsucess=true");
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
route.get("*", function (req, res) {
  res.status(404).send("What???");
});
module.exports = route;
