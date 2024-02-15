import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: [],
  reducers: {
    addToWishlist: (state, action) => {
      const productId = action.payload;
      if (!state.includes(productId)) {
        state.push(productId);
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      return state.filter(id => id !== productId);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
