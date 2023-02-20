import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import commentSlice from './auth/commentSlice';
import postSlice from './auth/postSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postSlice,
    comments: commentSlice,
  },
});
