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
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = await User.create({ ...req.body, password: hashedPassword });
  res.status(201).json(user);
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
  res
    .status(StatusCodes.OK)
    .json({ name: user.firstName, username: user.userName, token });
};
