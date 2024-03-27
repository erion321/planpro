import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  teams: [],
  selectedTeam: {},
};

export const selectTeam = createAsyncThunk(
  "teams/selectTeam",
  async (teamId, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState();

    const response = await axios.post(
      "http://localhost:5000/api/plan_pro/selectTeam",
      { teamId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const getTeams = createAsyncThunk(
  "teams/getTeams",
  async (_, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState();
    const response = await axios.get(
      "http://localhost:5000/api/plan_pro/team",

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
);

export const createTeam = createAsyncThunk(
  "teams/createTeam",
  async (team, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState();

    const response = await axios.post(
      "http://localhost:5000/api/plan_pro/team",
      { team },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const joinTeamByInvite = createAsyncThunk(
  "teams/joinTeamByInvite",
  async (teamId, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/plan_pro/joinTeamByInvite",
        { teamId },
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

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    resetTeamState: (state) => {
      state.teams = [];
      state.selectedTeam = {};
    },
  },
  extraReducers: (builder) => {
    //CREATE TEAM
    builder
      .addCase(createTeam.pending, () => {})
      .addCase(createTeam.fulfilled, (state, action) => {
        state.teams = [...state.teams, action.payload];
        state.selectedTeam = action.payload;
      })
      .addCase(createTeam.rejected, () => {})

      //GET TEAMS
      .addCase(getTeams.pending, () => {})
      .addCase(getTeams.fulfilled, (state, action) => {
        state.teams = action.payload;
      })
      .addCase(getTeams.rejected, () => {})

      //SELECT TEAM
      .addCase(selectTeam.pending, () => {})
      .addCase(selectTeam.fulfilled, (state, action) => {
        state.selectedTeam = action.payload;
      })
      .addCase(selectTeam.rejected, () => {})

      //JOIN TEAM BY INVITE
      .addCase(joinTeamByInvite.pending, () => {})
      .addCase(joinTeamByInvite.fulfilled, (state, action) => {
        state.selectedTeam = action.payload;
      })
      .addCase(joinTeamByInvite.rejected, () => {});
  },
});

export const { resetTeamState } = teamSlice.actions;
console.log(teamSlice);
export default teamSlice.reducer;
