const express = require("express");
const router = express.Router();
const {
  getPost,
  addPost,
  postLike,
  deletePost,
} = require("../controllers/postControllers");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addPost);
router.get("/me", getPost);
router.post("/delete", deletePost);
router.post("/postlike", postLike);

module.exports = router;
