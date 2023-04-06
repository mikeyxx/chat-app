import express from "express";
import {
  addOrRemoveFriend,
  getUserFriends,
  getUserProfile,
} from "../controllers/user.js";
const router = express.Router();

router.route("/:id").get(getUserProfile);

router.route("/:id/friends").get(getUserFriends);

router.route("/:id/:friendId").patch(addOrRemoveFriend);

export default router;
