import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UsersService from "../../services/user.services";

const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
  try {
    const response = await asyncFunction(...args);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
};
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  (_, thunkAPI) => handleAsyncThunk(UsersService.getAll, [null], thunkAPI)
);
export const updateUser = createAsyncThunk(
  "users/updateUser",
  ({ userId, data }, thunkAPI) => handleAsyncThunk(UsersService.update, [userId, data], thunkAPI)
);
export const createUser = createAsyncThunk(
  "users/createUser",
  (data, thunkAPI) => handleAsyncThunk(UsersService.create, [data], thunkAPI)
);
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  (userId, thunkAPI) => handleAsyncThunk(UsersService.delete, [userId], thunkAPI)
);

const usersSlice = createSlice({
  name: "users",
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
    resetStateUpdate: (state) => {
      state.error = null;
      state.statusUpdate = "idle";
    },
    resetStateCreate: (state) => {
      state.error = null;
      state.statusCreate = "idle";
    },
    resetStateDelete: (state) => {
      state.error = null;
      state.statusDelete = "idle";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.users = payload;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUsers.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.statusUpdate = "success";
        state.updateData = payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.statusUpdate = "loading";
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.statusUpdate = "failed";
        state.error = payload;
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.statusCreate = "success";
        state.createData = payload;
      })
      .addCase(createUser.pending, (state) => {
        state.statusCreate = "loading";
      })
      .addCase(createUser.rejected, (state, { payload }) => {
        state.statusCreate = "failed";
        state.error = payload;
      })
    .addCase(deleteUser.fulfilled, (state, { payload }) => {
      state.statusDelete = "success";
      state.deleteData = payload;
    })
    .addCase(deleteUser.pending, (state) => {
      state.statusDelete = "loading"; 
    })
    .addCase(deleteUser.rejected, (state, { payload }) => {
      state.statusDelete = "failed";
      state.error = payload;
    });
  },
});
export const { resetState } = usersSlice.actions;
export default usersSlice.reducer;
export const { resetStateUpdate: resetStateUpdateAction } = usersSlice.actions;
export const { resetStateCreate: resetStateCreateAction } = usersSlice.actions;
export const { resetStateDelete: resetStateDeleteAction } = usersSlice.actions;