const mongoose = require("mongoose");

const commentId = mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
  },
});

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a name"],
    },
    name: {
      type: String,
      required: [true, "Please add name"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    posts: [commentId],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("InstaUser", userSchema);
