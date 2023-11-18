import { useSelector } from "react-redux/es/hooks/useSelector";
import Post from "./Post";
import CreatePost from "./CreatePost";

const PostContainer = () => {
  const posts = useSelector((state) => state.post);
  return (
    <div className="flex flex-col gap-8">
      <CreatePost />
      {!posts.isLoading &&
        posts.posts.map((e, index, array) => (
          <Post key={e._id} post={array[array.length - 1 - index]} />
        ))}
    </div>
  );
};

export default PostContainer;
