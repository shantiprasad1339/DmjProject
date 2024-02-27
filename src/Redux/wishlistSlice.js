// wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  count: 0
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      state.items.push(action.payload);
      state.count++;
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      state.count--;
    }
  }
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
