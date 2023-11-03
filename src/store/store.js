import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import layoutSlice from "../features/layout/layoutSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    layout: layoutSlice,
  },
});

export default store;
