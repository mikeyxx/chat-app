import CustomErrorHandler from "../errors/custom.js";
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleWare = (err, req, res, next) => {
  if (err instanceof CustomErrorHandler) {
    res.status(err.statusCode).json({ msg: err.message });
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};

export default errorHandlerMiddleWare;
