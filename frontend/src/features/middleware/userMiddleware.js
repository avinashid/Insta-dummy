// middleware.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

export const fetchUser = createAsyncThunk("users/me", async () => {
  const token = Cookies.get("instaToken");
  const user = {
    name: "",
    username: "",
    token: "notoken",
    isLoggedIn: false,
    isLoading: false,
  };
  console.log(token, "instaToken");
  try {
    const response = await axios.get("http://localhost:5000/api/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;

    return {
      name: data.name,
      username: data.username,
      token,
      isLoggedIn: true,
      isLoading: false,
    };
  } catch (error) {
    console.log("error", error);
    return user;
  }
});

export const fetchUserMiddleware =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type === "@@INIT") {
      const userInfo = await dispatch(fetchUser());
      console.log(userInfo.payload);
      dispatch({ type: "users/me", payload: userInfo.payload });
    }
    return next(action);
  };
