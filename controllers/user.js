import User from "../models/User.js";
import Post from "../models/Post.js";
import UserProfile from "../models/UserProfileInfo.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, Not_Found } from "../errors/index.js";

export const createUserProfile = async (req, res) => {
  try {
    const { userId } = req.user;

    const post = await Post.find({ userId });

    const user = await User.findById(userId);

    const userProfileData = new UserProfile({
      firstName: user.firstName,
      userName: user.userName,
      bio: user.bio,
      picturePath: user.picturePath,
      location: user.location,
      dob: user.dob,
      post: post,
      media: post.picturePath,
    });

    const userProfile = await userProfileData.save();
    res.status(StatusCodes.CREATED).json(userProfile);
  } catch (error) {
    throw new BadRequestError("User profile not created");
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const userData = await UserProfile.find({ userId });
    res.status(StatusCodes.OK).json(userData);
  } catch (error) {
    throw new Not_Found("User not found");
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map((f) => {
      const { _id, firstName, lastName, bio, dob, location, picturePath } = f;
      return { _id, firstName, lastName, bio, dob, location, picturePath };
    });

    res.status(StatusCodes.OK).json(formattedFriends);
  } catch (error) {
    throw new Not_Found("User has no friends");
  }
};

export const addOrRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
    } else {
      user.friends.push(friendId);
    }

    await user.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map((f) => {
      const { _id, firstName, lastName, bio, dob, location, picturePath } = f;
      return { _id, firstName, lastName, bio, dob, location, picturePath };
    });

    res.status(StatusCodes.OK).json(formattedFriends);
  } catch (error) {
    throw new BadRequestError("Unable to add or remove friend");
  }
};
