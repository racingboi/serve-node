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
export const getCurrentUser = createAsyncThunk(
  "auth/getuser",
  (_, thunkAPI) => handleAsyncThunk(AuthService.getuser, [null], thunkAPI)
);
export const updateUser = createAsyncThunk(
  "auth/updateuser",
  (data, thunkAPI) => handleAsyncThunk(AuthService.updateUser, [data], thunkAPI)
);
export const logout = createAsyncThunk(
  "auth/logout",
  (_, thunkAPI) => handleAsyncThunk(AuthService.logout, [null], thunkAPI)
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
      state.statusRegister = "idle";
    },
    resetGetUserState: (state) => {
      state.error = null;
      state.statusUser = "idle";
    },
    resetUpdateUserState: (state) => {
      state.error = null;
      state.statusUpdate = "idle";
    },
    resetLogoutState: (state) => {
      state.error = null;
      state.statusLogout = "idle";
    }
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
        state.statusRegister = "success";
        state.data = payload;
      })
      .addCase(RegisterAPI.pending, (state) => {
        state.statusRegister = "loading";
      })
      .addCase(RegisterAPI.rejected, (state, { payload }) => {
        state.statusRegister = "failed";
        state.error = payload;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.statusUser = "success";
        state.data = payload;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.statusUser = "loading";
      })
      .addCase(getCurrentUser.rejected, (state, { payload }) => {
        state.statusUser = "failed";
        state.error = payload;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.statusUpdate = "success";
        state.data = payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.statusUpdate = "loading";
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.statusUpdate = "failed";
        state.error = payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.statusLogout = "success";
      })
      .addCase(logout.pending, (state) => {
        state.statusLogout = "loading";
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.statusLogout = "failed";
        state.error = payload;
      });
  }
});
export const { resetLoginState } = AuthSlice.actions;
export const { resetregisterState } = AuthSlice.actions;
export const { resetGetUserState } = AuthSlice.actions;
export const { resetUpdateUserState } = AuthSlice.actions;
export const { resetLogoutState } = AuthSlice.actions;
export default AuthSlice.reducer;