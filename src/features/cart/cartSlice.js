import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './cartAPI';

const initialState = {
  value: 0,
  status: 'idle',
};


export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    const response = await fetchCount(amount);

    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'counter',
  initialState,
  
  reducers: {
    increment: (state) => {

      state.value += 1;
    },

   
  },

  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const { increment } = cartSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state) => state.counter.value;



export default cartSlice.reducer;
