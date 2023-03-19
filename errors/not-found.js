import CustomErrorHandler from "./custom.js";
import { StatusCodes } from "http-status-codes";

class Not_Found extends CustomErrorHandler {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default Not_Found;
