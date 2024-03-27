import express from "express";
import {
  createColumns,
  getColumns,
} from "../../controllers/column/columnController.js";
import { authorize } from "../../middleware/authorize.js";

const router = express.Router();

router.route("/createColumn").post(authorize, createColumns);
router.route("/columns").post(authorize, getColumns);

export default router;
