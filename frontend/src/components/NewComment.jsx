import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { fetchPost } from "../features/middleware/postMiddleware";
const NewComment = ({ postId }) => {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleComment = async (e) => {
    e.preventDefault();
    if (!user.isLoggedIn) navigate("/signin");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts/comment",
        {
          username: user.username,
          postId,
          comment,
        },
        { headers }
      );
      console.log(res.data);
      dispatch(fetchPost());
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-4 py-2 border border-blue-500 rounded-2xl">
      <form className="flex justify-between" onSubmit={handleComment}>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="New Comment"
          className="bg-transparent focus:outline-none"
          type="text"
        />
        <button type="submit" className="w-fit bg-blue-600 p-2 px-4 rounded-md">
          Comment
        </button>
      </form>
    </div>
  );
};

export default NewComment;
