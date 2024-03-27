import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  message: "",
  invitations: [],
};

export const getUsersToInvite = createAsyncThunk(
  "invite/getUsersToInvite",
  async (searchUser, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState();

    const response = await axios.get(
      `http://localhost:5000/api/plan_pro/invite/${searchUser}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
);

export const inviteUser = createAsyncThunk(
  "invite/inviteUser",
  async (invitation, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/plan_pro/invite`,
        invitation,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getInvitations = createAsyncThunk(
  "invite/getInvitations",
  async (_, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState();
    try {
      const response = await axios.get(
        "http://localhost:5000/api/plan_pro/invite",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const inviteSlice = createSlice({
  name: "invite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //GET USERS TO INVITE
      .addCase(getUsersToInvite.pending, () => {})
      .addCase(getUsersToInvite.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getUsersToInvite.rejected, (state, action) => {
        state.message = action.payload.message;
      })

      //GET INVITATIONS
      .addCase(getInvitations.pending, () => {})
      .addCase(getInvitations.fulfilled, (state, action) => {
        state.invitations = action.payload;
      })
      .addCase(getInvitations.rejected, (state, action) => {
        state.message = action.payload.message;
      });
  },
});

export const {} = inviteSlice.actions;
export default inviteSlice.reducer;
