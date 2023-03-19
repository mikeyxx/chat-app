import express from "express";
import { getAllFeeds, getSinglePost, likePost } from "../controllers/posts.js";

const router = express.Router();

router.route("/").get(getAllFeeds);
router.route("/:id").get(getSinglePost);
router.route("/:id/like").patch(likePost);

export default router;
