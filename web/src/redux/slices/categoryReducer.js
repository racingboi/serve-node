import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoryService from "../../services/category";

const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
  try {
    const response = await asyncFunction(...args);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
};
export const getAll = createAsyncThunk(
  "categories/getAll",
  (_, thunkAPI) => handleAsyncThunk(CategoryService.getAll, [null], thunkAPI)
); 
export const createCategory = createAsyncThunk(
  "categories/create",
  (data, thunkAPI) => handleAsyncThunk(CategoryService.create, [data], thunkAPI)
);
const categorySlice = createSlice({
  name: "categories",
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
    resetCreateState: (state) => {
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.data = payload;
      })
      .addCase(getAll.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAll.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })
      .addCase(createCategory.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.data= payload;
      })
      .addCase(createCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCategory.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  }
});
export const { resetState } = categorySlice.actions;
export const { resetCreateState } = categorySlice.actions;
export default categorySlice.reducer;