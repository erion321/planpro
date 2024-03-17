import express from "express";
import {
  createBoard,
  getBoards,
  selectBoard,
} from "../../controllers/board/boardController.js";

const router = express.Router();

router.route("/boards").post(createBoard).get(getBoards);
router.route("/selectBoard").post(selectBoard);

export default router;
