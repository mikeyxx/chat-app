const User = require("../models/User.js");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, Not_Found } = require("../errors/index.js");

const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    throw new Not_Found("User not found");
  }
};

const getUserFriends = async (req, res) => {
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

const addOrRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    // const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      // friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      // friend.friends.push(id);
    }

    await user.save();
    // await friend.save();

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

module.exports = { getUserProfile, getUserFriends, addOrRemoveFriend };
