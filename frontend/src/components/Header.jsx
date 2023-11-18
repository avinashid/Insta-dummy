import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

const Header = () => {
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.post);
  const isLoading = useSelector(s=>s.post.isLoading)
  console.log(posts);
  console.log(isLoading,"her")
  if(!isLoading) console.log("print this")
  // console.log(user);
  if(!user.isLoading) console.log("user load",user.isLoading)
  return (
    <div className="flex px-4 py-3 justify-between items-center rounded-md border-b-cmid border-b ">
      <div className="text-xl font-serif">InstaCode</div>
      <div className="flex flex-col relative top-1 ">
        <div className="absolute z-10 text-sm bg-clightmid text-cblack rounded-md px-2 bottom-7 right-10">
          {user.username || "Guest"}
        </div>
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow">
          {(user.isLoggedIn && "Logout") || "Login"}
        </button>
      </div>
    </div>
  );
};

export default Header;
