import express from "express";
import {
  createTeam,
  getTeams,
  joinTeamByInvite,
  selectTeam,
} from "../../controllers/team/teamController.js";
import { authorize } from "../../middleware/authorize.js";
//import { authorize } from "../middleware/authorize.js";
const router = express.Router();

router.route("/team").post(authorize, createTeam).get(authorize, getTeams);
router.route("/selectTeam").post(authorize, selectTeam);
router.route("/joinTeamByInvite").post(authorize, joinTeamByInvite);

export default router;
