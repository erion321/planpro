import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");

const initialState = {
  token: token ? token : null,
  error: "",
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/plan_pro/register",
        userData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/plan_pro/login",
        userData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/* export const logoutUser = createAsyncThunk("auth/logout", (_, thunkAPI) => {
  const {
    auth: { token },
  } = thunkAPI.getState();
  localStorage.setItem("token", "");
}); */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.token = "";
      localStorage.setItem("token", "");
    },
    removeError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    //REGISTER A USER
    builder.addCase(registerUser.pending, (state, action) => {});
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
      return localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.payload.message;
    });

    //LOG IN A USER
    builder.addCase(loginUser.pending, (state) => {});
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
      return localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload.message;
    });
  },
});

export const { resetAuthState, removeError } = authSlice.actions;

export default authSlice.reducer;
