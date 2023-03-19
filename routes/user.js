import express from "express";
import {
  addOrRemoveFriend,
  createUserProfile,
  getUserFriends,
  getUserProfile,
} from "../controllers/user.js";
const router = express.Router();

router.route("/profile").post(createUserProfile).get(getUserProfile);

router.route("/profile/:id").get(getUserFriends);

router.route("/:id/:friendId").patch(addOrRemoveFriend);

export default router;
