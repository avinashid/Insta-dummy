import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPost = createAsyncThunk("posts/me", async () => {
  const post = {
    isLoading: false,
    posts: [],
  };
  try {
    const response = await axios.get("http://localhost:5000/api/posts/me", {});
    const data = response.data;

    return {
      isLoading: false,
      posts: data,
    };
  } catch (error) {
    console.log("error", error);
    return post;
  }
});
