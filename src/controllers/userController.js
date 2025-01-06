const { sequelize, User, Post } = require('../../models');


// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { name, mobile, address, postCount } = req.body;

  try {
    const user = await User.create({ name, mobile, address, postCount });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit an existing user
const editUser = async (req, res) => {
  const { id } = req.params;
  const { name, mobile, address, postCount } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update fields only if provided
    if (name) user.name = name;
    if (mobile) user.mobile = mobile;
    if (address) user.address = address;
    if (postCount !== undefined) user.postCount = postCount;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user
    await user.destroy();

    // Reassign IDs to maintain sequential order
    await sequelize.query(`
      UPDATE Users
      SET id = id - 1
      WHERE id > ${id};
    `);

    // Reset the auto-increment sequence
    const [results] = await sequelize.query(`
      SELECT MAX(id) AS maxId FROM Users;
    `);
    const maxId = results[0]?.maxId || 0;

    await sequelize.query(`
      UPDATE sqlite_sequence
      SET seq = ${maxId}
      WHERE name = 'Users';
    `);

    res.status(200).json({ message: 'User deleted, IDs updated, and auto-increment reset successfully.' });
  } catch (error) {
    console.error('Error while deleting user:', error.message);
    res.status(500).json({ error: error.message });
  }
};
  



// Get all posts for a specific user
const getUserPosts = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      include: [Post],
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.Posts.length === 0) {
      return res.status(404).json({ message: 'No posts found for this user' });
    }

    res.status(200).json(user.Posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a post for a specific user
const createPostForUser = async (req, res) => {
  const { id } = req.params;
  const { title, description, images } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const post = await Post.create({
      title,
      description,
      images,
      userId: id,
    });

    // Update user's post count
    user.postCount += 1;
    await user.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUsers, createUser, editUser, deleteUser, getUserPosts, createPostForUser };
