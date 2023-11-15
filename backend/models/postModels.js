const mongoose = require("mongoose");

const comment = mongoose.Schema({
  username: {
    type: String,
  },
  comment: {
    type: String,
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
