var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Blogpost = require('../models/blogpost');

router.get('/', (req, res, next) => {
  Blogpost.find()
    .then(blogposts => {
        res.status(200).json({
            message: 'Blog Posts fetched successfully!',
            blogposts: blogposts
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'An error occurred',
          error: error
        });
      });
  });

  router.get('/:id', (req, res, next) => {
    Blogpost.findOne({
      "id": req.params.id
    })
    .then(blogpost => {
        res.status(200).json({
            message: 'Blog Post fetched successfully!',
            blogpost: blogpost
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'An error occurred',
          error: error
        });
      });
  });

 
router.post('/', (req, res, next) => {
    const maxBlogId = sequenceGenerator.nextId("blog");
  
    const blog = new Blogpost({
      id: maxBlogId,
      title: req.body.name,
      iamgeUrl: req.body.url,
      description: req.body.description,
      author: req.body.author
    });
  
    blog.save()
      .then(createdBlog => {
        res.status(201).json({
          message: 'Blog Post added successfully',
          blogpost: createdBlog
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });

  router.put('/:id', (req, res, next) => {
    Blogpost.findOne({ id: req.params.id })
      .then(blog => {
        blog.title = req.body.title;
        blog.imageUrl = req.body.imageUrl;
        blog.description = req.body.description;
        blog.author = req.body.author;
  
        Blogpost.updateOne({ id: req.params.id }, blog)
          .then(result => {
            res.status(204).json({
              message: 'Blog Post updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Blog Post not found.',
          error: { blogpost: 'Blog Post not found'}
        });
      });
  });

  router.delete("/:id", (req, res, next) => {
    Blogpost.findOne({ id: req.params.id })
      .then(blog => {
        Blogpost.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Blog Post deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Blog Post not found.',
          error: { blogpost: 'Blog Post not found'}
        });
      });
  });

module.exports = router; 