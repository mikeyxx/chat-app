import CustomErrorHandler from "./custom.js";
import { StatusCodes } from "http-status-codes";

class BadRequestError extends CustomErrorHandler {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
