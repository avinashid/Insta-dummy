import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import { fetchUsers } from "./features/middleware/userMiddleware";
import { fetchPosts } from "./features/middleware/postMiddleware";
import postSlice from "./features/postSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([fetchUsers,fetchPosts]),
});

store.dispatch({ type: "@@INIT" });
export default store;
