const express = require('express');
const {
  getPosts,
  updatePost,
  deletePost,
} = require('../controllers/postController');

const router = express.Router();

// Get all posts
router.get('/', getPosts);

// Update a post
router.put('/:id', updatePost);

// Delete a post
router.delete('/:id', deletePost);

module.exports = router;
