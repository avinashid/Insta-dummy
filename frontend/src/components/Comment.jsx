import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchPost } from "../features/middleware/postMiddleware";

const Comment = ({ comment, postUser, postId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  
  const handleDelete = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts/deleteComment",
        {
          postId,
          commentId: comment._id,
        },
        { headers }
      );
      dispatch(fetchPost());
    } catch (error) {
      console.log(error)
    }
  };
  const isDelete =
    user.username === comment.username || user.username === postUser ? (
      <div onClick={handleDelete} className="text-xs text-red-700 cursor-pointer indent-1">Delete</div>
    ) : (
      ""
    );

  return (
    <div className="flex flex-col  gap-2 bg-cmid rounded-lg p-2 text-black text-sm">
      <div className="text-xs bg-white w-fit rounded-md p-3 py-1">
        {comment.username}
      </div>
      <div className="indent-2">{comment.comment}</div>
      {isDelete}
    </div>
  );
};

export default Comment;
