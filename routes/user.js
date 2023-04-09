const express = require("express");
const {
  addOrRemoveFriend,
  getUserFriends,
  getUserProfile,
} = require("../controllers/user.js");
const router = express.Router();

router.route("/:id").get(getUserProfile);

router.route("/:id/friends").get(getUserFriends);

router.route("/:id/:friendId").patch(addOrRemoveFriend);

module.exports = router;
