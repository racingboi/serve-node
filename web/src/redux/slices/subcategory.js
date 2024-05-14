import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SubcategoryService from "../../services/subcategory";
const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
  try {
    const response = await asyncFunction(...args);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
};
export const getAll = createAsyncThunk(
  "subcategories/getAll",
  (_, thunkAPI) => handleAsyncThunk(SubcategoryService.getAll, [null], thunkAPI)
);
export const create = createAsyncThunk(
  "subcategories/create",
  (data, thunkAPI) => handleAsyncThunk(SubcategoryService.create, [data], thunkAPI)
);
const subcategorySlice = createSlice({
  name: "subcategories",
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
      .addCase(create.fulfilled, (state,{payload}) => {
        state.status = "success";
        state.data = payload;
      })
      .addCase(create.pending, (state) => {
        state.status = "loading";
      })
      .addCase(create.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  }
});
export const { resetState } = subcategorySlice.actions;
export const { resetStateCreate } = subcategorySlice.actions;

export default subcategorySlice.reducer;