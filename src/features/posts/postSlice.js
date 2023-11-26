import { createSlice } from "@reduxjs/toolkit";
import LogHelper from "@/utility/LogHelper";

const initialState = {
  publicPosts: [],
  userPosts: [],
  selectedPost: {},
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getUserPosts: (state, action) => {
      state.userPosts = action.payload;
    },
    clearUserPosts: (state, action) => {
      LogHelper.log("action", action);
      state.userPosts = [];
    },
    getPublicPosts: (state, action) => {
      state.publicPosts = action.payload;
    },
    clearPublicPosts: (state, action) => {
      LogHelper.log("action", action);
      state.publicPosts = [];
    },
    getSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    clearSelectedPost: (state, action) => {
      LogHelper.log("action", action);
      state.selectedPost = {};
    },
  },
});

export const {
  getUserPosts,
  clearUserPosts,
  clearPublicPosts,
  getPublicPosts,
  clearSelectedPost,
} = postSlice.actions;

export default postSlice.reducer;
