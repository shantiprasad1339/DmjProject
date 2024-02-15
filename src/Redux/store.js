import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from './wishlistSlice';

export default configureStore({
  reducer: {
    wishlist: wishlistReducer,
  },
});
