import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { fetchUser } from "../features/middleware/userMiddleware";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleSignOut = () => {
    Cookies.set("instaToken", "");
    dispatch(fetchUser());
  };
  const button = user.isLoggedIn ? (
    <div onClick={handleSignOut}>Sign Out</div>
  ) : (
    <div onClick={() => navigate("signin")}>Sign In</div>
  );
  console.log(user);
  return (
    <div className="flex px-4 py-3 justify-between items-center rounded-md border-b-cmid border-b ">
      <div
        className="text-xl font-serif font-bold cursor-pointer bg-gradient-to-r from-rose-700 to-blue-600 bg-clip-text text-transparent"
        onClick={() => navigate("/")}
      >
        InstaCode
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col relative top-1 ">
          <div className="absolute z-10 text-sm bg-clightmid text-cblack rounded-md px-2 bottom-7 right-16">
            {user.username || "Guest"}
          </div>
          <button className=" bg-transparent text-white hover:bg-slate-700 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow">
            {button}
          </button>
        </div>
        {!user.isLoggedIn && (
          <button
            onClick={() => navigate("signup")}
            className=" mt-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
          >
            Sign Up
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
