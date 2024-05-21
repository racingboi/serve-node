import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../services/auth.services";
const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
  try {
    const response = await asyncFunction(...args);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
};
export const LoginAPI = createAsyncThunk(
  "auth/login",
  (data, thunkAPI) => handleAsyncThunk(AuthService.login, [data], thunkAPI)
);
export const RegisterAPI = createAsyncThunk(
  "auth/register",
  (data, thunkAPI) => handleAsyncThunk(AuthService.register, [data], thunkAPI)
);
const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetLoginState: (state) => {
      state.error = null;
      state.status = "idle";
    },
    resetregisterState: (state) => {
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginAPI.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.data = payload;
      })
      .addCase(LoginAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LoginAPI.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })
      .addCase(RegisterAPI.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.data = payload;
      })
      .addCase(RegisterAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(RegisterAPI.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  }
});
export const { resetLoginState } = AuthSlice.actions;
export const { resetregisterState } = AuthSlice.actions;
export default AuthSlice.reducer;