import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import layoutSlice from "../features/layout/layoutSlice";
import postSlice from "../features/posts/postSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    layout: layoutSlice,
    posts: postSlice,
  },
});

export default store;
