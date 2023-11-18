import { createSlice } from "@reduxjs/toolkit";
import { fetchPost } from "./middleware/postMiddleware";

const initialState = {
  isLoading: true,
  posts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.isLoading = action.payload.isLoading;
      state.posts = action.payload.posts;
    });
  },
});

export default postSlice.reducer;
