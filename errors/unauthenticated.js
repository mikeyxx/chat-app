const CustomErrorHandler = require("./custom.js");
const { StatusCodes } = require("http-status-codes");

class UnauthenticatedError extends CustomErrorHandler {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
