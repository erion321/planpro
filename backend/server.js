import express from "express";
import db from "./db/connect.js";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { authorize } from "./middleware/authorize.js";
import userRoutes from "./routes/user/userRoutes.js";
import teamRoutes from "./routes/team/teamRoutes.js";
import boardRoutes from "./routes/board/boardRoutes.js";
import columnRoutes from "./routes/column/columnRoutes.js";
import taskRoutes from "./routes/task/taskRoutes.js";
import inviteRoutes from "./routes/invite/inviteRoutes.js";

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));

//app.use(authorize);
app.use("/api/plan_pro", userRoutes);
app.use("/api/plan_pro", teamRoutes);
app.use("/api/plan_pro", boardRoutes);
app.use("/api/plan_pro", columnRoutes);
app.use("/api/plan_pro", taskRoutes);
app.use("/api/plan_pro", inviteRoutes);

app.listen(5000, () => {
  console.log("App running on port 5000");
  console.log("App running on port 5000");
});
