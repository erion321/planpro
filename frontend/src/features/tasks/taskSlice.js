import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tasks: [],
  selectedTask: {},
};

export const selectTask = createAsyncThunk(
  "tasks/selectTask",
  async (id, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState();

    const response = await axios.post(
      "http://localhost:5000/api/plan_pro/selectTask",
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

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState();

    const response = await axios.get(
      `http://localhost:5000/api/plan_pro/tasks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (task, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState();

    const response = await axios.post(
      `http://localhost:5000/api/plan_pro/tasks`,
      task,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    resetTaskState: (state) => {
      state.tasks = [];
      state.selectedTask = {};
    },
  },
  extraReducers: (builder) => {
    //GET TASKS
    builder.addCase(getTasks.pending, () => {});
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(getTasks.rejected, () => {});

    //CREATE TASK
    builder.addCase(createTask.pending, () => {});
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    });
    builder.addCase(createTask.rejected, () => {});

    //OPEN TASK
    builder.addCase(selectTask.pending, () => {});
    builder.addCase(selectTask.fulfilled, (state, action) => {
      state.selectedTask = action.payload;
    });
    builder.addCase(selectTask.rejected, () => {});
  },
});

export const { resetTaskState } = taskSlice.actions;
export default taskSlice.reducer;
