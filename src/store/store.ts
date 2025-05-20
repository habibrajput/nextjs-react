import { configureStore } from '@reduxjs/toolkit';
import { postSlice } from '@/store/slices/postSlice';

export const store = configureStore({
  reducer: {
    posts: postSlice.reducer
  }
});
