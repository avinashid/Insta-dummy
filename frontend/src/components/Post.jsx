import React, { useReducer, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchPost } from "../features/middleware/postMiddleware";
import { useNavigate } from "react-router-dom";
import CommentContainer from "./CommentContainer";
import NewComment from "./NewComment";
import { MdDelete } from "react-icons/md";

const Post = ({ post }) => {
  const navigate = useNavigate();
  const date = new Date(post.createdAt);
  const user = useSelector((state) => state.user);
  const like = post.likeUser.includes(user.username);
  const dispatch = useDispatch();
  const [showNewComment, setShowNewComment] = useState(false);
  const handleLike = async () => {
    if (!user.isLoggedIn) {
      navigate("/signin");
      return;
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts/postlike",
        {
          username: user.username,
          postId: post._id,
        },
        { headers }
      );
      dispatch(fetchPost());
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts/delete",
        {
          username: post.username,
          postId: post._id,
        },
        { headers }
      );
      dispatch(fetchPost());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-1 flex-col p-4 border rounded-md max-w-sm gap-6 relative">
        {(user.username === post.username || user.username === "admin") && (
          <div
            onClick={handleDelete}
            className="absolute text-2xl text-red-600 cursor-pointer right-3 bg-white rounded-full p-2 "
          >
            <MdDelete />
          </div>
        )}
        <div className="header">
          <div>
            <div className="text-lg text-clight">{post.username}</div>
            <div className="text-xs text-cgray">
              {date.toLocaleTimeString().slice(0, 8)}{" "}
              {date.toLocaleTimeString().slice(-3).toUpperCase()}{" "}
              {date.toLocaleDateString()}
            </div>
          </div>
        </div>
        <div className="text-sm font-open">{post.postDescription}</div>
        {post.postPhoto && <img className="rounded" src={post.postPhoto} />}
        <div className="comment"></div>
      </div>
      <div className=" text-white rounded-b-xl flex-1 flex gap-3">
        <button
          className="bg-blue-500 flex-1 p-3 rounded-md"
          onClick={handleLike}
        >
          {`${(like && "Liked") || "Like"} ${post.likeUser.length}`}
        </button>
        <button
          onClick={() => {
            if (!user.isLoggedIn) navigate("/signin");
            setShowNewComment((e) => !e);
          }}
          className="bg-blue-500 flex-1 rounded-md  "
        >
          {showNewComment ? "Cancel" : "Comment"}
        </button>
      </div>
      {post.comments.length != 0 && (
        <CommentContainer
          comments={post.comments}
          postId={post._id}
          postUser={post.username}
        />
      )}
      {showNewComment && <NewComment postId={post._id} />}
    </div>
  );
};

export default Post;
