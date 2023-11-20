import React from "react";
import Comment from "./Comment";

const CommentContainer = ({ comments, postUser ,postId}) => {
  return (
    <div className="p-4 border rounded flex gap-4 w-screen max-w-sm flex-col">
      {comments.map((data) => (
        <Comment key={data._id} comment={data} postUser={postUser} postId = {postId}/>
      ))}
    </div>
  );
};

export default CommentContainer;
