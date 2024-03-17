import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  columns: [],
};

const token = localStorage.getItem("token");

export const getColumns = createAsyncThunk(
  "columns/getColumns",
  async (data, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState();
    
    const response = await axios.get(
      `http://localhost:5000/api/plan_pro/columns`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const createColumns = createAsyncThunk(
  "columns/createColumns",
  async (column, thunkAPI) => {
    const response = await axios.post(
      "http://localhost:5000/api/plan_pro/columns",
      { column },
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
    builder.addCase(getColumns.rejected, () => {});

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
