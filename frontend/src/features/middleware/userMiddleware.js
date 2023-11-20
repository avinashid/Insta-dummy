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
  try {
    const response = await axios.get("https://insta-dummy.onrender.com/api/users/me", {
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
