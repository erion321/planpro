import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  columns: [],
  message: "",
};

export const getColumns = createAsyncThunk(
  "columns/getColumns",
  async (data, thunkAPI) => {
    try {
      const {
        auth: { token },
        teams: { selectedTeam },
        boards: { selectedBoard },
      } = thunkAPI.getState();

      const response = await axios.post(
        `http://localhost:5000/api/plan_pro/columns`,
        { selectedTeam },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createColumns = createAsyncThunk(
  "columns/createColumns",
  async (column, thunkAPI) => {
    const {
      auth: { token },
      teams: { selectedTeam },
    } = thunkAPI.getState();

    const response = await axios.post(
      "http://localhost:5000/api/plan_pro/createColumn",
      { column, selectedTeam },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const columnSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    resetColumnState: (state) => {
      state.columns = [];
    },
  },
  extraReducers: (builder) => {
    //GET Columns
    builder.addCase(getColumns.pending, () => {});
    builder.addCase(getColumns.fulfilled, (state, action) => {
      state.columns = action.payload;
    });
    builder.addCase(getColumns.rejected, (state, action) => {
      state.message = action.payload;
    });

    //CREATE Columns
    builder.addCase(createColumns.pending, () => {});
    builder.addCase(createColumns.fulfilled, (state, action) => {
      state.columns = [...state.columns, action.payload];
    });
    builder.addCase(createColumns.rejected, () => {});
  },
});

export const { resetColumnState } = columnSlice.actions;
export default columnSlice.reducer;
