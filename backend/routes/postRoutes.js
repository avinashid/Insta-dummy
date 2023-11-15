const express = require("express");
const router = express.Router();
const {
  getPost,
  addPost,
  postLike,
  deletePost,
  comment,
  deleteComment,
} = require("../controllers/postControllers");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addPost);
router.get("/me", getPost);
router.post("/delete", deletePost);
router.post("/postlike", postLike);
router.post("/comment", comment);
router.post("/deleteComment", deleteComment);

module.exports = router;
