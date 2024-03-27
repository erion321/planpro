import express from "express";
import {
  createBoard,
  getBoards,
  selectBoard,
} from "../../controllers/board/boardController.js";
import { authorize } from "../../middleware/authorize.js";

const router = express.Router();

router.route("/boards").post(authorize, createBoard).get(authorize, getBoards);
router.route("/selectBoard").post(authorize, selectBoard);

export default router;
