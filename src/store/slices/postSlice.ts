import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = [{ id: 300, name: 'First Post' }];

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<any>) => {
      state.push(...action.payload);
    },
    deletePost: (state, action: PayloadAction<any>) => {
      const { id } = action.payload;
      state.splice(id, 1);
    },
    updatePost: (state, action: PayloadAction<any>) => {
      const { id, name } = action.payload;
      state[id].name = name;
    }
  }
});

export const { addPost, deletePost, updatePost } = postSlice.actions;
export default postSlice.reducer;
