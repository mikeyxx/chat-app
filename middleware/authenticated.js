import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

const authorized = (req, res, next) => {
  const authheader = req.headers.authorization || req.headers.authorization;
  if (!authheader || !authheader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Unathenticated user");
  }

  const token = authheader.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);

  req.user = {
    userId: user.userId,
    fname: user.fname,
  };
  next();
};

export default authorized;
