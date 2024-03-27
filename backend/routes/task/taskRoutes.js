import express from "express";
import {
  createTask,
  getTasks,
  selectTask,
} from "../../controllers/task/taskController.js";
import { authorize } from "../../middleware/authorize.js";

const router = express.Router();

router.route("/tasks").get(getTasks);
router.route("/tasks").post(authorize, createTask);
router.route("/selectTask").post(selectTask);

export default router;
