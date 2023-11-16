import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  posts: [],
};

export const userSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
});

export const { toggleExpandedSidebar } = userSlice.actions;

export default userSlice.reducer;
