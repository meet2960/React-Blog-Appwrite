import { configureStore } from '@reduxjs/toolkit'
import authSlice from '@/features/auth/authSlice'
import layoutSlice from '@/features/layout/layoutSlice'
import postSlice from '@/features/posts/postSlice'
import { applicationModeObj } from '@/entites/ApplicationMode'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    layout: layoutSlice,
    posts: postSlice
  },
  /* eslint-disable */
  devTools: process.env.NODE_ENV !== applicationModeObj.PRODUCTION
})
