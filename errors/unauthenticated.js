import CustomErrorHandler from "./custom.js";
import { StatusCodes } from "http-status-codes";

class UnauthenticatedError extends CustomErrorHandler {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
