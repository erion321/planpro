import express from "express";
import {
  createTask,
  getTasks,
  selectTask,
} from "../../controllers/task/taskController.js";

const router = express.Router();

router.route("/tasks").get(getTasks);
router.route("/tasks").post(createTask);
router.route("/selectTask").post(selectTask);

export default router;
