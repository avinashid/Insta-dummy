import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import { fetchUserMiddleware } from "./features/middleware/userMiddleware";
import { fetchPostMiddleware } from "./features/middleware/postMiddleware";
import postSlice from "./features/postSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([fetchPostMiddleware,fetchUserMiddleware]),
});

store.dispatch({ type: "@@INIT" });
export default store;
