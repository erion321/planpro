import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  teams: [],
  selectedTeam: {},
};

export const selectTeam = createAsyncThunk(
  "teams/selectTeam",
  async (id, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState();

    const response = await axios.post(
      "http://localhost:5000/api/plan_pro/selectTeam",
      { id },
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
  async (teamData, thunkAPI) => {
    const response = await axios.post(
      "http://localhost:5000/api/plan_pro/team",
      teamData
    );
    return response.data;
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
    builder.addCase(createTeam.pending, () => {});
    builder.addCase(createTeam.fulfilled, (state, action) => {
      state.teams = [...state.teams, action.payload];
    });
    builder.addCase(createTeam.rejected, () => {});

    //GET TEAMS
    builder.addCase(getTeams.pending, () => {});
    builder.addCase(getTeams.fulfilled, (state, action) => {
      state.teams = action.payload;
    });
    builder.addCase(getTeams.rejected, () => {});

    //OPEN TEAM
    builder.addCase(selectTeam.pending, () => {});
    builder.addCase(selectTeam.fulfilled, (state, action) => {
      state.selectedTeam = action.payload;
    });
    builder.addCase(selectTeam.rejected, () => {});
  },
});

export const { resetTeamState } = teamSlice.actions;
console.log(teamSlice);
export default teamSlice.reducer;
