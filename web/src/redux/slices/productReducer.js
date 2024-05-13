import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductService from "../../services/product.sevices";

const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
  try {
    const response = await asyncFunction(...args);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
};

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  (_, thunkAPI) => handleAsyncThunk(ProductService.getAll, [null], thunkAPI)
);
export const createProduct = createAsyncThunk(
  "products/createProduct",
  (product, thunkAPI) => handleAsyncThunk(ProductService.create, [product], thunkAPI)
);
const productsSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.error = null;
      state.status = "idle";
    },
    resetStateCreate: (state) => {
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.data = payload;
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProducts.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.data = payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  }
});

export const { resetState } = productsSlice.actions;
export const { resetStateCreate } = productsSlice.actions;
export default productsSlice.reducer;
