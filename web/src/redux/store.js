import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersReducer';
import productsReducer from './slices/productReducer';
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
  }
});
export default store;