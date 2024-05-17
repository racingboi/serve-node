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
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  (id, thunkAPI) => handleAsyncThunk(ProductService.delete, [id], thunkAPI)
);
export const getProduct = createAsyncThunk(
  "products/getProduct",
  (id, thunkAPI) => handleAsyncThunk(ProductService.getproduct, [id], thunkAPI)
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
      state.createProduct = "idle";
    },
    resetDelete: (state) => {
      state.error = null;
      state.deleteProduct = "idle";
    },
    resetGetProduct: (state) => {
      state.error = null;
      state.getProduct = "idle";
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
        state.createProduct = "success";
        state.data = payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.createProduct = "loading";
      })
      .addCase(createProduct.rejected, (state, { payload }) => {
        state.createProduct = "failed";
        state.error = payload;
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.deleteProduct = "success";
        state.data = payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.deleteProduct = "loading";
      })
      .addCase(deleteProduct.rejected, (state, { payload }) => {
        state.deleteProduct = "failed";
        state.error = payload;
      })
      .addCase(getProduct.fulfilled, (state, { payload }) => {
        state.getProduct = "success";
        state.data = payload;
      })
      .addCase(getProduct.pending, (state) => {
        state.getProduct = "loading";
      })
      .addCase(getProduct.rejected, (state, { payload }) => {
        state.getProduct = "failed";
        state.error = payload;
      });
  }
});

export const { resetState } = productsSlice.actions;
export const { resetStateCreate } = productsSlice.actions;
export const { resetDelete } = productsSlice.actions;
export const { resetGetProduct } = productsSlice.actions;
export default productsSlice.reducer;
