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
    const maxBlogId = sequenceGenerator.nextId("blogpost");
  
    const blogpost = new Blogpost({
      id: maxBlogId,
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      author: req.body.author
    });
  
    blogpost.save()
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
    Blogpost.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          imageUrl: req.body.imageUrl,
          description: req.body.description,
          author: req.body.author
        }
      },
      { new: true } // Returns the updated document
    )
      .then(updatedBlogpost => {
        res.status(200).json({
          message: 'Blog Post updated successfully',
          blogpost: updatedBlogpost
        });
      })
      .catch(error => {
        res.status(500).json({
          message: 'An error occurred',
          error: error
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