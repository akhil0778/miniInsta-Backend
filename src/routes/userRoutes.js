const express = require('express');
const {
  getUsers,
  createUser,
  editUser,
  deleteUser,
  getUserPosts,
  createPostForUser,
} = require('../controllers/userController');

const router = express.Router();

// Get all users
router.get('/', getUsers);

//Create a user
router.post('/', createUser);

//Edit a user
router.put('/:id', editUser);

//Delete a user
router.delete('/:id', deleteUser);

// Get all posts for a specific user
router.get('/:id/posts', getUserPosts);

// Create a post for a specific user
router.post('/:id/posts', createPostForUser);

module.exports = router;
