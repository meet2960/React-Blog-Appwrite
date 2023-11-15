import { createSlice } from "@reduxjs/toolkit";

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
      state.userPosts = [];
    },
    getPublicPosts: (state, action) => {
      state.publicPosts = action.payload;
    },
    clearPublicPosts: (state, action) => {
      state.publicPosts = [];
    },
    getSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    clearSelectedPost: (state, action) => {
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
