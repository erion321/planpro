import express from "express";
import {
  createTeam,
  getTeams,
  selectTeam,
} from "../../controllers/team/teamController.js";
//import { authorize } from "../middleware/authorize.js";
const router = express.Router();

router.route("/team").post(createTeam).get(getTeams);
router.route("/selectTeam").post(selectTeam);

export default router;
