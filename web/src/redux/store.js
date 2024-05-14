import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersReducer';
import productsReducer from './slices/productReducer';
import categoryReducer from './slices/categoryReducer';
import subcategoryReducer from './slices/subcategory';
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
    categories: categoryReducer,
    subcategories: subcategoryReducer,
  }
});
export default store;