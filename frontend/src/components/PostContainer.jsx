import { useSelector } from "react-redux/es/hooks/useSelector";
import Post from "./Post";

const PostContainer = () => {
  const posts = useSelector((state) => state.post);
  return (
    <div className="">
      {!posts.isLoading &&
        posts.posts.map((e) => <Post key={e._id} post={e} />)}
    </div>
  );
};

export default PostContainer;
