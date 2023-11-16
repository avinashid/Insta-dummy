import { useSelector } from "react-redux/es/hooks/useSelector";
import Post from "./Post";

const PostContainer = () => {
  const posts = useSelector((state) => state.post);
  const loading = useSelector(s=>s.post.isLoading)
  console.log(loading);
  console.log(posts.isLoading)
  // if (posts.isLoading === false) {
  //   posts.posts.map((e,i) => <Post key = {i} />);
  // }else{
  //   return <h1>hi</h1>
  // }
  return <div>{loading && "Loading" || "Loaded"}</div>
};

export default PostContainer;
