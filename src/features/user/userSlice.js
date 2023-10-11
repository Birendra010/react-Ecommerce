import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUser } from './userAPI';

const initialState = {
  userInfo: 0,
  status: 'idle',
};


export const fetchLoggedInUserAsync = createAsyncThunk(
  "counter/fetchLoggedInUser",
  async (userId) => {
    const response = await fetchLoggedInUser(userId);

    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  
  reducers: {
    increment: (state) => {

      state.value += 1;
    },

   
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        //this info can be diffent or more from logged -In user Info
        state.userInfo = action.payload;
      });
  },
});

export const { increment } = userSlice.actions;


export default userSlice.reducer;
