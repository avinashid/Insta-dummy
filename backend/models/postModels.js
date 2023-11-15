const mongoose = require("mongoose");

const comment = mongoose.Schema({
  username: {
    type: String,
    required:[true,"please add username"]
  },
  comment: {
    type: String,
    required: [true, "Please add comment"],
  },
});

const postSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a name"],
    },
    postPhoto: {
      type: String,
    },
    postDescription: {
      type: String,
      required: [true, "Please add post Description"],
    },
    likeUser: {
      type: [String],
    },
    comments: [comment],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("InstaPost", postSchema);
