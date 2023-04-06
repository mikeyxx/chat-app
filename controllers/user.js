import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, Not_Found } from "../errors/index.js";

export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(StatusCodes.OK).json(user);
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
      const {
        _id,
        firstName,
        lastName,
        bio,
        viewedProfile,
        impressions,
        location,
        picturePath,
      } = f;
      return {
        _id,
        firstName,
        lastName,
        bio,
        viewedProfile,
        impressions,
        location,
        picturePath,
      };
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
      const {
        _id,
        firstName,
        lastName,
        bio,
        viewedProfile,
        impressions,
        location,
        picturePath,
      } = f;
      return {
        _id,
        firstName,
        lastName,
        bio,
        viewedProfile,
        impressions,
        location,
        picturePath,
      };
    });

    res.status(StatusCodes.OK).json(formattedFriends);
  } catch (error) {
    throw new BadRequestError("Unable to add or remove friend");
  }
};
