import express from "express";
import {
  getInvitations,
  getUsersToInvite,
  inviteUser,
} from "../../controllers/invite/inviteController.js";
import { authorize } from "../../middleware/authorize.js";

const router = express.Router();

router.route("/invite/:name").get(authorize, getUsersToInvite);
router.route("/invite").post(authorize, inviteUser);
router.route("/invite").get(authorize, getInvitations);

export default router;
