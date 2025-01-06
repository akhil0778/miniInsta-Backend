const { Post } = require('../../models');

// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a post
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description, images } = req.body;

  if (!title && !description && !images) {
    return res.status(400).json({ message: 'At least one field (title, description, or images) is required' });
  }

  try {
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.title = title || post.title;
    post.description = description || post.description;
    post.images = images || post.images;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    await post.destroy();

    // Update user's post count
    const user = await post.getUser();
    user.postCount -= 1;
    await user.save();

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPosts, updatePost, deletePost };
