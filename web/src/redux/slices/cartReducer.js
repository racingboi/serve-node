import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CartService from "../../services/cart.services";
const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
  try {
    const response = await asyncFunction(...args);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
};
export const getCart = createAsyncThunk(
  "cart/getCart",
  (_, thunkAPI) => handleAsyncThunk(CartService.getCart, [null], thunkAPI)
);
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  (data, thunkAPI) => handleAsyncThunk(CartService.addToCart, [data], thunkAPI)
);
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  ({ cartId, data }, thunkAPI) => handleAsyncThunk(CartService.updateCart, [cartId, data], thunkAPI)
);
export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  (id, thunkAPI) => handleAsyncThunk(CartService.deleteCart, [id], thunkAPI)
);
const cartSlice = createSlice({
  name: "cart",
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
    resetAddToCartState: (state) => {
      state.error = null;
      state.addToCart = "idle";
    },
    resetUpdateCartState: (state) => {
      state.error = null;
      state.updateCart = "idle";
    },
    resetDeleteCartState: (state) => {
      state.error = null;
      state.statusDeleteCart = "idle";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload.data;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(addToCart.pending, (state) => {
        state.statusAddCart = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.statusAddCart = "success";
        state.data = action.payload.data;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.statusAddCart = "failed";
        state.error = action.payload.message;
      })
      .addCase(updateCart.pending, (state) => {
        state.statusUpdateCart = "loading";
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.statusUpdateCart = "success";
        state.data = action.payload.data;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.statusUpdateCart = "failed";
        state.error = action.payload.message;
      })
      .addCase(deleteCart.pending, (state) => {
        state.statusDeleteCart = "loading";
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.statusDeleteCart = "success";
        state.data = action.payload.data;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.statusDeleteCart = "failed";
        state.error = action.payload.message;
      });
  }
});
export const { resetState, resetAddToCartState, resetUpdateCartState, resetDeleteCartState } = cartSlice.actions;
export default cartSlice.reducer;
