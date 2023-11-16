import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  username: "",
  token: "notoken",
  _id: "",
  isLoggedIn: false,
  isLoading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const { toggleExpandedSidebar } = userSlice.actions;

export default userSlice.reducer;
