import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersReducer';
import productsReducer from './slices/productReducer';
import categoryReducer from './slices/categoryReducer';
import authReducer from './slices/authReducer';
import cartReducer from './slices/cartReducer';
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
    categories: categoryReducer,
    auth: authReducer,
    cart: cartReducer,
  }
});
export default store;