import express from "express";
import { getAllFeeds, getUserPosts, likePost } from "../controllers/posts.js";

const router = express.Router();

router.route("/").get(getAllFeeds);
router.route("/:id/post").get(getUserPosts);
router.route("/:id/like").patch(likePost);

export default router;
