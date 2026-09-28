import { configureStore } from '@reduxjs/toolkit';

// Temporary fallback reducers (replace with actual slice reducers as you build them)
// Example: import cartReducer from './slices/cartSlice';
const placeholderReducer = (initialState = {}) => (state = initialState) => state;

export const store = configureStore({
  reducer: {
    cart: placeholderReducer({ items: [], totalAmount: 0 }),
    wishlist: placeholderReducer({ items: [] }),
    auth: placeholderReducer({ user: null, isAuthenticated: false }),
    products: placeholderReducer({ items: [], loading: false, error: null }),
    orders: placeholderReducer({ list: [] }),
    theme: placeholderReducer({ mode: 'light' }),
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;