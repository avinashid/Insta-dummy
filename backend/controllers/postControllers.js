const InstaUser = require("../models/userModels");
const InstaPost = require("../models/postModels");

// @desc Get all post
// @route GET /api/posts
// @access Public
const getPost = async (req, res) => {
  try {
    const post = await InstaPost.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(501).json({ Error: error.message });
  }
};

const addPost = async (req, res) => {
  try {
    const { username, postPhoto, postDescription } = req.body;
    if (!username || !postDescription)
      return res.status(401).json({
        message: "Username or des missing",
      });
    const post = await InstaPost.create({
      username,
      postDescription,
      postPhoto: postPhoto || "",
    });
    if (post) {
      const updateUserPost = await InstaUser.findOne({
        username,
      });
      updateUserPost.posts.push(post._id);
      const response = await updateUserPost.save();

      res.status(200).json(response);
    }
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { username, postId } = req.body;
    const post = await InstaPost.findOne({
      _id: postId,
    });

    if (post.username === username) {
      const deleted = await InstaPost.deleteOne({
        _id: postId,
      });

      if (deleted.deletedCount !== 1)
        return res.status(400).json({ Message: "post not Found" });
      const updateUserPost = await InstaUser.findOne({
        username,
      });
      updateUserPost.posts.pull(postId);
      await updateUserPost.save();
      res.status(200).json(updateUserPost);
    } else {
      return res.status(404).json({ Message: "Not Authorized" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const postLike = async (req, res) => {
  try {
    const { username, postId } = req.body;
    const post = await InstaPost.findOne({
      _id: postId,
    });
    if (!post) return res.status(401).json({ message: "post not found" });
    if (post.likeUser.includes(username)) {
      post.likeUser.pull(username);
      await post.save();
    } else {
      post.likeUser.push(username);
      await post.save();
    }
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPost,
  addPost,
  deletePost,
  postLike,
};
