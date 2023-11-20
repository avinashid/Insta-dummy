import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../features/middleware/userMiddleware";
const Signin = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const dispatch = useDispatch();

  const formData = {
    username: "",
    password: "",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://insta-dummy.onrender.com/api/users/login", {
        username: formData.username,
        password: formData.password,
      });
      const data = res.data;
      Cookies.set("instaToken", data.token, { expires: 2 });
      dispatch(fetchUser());
      setErr(false);
      navigate("/");
    } catch (error) {
      setErr(true);
    }
  };
  return (
    <div className="flex flex-col p-4 border text-white pb-7 max-w-sm gap-6 rounded-md w-10/12 ">
      <div className="text-4xl">Sign In</div>
      <form className="bg-none flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          required
          type="text"
          autoComplete="off"
          className=" bg-sky-900  text-sm  p-3 rounded-md"
          onChange={(e) => (formData.username = e.target.value)}
          placeholder="Enter Username"
        />
        <input
          required
          className=" bg-sky-900 text-sm p-3 rounded-md"
          type="password"
          onChange={(e) => (formData.password = e.target.value)}
          placeholder="Enter password"
        />
        <button
          className=" bg-transparent border p-3  rounded-md hover:bg-slate-600"
          type="submit"
        >
          Submit
        </button>
        {err && (
          <div className="text-xs m-auto text-red-600">
            Invalid Username or Password
          </div>
        )}
      </form>
      <div>Create an account?</div>
      <button
        className=" bg-transparent border p-3  rounded-md hover:bg-slate-600"
        type="submit"
        onClick={() => navigate("/signup")}
      >
        Sign Up
      </button>
    </div>
  );
};

export default Signin;
