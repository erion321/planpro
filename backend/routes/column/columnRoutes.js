import express from "express";
import {
  createColumns,
  getColumns,
} from "../../controllers/column/columnController.js";

const router = express.Router();

router.route("/columns").post(createColumns);
router.route("/columns").get(getColumns);

export default router;
