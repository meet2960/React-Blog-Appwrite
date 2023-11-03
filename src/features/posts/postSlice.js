import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  publicPosts: [],
  userPosts: [],
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setUserPosts: (state, action) => {
      state.userPosts = action.payload;
    },
    setPublicPosts: (state, action) => {
      state.publicPosts = action.payload;
    },
  },
});

export const { setUserPosts, setPublicPosts } = postSlice.actions;
