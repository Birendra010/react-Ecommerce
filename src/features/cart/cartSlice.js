import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, fetchItemsByUserId ,updateItem, deleteItemFromCart } from "./cartAPI";

const initialState = {
  
  status: "idle",
  items: [],
};

//add to cart 
export const addToCartAsync = createAsyncThunk(
  "cart/addToCart", async (item) => {
  const response = await addToCart(item);
  return response.data;
});
// Get all items in cart when user loggedIn
export const fetchItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchItemsByUserId",
  async (userId) => {
    const response = await fetchItemsByUserId(userId);

    return response.data;
  }
);
// update item quantity in cart 
export const updateItemAsync = createAsyncThunk(
  "cart/updateItem", async (update) => {
  const response = await updateItem(update);
  return response.data;
});
// Remove items in cart
export const deleteItemFromCartAsync = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);

    return response.data;
  }
);
//reset cart after succes-order
export const resetCartAsync = createAsyncThunk(
  "cart/resetCart", async (userId) => {
  const response = await deleteItemFromCart(userId);
  return response.data;
});




export const orderSlice = createSlice({
  name: 'cart',
  initialState,
  
  reducers: {
    //reset current order
    resetOrder: (state) => {
      state.currentOrder = null;
      
    },

   
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })

      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // update the cartItems in cart when already availble in cart because update the item quantity through dropdown
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        // remove item
        state.items.splice(index, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items =[]
        
      });
  },
});
//for reset currentOrder
export const { resetOrder } = orderSlice.actions;


export const selectItems = (state) => state.cart.items;



export default orderSlice.reducer;
