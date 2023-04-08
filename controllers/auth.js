import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  Not_Found,
  UnauthenticatedError,
} from "../errors/index.js";

export const register = async (req, res) => {
  const {
    firstName,
    lastName,
    userName,
    email,
    password,
    friends,
    picturePath,
    location,
    bio,
  } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    firstName,
    lastName,
    userName,
    email,
    password: hashedPassword,
    friends,
    picturePath,
    location,
    bio,
    viewedProfile: Math.floor(Math.random() * 10000),
    impressions: Math.floor(Math.random() * 10000),
  });

  const savedUser = await newUser.save();

  res.status(201).json(savedUser);
};

export const login = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ userName });
  if (!user) {
    throw new Not_Found("User does not exist");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthenticatedError("Invalid Credential");
  }

  const token = jwt.sign(
    {
      userId: user._id,
      fname: user.firstName,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_DURATION }
  );
  delete user.password;

  const {
    _id,
    firstName,
    lastName,
    email,
    friends,
    picturePath,
    location,
    bio,
    viewedProfile,
    impressions,
  } = user;

  const formattedUserData = {
    _id,
    firstName,
    lastName,
    email,
    friends,
    picturePath,
    location,
    bio,
    viewedProfile,
    impressions,
  };
  res.status(StatusCodes.OK).json({
    firstName,
    formattedUserData,
    token,
  });
};
