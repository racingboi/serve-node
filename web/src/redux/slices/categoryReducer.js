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
export const updateCategory = createAsyncThunk(
  "categories/update",
  ({ categoryId, data }, thunkAPI) => handleAsyncThunk(CategoryService.update, [categoryId,data], thunkAPI)
);
export const deleteCategory = createAsyncThunk(
  "categories/delete",
  (id, thunkAPI) => handleAsyncThunk(CategoryService.delete, [id], thunkAPI)
);
export const getCategory = createAsyncThunk(
  "categories/getCategory",
  (id, thunkAPI) => handleAsyncThunk(CategoryService.getCategory, [id], thunkAPI)
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
      state.createCategory = "idle";
    },
    resetUpdateState: (state) => {
      state.error = null;
      state.updateCategory = "idle";
    },
    resetDeleteState: (state) => {
      state.error = null;
      state.deleteCategory = "idle";
    },
    resetGetCategoryState: (state) => {
      state.error = null;
      state.getCategory = "idle";
    }
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
        state.createCategory = "success";
        state.data= payload;
      })
      .addCase(createCategory.pending, (state) => {
        state.createCategory = "loading";
      })
      .addCase(createCategory.rejected, (state, { payload }) => {
        state.createCategory = "failed";
        state.error = payload;
      })
      .addCase(updateCategory.fulfilled, (state, { payload }) => {
        state.updateCategory = "success";
        state.data = payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.updateCategory = "loading";
      })
      .addCase(updateCategory.rejected, (state, { payload }) => {
        state.updateCategory = "failed";
        state.error = payload;
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.deleteCategory = "success";
        state.data = payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.deleteCategory = "loading";
      })
      .addCase(deleteCategory.rejected, (state, { payload }) => {
        state.deleteCategory = "failed";
        state.error = payload;
      })
      .addCase(getCategory.fulfilled, (state, { payload }) => {
        state.getCategory = "success";
        state.data = payload;
      })
      .addCase(getCategory.pending, (state) => {
        state.getCategory = "loading";
      })
      .addCase(getCategory.rejected, (state, { payload }) => {
        state.getCategory = "failed";
        state.error = payload;
      });
  }
});
export const { resetState } = categorySlice.actions;
export const { resetCreateState } = categorySlice.actions;
export const { resetUpdateState } = categorySlice.actions;
export const { resetDeleteState } = categorySlice.actions;
export const { resetGetCategoryState } = categorySlice.actions;
export default categorySlice.reducer;