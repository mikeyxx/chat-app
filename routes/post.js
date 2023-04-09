const express = require("express");
const {
  getAllFeeds,
  getUserPosts,
  likePost,
} = require("../controllers/posts.js");

const router = express.Router();

router.route("/").get(getAllFeeds);
router.route("/:id/post").get(getUserPosts);
router.route("/:id/like").patch(likePost);

module.exports = router;
