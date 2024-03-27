import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import teamReducer from "./features/teams/teamSlice";
import boardReducer from "./features/boards/boardSlice";
import columnReducer from "./features/columns/columnSlice";
import taskReducer from "./features/tasks/taskSlice";
import inviteReducer from "./features/invite/inviteSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    teams: teamReducer,
    boards: boardReducer,
    columns: columnReducer,
    tasks: taskReducer,
    invite: inviteReducer,
  },
});

export default store;
