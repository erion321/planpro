import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  boards: [],
  selectedBoard: {},
};

export const selectBoard = createAsyncThunk(
  "boards/selectBoard",
  async (id, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState();

    const response = await axios.post(
      "http://localhost:5000/api/plan_pro/selectBoard",
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

export const getBoards = createAsyncThunk(
  "boards/getBoards",
  async (_, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState();

    const response = await axios.get(
      `http://localhost:5000/api/plan_pro/boards`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const createBoard = createAsyncThunk(
  "boards/createBoard",
  async (board, thunkAPI) => {
    const response = await axios.post(
      `http://localhost:5000/api/plan_pro/boards`,
      board
    );
    return response.data;
  }
);

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    resetBoardState: (state) => {
      state.boards = [];
      state.selectedBoard = {};
    },
  },
  extraReducers: (builder) => {
    //GET BOARDS
    builder.addCase(getBoards.pending, () => {});
    builder.addCase(getBoards.fulfilled, (state, action) => {
      state.boards = action.payload;
    });
    builder.addCase(getBoards.rejected, () => {});

    //CREATE BOARD
    builder.addCase(createBoard.pending, () => {});
    builder.addCase(createBoard.fulfilled, (state, action) => {
      state.boards = [...state.boards, action.payload];
    });
    builder.addCase(createBoard.rejected, () => {});

    //OPEN TEAM
    builder.addCase(selectBoard.pending, () => {});
    builder.addCase(selectBoard.fulfilled, (state, action) => {
      state.selectedBoard = action.payload;
    });
    builder.addCase(selectBoard.rejected, () => {});
  },
});

export const { resetBoardState } = boardSlice.actions;
export default boardSlice.reducer;
