import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  posts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
});


export default postSlice.reducer;
