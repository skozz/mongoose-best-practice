/**
 * Express example using Mongoose
 * @desc respond all Posts from MongoDB with Mongoose
 * @require /model/*
 **/

var mongoose = require("mongoose"),
  express = require("express"),
  cors = require("cors");

var app = express(),
  db = require(__dirname + '/models/db'),
  Post = require(__dirname + '/models/post').Post;

db.connect('debug');

app.use(cors());
app.get('/posts', function(req, res) {

  // Render the last 10 posts
  Post.find(function(err, posts) {
    res.send(posts);
  }).limit(10);

});


app.get('/post/new', function(req, res) {

  // Create and Save Post to MongoDB
  var post = new Post({
    title: "Mongoose best practices"
  });
  post.save(function(err) {
    if (err) {
      res.send({
        'error': err.toString()
      });
    } else {
      // Render the last 10 posts
      Post.find(function(err, posts) {
        res.send(posts);
      });

    }
  });

});

console.log('App running on http://localhost:3000/posts');
app.listen(3000);