import Post from "../models/Post.js";
import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { BadRequestError, Not_Found } from "../errors/index.js";

export const createPost = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    const { description, picturePath } = req.body;

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      userPicturePath: user.picturePath,
      description,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();

    const post = await Post.find();

    res.status(StatusCodes.CREATED).json(post);
  } catch (error) {
    throw new BadRequestError("Post not created");
  }
};

export const getAllFeeds = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(StatusCodes.OK).json(post);
  } catch (error) {
    throw new Not_Found("Posts not found");
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    res.status(StatusCodes.OK).json(post);
  } catch (error) {
    throw new Not_Found("Post not found");
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(StatusCodes.OK).json(updatedPost);
  } catch (error) {
    throw new BadRequestError("Action not completed successfully");
  }
};
